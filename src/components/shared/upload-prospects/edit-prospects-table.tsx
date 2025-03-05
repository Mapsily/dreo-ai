"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Check, Trash2, PencilLine, FilePen } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const FIELD_OPTIONS = ["Name", "Phone", "Notes", "Unknown"];
const REQUIRED_HEADERS = ["Name", "Phone", "Notes"];

interface PredictedData {
  headers: string[];
  rows: Record<string, any>[];
}

interface Props {
  predictedData: PredictedData;
  setPredictedData: (data: PredictedData) => void;
  setErrors: (errors: Record<string, boolean>) => void;
}

export default function EditProspectsTable({
  predictedData,
  setPredictedData,
  setErrors,
}: Props) {
  const [headers, setHeaders] = useState(predictedData.headers);
  const [errorsState, setErrorsState] = useState<Record<string, boolean>>({});
  const [editingCell, setEditingCell] = useState<{
    rowIdx: number;
    colIdx: number;
  } | null>(null);
  const [cellValues, setCellValues] = useState<Record<string, any>[]>([
    ...predictedData.rows,
  ]);
  const [editValue, setEditValue] = useState<string>("");
  const rows = predictedData.rows;

  useEffect(() => {
    validateData();
    setPredictedData({ headers, rows: cellValues });
  }, [headers, cellValues]);

  const validateData = () => {
    const newErrors: Record<string, boolean> = {};

    const missingHeaders = REQUIRED_HEADERS.filter(
      (req) => !headers.includes(req)
    );
    if (missingHeaders.length > 0) {
      missingHeaders.map((h) => {
        newErrors[h] = true;
      });
    }

    cellValues.forEach((row, rowIndex) => {
      headers.forEach((header, colIndex) => {
        const key = Object.keys(row)[colIndex];
        const value = row[key]?.trim() || "";

        if (header === "Name" || header === "Notes") {
          if (value.length < 1) newErrors[`${rowIndex}-${colIndex}`] = true;
        }

        if (header === "Phone") {
          if (!/^\+\d+$/.test(value)) {
            newErrors[`${rowIndex}-${colIndex}`] = true;
          }
        }
      });
    });

    setErrorsState(newErrors);
    setErrors(newErrors);
  };

  const startEditing = (
    rowIdx: number,
    colIdx: number,
    currentValue: string
  ) => {
    setEditingCell({ rowIdx, colIdx });
    setEditValue(currentValue);
  };

  const saveCell = () => {
    if (!editingCell) return;
    const { rowIdx, colIdx } = editingCell;
    const updatedRows = [...cellValues];
    const key = Object.keys(rows[rowIdx])[colIdx];
    updatedRows[rowIdx] = { ...updatedRows[rowIdx], [key]: editValue };
    setCellValues(updatedRows);
    setEditingCell(null);
  };

  return (
    <div>
      <div className="flex items-start gap-2 mb-4">
        <FilePen />
        <span>
          <h3 className="font-medium mb-1">Validate data</h3>
          <p className="text-sm text-gray-400 mb-4">
            The data uploaded in csv file may have some missing or <br />{" "}
            incorrect information. Please validate before moving further.
          </p>
        </span>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            {headers.map((header, index) => (
              <TableHead key={index}>
                <Select
                  value={header}
                  onValueChange={(value) => {
                    const newHeaders = [...headers];
                    newHeaders[index] = value;
                    setHeaders(newHeaders);
                  }}
                >
                  <SelectTrigger className="w-[150px] border-none shadow-none">
                    <SelectValue placeholder="header" />
                  </SelectTrigger>
                  <SelectContent>
                    {FIELD_OPTIONS.map((option) => (
                      <SelectItem
                        className="hover:bg-gray-50 cursor-pointer"
                        key={option}
                        value={option}
                      >
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {cellValues.map((row, rowIdx) => (
            <TableRow key={rowIdx}>
              {Object.values(row).map((cell, colIdx) => {
                const key = `${rowIdx}-${colIdx}`;
                const isInvalid = errorsState[key];
                const isEditing =
                  editingCell?.rowIdx === rowIdx &&
                  editingCell?.colIdx === colIdx;

                return (
                  <TableCell
                    key={colIdx}
                    className="relative bg-gray-50 border-b-2 border-white"
                  >
                    {isEditing ? (
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          value={editValue}
                          onChange={(e) => setEditValue(e.target.value)}
                          autoFocus
                          className="w-full bg-transparent focus:outline-none"
                        />
                        <Check
                          className="w-5 h-5 text-green-500 cursor-pointer"
                          onClick={saveCell}
                        />
                      </div>
                    ) : (
                      <div className="flex items-center justify-between">
                        <span className={isInvalid ? "text-red-500" : ""}>
                          {cell || "—"}
                        </span>
                        {isInvalid && (
                          <PencilLine
                            className="w-4 h-4 ml-2 cursor-pointer text-red-500 hover:text-black"
                            onClick={() => startEditing(rowIdx, colIdx, cell)}
                          />
                        )}
                      </div>
                    )}
                  </TableCell>
                );
              })}
              <TableCell>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() =>
                    setCellValues(cellValues.filter((_, idx) => idx !== rowIdx))
                  }
                >
                  <Trash2 className="w-4 h-4 text-red-500" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex flex-col gap-2 mt-4 text-sm text-red-500">
        {REQUIRED_HEADERS.map((h) => {
          if (errorsState[h]) {
            return <p>{errorsState[h] && `*${h} column required`}</p>;
          }
        })}
        {!!Object.keys(errorsState).length && (
          <p>*Fix column fields</p>
        )}
      </div>
    </div>
  );
}
