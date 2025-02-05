import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { PROSPECTS_HEADERS } from "@/constants/table";
import { Prospect } from "@prisma/client";

const ProspectsTable = ({ prospects }: { prospects: Prospect[] }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          {PROSPECTS_HEADERS.map((header, key) => (
            <TableHead key={key}>{header}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {prospects.map((p) => (
          <TableRow>
            <TableCell>{p.name}</TableCell>
            <TableCell>{p.phone}</TableCell>
            <TableCell>{p.notes}</TableCell>
            <TableCell>{p.status}</TableCell>
            <TableCell>{p.lastContacted?.toDateString()}</TableCell>
            <TableCell>{p.rescheduledFor?.toDateString()}</TableCell>
            <TableCell>{p.status}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ProspectsTable;
