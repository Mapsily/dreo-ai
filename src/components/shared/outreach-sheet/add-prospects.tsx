"use client";

import { Button } from "@/components/ui/button";
import { BookMarked, PlusCircle, Trash2 } from "lucide-react";
import FormGenerator from "@/components/shared/form-generator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PRODUCT_HEADERS } from "@/constants/table";
import { FormEvent } from "react";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import { Prisma } from "@prisma/client";
import { Loader } from "../loader";

type Props = {
  register: UseFormRegister<Prisma.ProspectCreateManyInput>;
  errors: FieldErrors<FieldValues>;
  loading: boolean;
  prospects: Prisma.ProspectCreateManyInput[];
  onAdd: () => Promise<void>;
  onDelete: (prospectIdx: number) => void;
};

export function AddProspects({
  errors,
  loading,
  onAdd,
  onDelete,
  prospects,
  register,
}: Props) {
  const handleAdd = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await onAdd();
  };

  return (
    <div className="space-y-4">
      <div>
        <div className="flex items-start gap-2">
          <BookMarked />
          <span>
            <h3 className="font-medium mb-1">Add prospects</h3>
            <p className="text-sm text-gray-400 mb-4">
              Add prospects you want AI agent to contact.
            </p>
          </span>
        </div>
        <form
          onSubmit={handleAdd}
          className="p-4 rounded-md grid grid-cols-3 border gap-4"
        >
          <FormGenerator
            errors={errors}
            inputType="input"
            name="name"
            placeholder="Enter prospect name"
            register={register}
            type="text"
          />
          <FormGenerator
            errors={errors}
            inputType="input"
            name="phone"
            placeholder="Enter prospect phone number"
            register={register}
            type="text"
          />
          <FormGenerator
            errors={errors}
            inputType="input"
            name="notes"
            placeholder="Enter realted notes"
            register={register}
            type="text"
          />
          <Button
            disabled={loading}
            type="submit"
            variant="secondary"
            className="w-fit"
          >
            <Loader loading={loading}>
              <PlusCircle /> Add
            </Loader>
          </Button>
        </form>
      </div>
      <Table className="w-full">
        <TableHeader>
          <TableRow>
            {PRODUCT_HEADERS.map((header, key) => {
              if (header === "Created At") return;
              return <TableHead key={key}>{header}</TableHead>;
            })}
          </TableRow>
        </TableHeader>
        <TableBody className="space-y-2">
          {prospects.map((p, idx) => (
            <TableRow key={idx}>
              <TableCell className="bg-gray-100 rounded-l-sm">
                {p.name}
              </TableCell>
              <TableCell className="bg-gray-100">{p.phone}</TableCell>
              <TableCell className="bg-gray-100">{p.notes}</TableCell>
              <TableCell className="bg-gray-100 rounded-r-sm">
                <Button onClick={() => onDelete(idx)} variant="secondary">
                  <Trash2 className="text-red-600" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
