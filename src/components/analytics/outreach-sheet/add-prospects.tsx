"use client";

import { Button } from "@/components/ui/button";
import { BookMarked, PlusCircle } from "lucide-react";
import FormGenerator from "@/components/shared/form-generator";
import { useProspectForm } from "@/hooks/prospect/use-prospect-form";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PRODUCT_HEADERS } from "@/constants/table";
import { Spinner } from "@/components/shared/loader/spinner";
import { useState } from "react";

type PROSPECT = {
  name: string;
  phone: string;
  notes: number;
};

const p = [
  {
    name: "fan",
    description: "adsasasd",
    price: 499,
  },
];

export function AddProspects() {
  const { errors, loading, onAdd, register, getValues } = useProspectForm();
  const [prospects, setProspects] = useState<PROSPECT[]>(p);

  const handleAdd = async (e) => {
    e.preventDefault();
    await onAdd();
    const prospect = getValues(["name", "phone", "notes"]);
    setProspects((p) => [...p, prospect]);
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
          <Button type="submit" variant="secondary" className="w-fit">
            {loading ? (
              <Spinner />
            ) : (
              <>
                <PlusCircle /> Add
              </>
            )}
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
          {prospects.map((p) => (
            <TableRow>
              <TableCell className="bg-gray-200 rounded-l-md">{p.name}</TableCell>
              <TableCell className="bg-gray-200">{p.phone}</TableCell>
              <TableCell className="bg-gray-200">{p.notes}</TableCell>
              <TableCell className="bg-gray-200 rounded-r-md">{""}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
