"use client";

import { PlusCircle, UserPlus } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import ProspectForm from "./prospect-form";
import { useProspectContext } from "@/context/prospect-provider";

export default function AddProspectDialog() {
  const { openAddDialog, closeAddProspectDialog } = useProspectContext();

  const handleOpenChange = (value: boolean) => {
    if (!value) closeAddProspectDialog();
  };

  const handleSubmit = () => {
    closeAddProspectDialog();
  };

  const handleCancel = () => {
    closeAddProspectDialog();
  };

  return (
    <Dialog open={openAddDialog} onOpenChange={handleOpenChange}>
      <DialogContent className="bg-white">
        <DialogHeader className="flex flex-row gap-2 items-start">
          <UserPlus size={24} />
          <div>
            <DialogTitle>Add manually</DialogTitle>
            <DialogDescription>
              Type prospects data to add prospects manually.
            </DialogDescription>
          </div>
        </DialogHeader>
        <ProspectForm onSubmit={handleSubmit} onCancel={handleCancel} />
      </DialogContent>
    </Dialog>
  );
}

export function AddProspectDialogButton() {
  const { openAddProspectDialog } = useProspectContext();

  const hancleClick = () => {
    openAddProspectDialog();
  };

  return (
    <Button onClick={hancleClick} variant="outline">
      <PlusCircle /> Add manually
    </Button>
  );
}
