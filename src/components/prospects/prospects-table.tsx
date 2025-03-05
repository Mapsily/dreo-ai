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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { PROSPECTS_HEADERS } from "@/constants/table";
import TagView from "../shared/tag-view";

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
            <TableCell>{p.notes || "N/A"}</TableCell>
            <TableCell>
              <TagView tag={p.status || "INITIAL"} />
            </TableCell>
            <TableCell>{p.lastContacted?.toDateString() || "N/A"}</TableCell>
            <TableCell>{p.rescheduledFor?.toDateString() || "N/A"}</TableCell>
            <TableCell>
              <DropdownMenu>
                <DropdownMenuTrigger>Open</DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem>Billing</DropdownMenuItem>
                  <DropdownMenuItem>Team</DropdownMenuItem>
                  <DropdownMenuItem>Subscription</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ProspectsTable;
