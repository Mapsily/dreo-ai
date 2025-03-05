"use client";

import { UserPlus } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import ProspectForm from "./prospect-form";
import { useProspectContext } from "@/context/prospect-provider";

export default function UpdateProspectDialog() {
  const { openUpdateDialog, closeUpdateProspectDialog, prospect } =
    useProspectContext();

  const handleOpenChange = (value: boolean) => {
    if (!value) closeUpdateProspectDialog();
  };

  const handleSubmit = () => {
    closeUpdateProspectDialog();
  };

  const handleCancel = () => {
    closeUpdateProspectDialog();
  };

  return (
    <Dialog open={openUpdateDialog} onOpenChange={handleOpenChange}>
      <DialogContent className="bg-white">
        <DialogHeader className="flex flex-row gap-2 items-start">
          <UserPlus size={24} />
          <div>
            <DialogTitle>Update prospect</DialogTitle>
            <DialogDescription>
              update prospects data to submit.
            </DialogDescription>
          </div>
        </DialogHeader>
        <ProspectForm
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          prospect={prospect}
        />
      </DialogContent>
    </Dialog>
  );
}
