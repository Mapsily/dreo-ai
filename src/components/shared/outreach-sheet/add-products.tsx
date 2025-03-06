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
import { Loader } from "@/components/shared/loader";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import { FormEvent } from "react";
import { Prisma } from "@prisma/client";

type Product = {
  name: string;
  description: string;
  price: number;
};

type Props = {
  register: UseFormRegister<Prisma.ProductCreateManyInput>;
  errors: FieldErrors<FieldValues>;
  loading: boolean;
  products: Product[];
  onAdd: () => Promise<void>;
  onDelete: (productIdx: number) => void;
};

export function AddProducts({
  errors,
  register,
  loading,
  products,
  onAdd,
  onDelete,
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
            <h3 className="font-medium mb-1">Add product/service</h3>
            <p className="text-sm text-gray-400 mb-4">
              Add new or select existing products or services.
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
            placeholder="Enter product name"
            register={register}
            type="text"
          />
          <FormGenerator
            errors={errors}
            inputType="input"
            name="description"
            placeholder="Enter product description"
            register={register}
            type="text"
          />
          <FormGenerator
            errors={errors}
            inputType="input"
            name="price"
            placeholder="Enter product price"
            register={register}
            type="number"
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
          {products.map((p, idx) => (
            <TableRow key={p.name}>
              <TableCell className="bg-gray-100 rounded-l-sm">
                {p.name}
              </TableCell>
              <TableCell className="bg-gray-100">{p.description}</TableCell>
              <TableCell className="bg-gray-100">{p.price}</TableCell>
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
