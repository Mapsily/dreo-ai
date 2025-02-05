import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { PRODUCT_HEADERS } from "@/constants/table";
import { Product } from "@prisma/client";

const ProductTable = ({ products }: { products: Product[] }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          {PRODUCT_HEADERS.map((header, key) => (
            <TableHead key={key}>{header}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.map((p) => (
          <TableRow>
            <TableCell>{p.name}</TableCell>
            <TableCell>{p.description}</TableCell>
            <TableCell>{p.price}</TableCell>
            <TableCell>{p.createdAt?.toDateString()}</TableCell>
            <TableCell>{""}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ProductTable;
