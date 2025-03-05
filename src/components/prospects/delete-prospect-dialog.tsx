"use client";

import { deleteProspect } from "@/actions/prospect";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useProspectContext } from "@/context/prospect-provider";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { Button } from "../ui/button";
import { Loader } from "../shared/loader";

export default function DeleteProspectDialog() {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const { openDeleteDialog, closeDeleteProspectDialog, prospect } =
    useProspectContext();

  const handleOpenChange = (value: boolean) => {
    if (!value) closeDeleteProspectDialog();
  };

  const handleDelete = async () => {
    if (!prospect) return;
    setLoading(true);
    const res = await deleteProspect(prospect.id);
    if (res.status === 200)
      toast({ title: "Success", description: res.message });
    else
      toast({ title: "Error", description: res.error, variant: "destructive" });
    closeDeleteProspectDialog();
    setLoading(false);
  };

  const handleCancel = () => {
    closeDeleteProspectDialog();
  };
  return (
    <Dialog open={openDeleteDialog} onOpenChange={handleOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            prospect and remove conversation and appointments data from our
            servers.
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4 space-x-4">
          <Button variant="destructive" onClick={handleDelete}>
            <Loader loading={loading}>Delete</Loader>
          </Button>
          <Button onClick={handleCancel} variant="secondary">
            Cancel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
