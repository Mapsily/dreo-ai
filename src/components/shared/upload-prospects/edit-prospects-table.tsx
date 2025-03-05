"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FilePen, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";

const fieldOptions = ["Name", "Phone", "Notes", "Unknown"];

interface PredictedData {
  headers: string[];
  rows: Record<string, any>[];
}

interface EditProspectsTableProps {
  predictedData: PredictedData;
  onChange: (data: PredictedData) => void;
}

export default function EditProspectsTable({
  predictedData,
  onChange,
}: EditProspectsTableProps) {
  const [headers, setHeaders] = useState<string[]>(predictedData.headers);
  const [rows, setRows] = useState<Record<string, any>[]>(predictedData.rows);
  const [editingCell, setEditingCell] = useState<{
    row: number;
    col: number;
  } | null>(null);
  const [cellValues, setCellValues] = useState<Record<string, any>[]>([
    ...predictedData.rows,
  ]);

  useEffect(() => {
    onChange({ headers, rows: cellValues });
  }, [headers, rows, cellValues]);

  const handleHeaderChange = (index: number, value: string) => {
    const newHeaders = [...headers];
    newHeaders[index] = value;
    setHeaders(newHeaders);
  };

  const startEditing = (rowIdx: number, colIdx: number) => {
    setEditingCell({ row: rowIdx, col: colIdx });
  };

  const handleCellChange = (rowIdx: number, colIdx: number, value: string) => {
    const newRows = [...cellValues];
    const key = Object.keys(rows[rowIdx])[colIdx];
    newRows[rowIdx] = { ...newRows[rowIdx], [key]: value };
    setCellValues(newRows);
    setEditingCell(null);
  };

  const handleDeleteRow = (rowIdx: number) => {
    const newRows = cellValues.filter((_, idx) => idx !== rowIdx);
    setCellValues(newRows);
    setRows(newRows);
  };

  const isCellInvalid = (value: any) => {
    return value === "" || value === null || value === undefined;
  };

  return (
    <div>
      <div className="flex items-start gap-2">
        <FilePen />
        <span>
          <h3 className="font-medium mb-1">Validate data</h3>
          <p className="text-sm text-gray-400 mb-4">
            The data uploaded in file may have some missing or <br /> incorrect
            information. Please validate before moving further.
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
                  onValueChange={(value) => handleHeaderChange(index, value)}
                >
                  <SelectTrigger className="w-[180px] border-none shadow-none">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {fieldOptions.map((opt) => (
                      <SelectItem key={opt} value={opt}>
                        {opt}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody className="space-y-2">
          {rows.map((row, rowIdx) => (
            <TableRow key={rowIdx}>
              {Object.values(row).map((cell, colIdx) => {
                const isEditing =
                  editingCell?.row === rowIdx && editingCell?.col === colIdx;
                const isInvalid = isCellInvalid(
                  cellValues[rowIdx][Object.keys(row)[colIdx]]
                );
                return (
                  <TableCell
                    key={colIdx}
                    className={`relative bg-gray-100 rounded-l-sm ${
                      isInvalid ? "border-2 border-red-500" : ""
                    }`}
                    onClick={() => !isEditing && startEditing(rowIdx, colIdx)}
                  >
                    {isEditing ? (
                      <input
                        type="text"
                        value={
                          cellValues[rowIdx][Object.keys(row)[colIdx]] || ""
                        }
                        onChange={(e) =>
                          handleCellChange(rowIdx, colIdx, e.target.value)
                        }
                        onBlur={() => setEditingCell(null)}
                        autoFocus
                        className="focus:outline-none focus:bg-transparent"
                      />
                    ) : (
                      <div className="group flex items-center justify-between">
                        <span>
                          {cellValues[rowIdx][Object.keys(row)[colIdx]] || ""}
                        </span>
                        <FilePen
                          className={`w-4 h-4 ml-2 opacity-0 group-hover:opacity-100 ${
                            isInvalid
                              ? "text-red-500 opacity-100"
                              : "text-gray-500"
                          }`}
                        />
                      </div>
                    )}
                  </TableCell>
                );
              })}
              <TableCell>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDeleteRow(rowIdx)}
                >
                  <Trash2 className="w-4 h-4 text-red-500" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
