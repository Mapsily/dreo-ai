import React from "react";
import { Prospect } from "@prisma/client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

import { PROSPECTS_HEADERS } from "@/constants/table";
import TagView from "../shared/tag-view";
import ProspectOption from "./prospect-option";

const ProspectsTable = ({ prospects }: { prospects: Prospect[] }) => {
  if (!prospects.length) {
    return null;
  }
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
          <TableRow key={p.id}>
            <TableCell>{p.name}</TableCell>
            <TableCell>{p.phone}</TableCell>
            <TableCell>{p.notes || "N/A"}</TableCell>
            <TableCell>
              <TagView tag={p.status || "INITIAL"} />
            </TableCell>
            <TableCell>{p.lastContacted?.toDateString() || "N/A"}</TableCell>
            <TableCell>{p.rescheduledFor?.toDateString() || "N/A"}</TableCell>
            <TableCell>
              <ProspectOption prospect={p} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ProspectsTable;
