"use client";

import { useState } from "react";
import { EllipsisVertical } from "lucide-react";
import { Prospect } from "@prisma/client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { useProspectContext } from "@/context/prospect-provider";

type Props = {
  prospect: Prospect;
};

export default function ProspectOption({ prospect }: Props) {
  const [open, setOpen] = useState(false);
  const { openUpdateProspectDialog, openDeleteProspectDialog } =
    useProspectContext();

  const handleUpdate = () => {
    openUpdateProspectDialog(prospect);
    setOpen(false);
  };

  const handleDelete = async () => {
    openDeleteProspectDialog(prospect);
    setOpen(false);
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button size="icon" variant="secondary">
          <EllipsisVertical />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem className="cursor-pointer" onClick={handleUpdate}>
          Update
        </DropdownMenuItem>
        <DropdownMenuItem
          className="cursor-pointer text-red-600"
          onClick={handleDelete}
        >
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
