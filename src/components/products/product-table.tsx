import React from "react";
import { Product } from "@prisma/client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

import { PRODUCT_HEADERS } from "@/constants/table";
import ProductOption from "./product-option";

type Props = {
  products: Product[];
};

const ProductTable = ({ products }: Props) => {

  if (!products.length) {
    return null;
  }

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
          <TableRow key={p.id}>
            <TableCell>{p.name}</TableCell>
            <TableCell>{p.description}</TableCell>
            <TableCell>{p.price}</TableCell>
            <TableCell>{p.createdAt?.toDateString()}</TableCell>
            <TableCell>
              <ProductOption product={p} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ProductTable;
