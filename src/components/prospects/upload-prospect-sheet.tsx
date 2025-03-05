"use client";

import { useState } from "react";
import { FilePlus } from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import UploadProspects from "../shared/upload-prospects";
import { useProspectForm } from "@/hooks/prospect/use-prospect-form";
import { Button } from "../ui/button";
import { Loader } from "../shared/loader";

export default function UploadProspectSheet() {
  const [open, setOpen] = useState(false);
  const { setProspects, prospects, loading, onSubmit } = useProspectForm();
  const isEmpty = !prospects.length;

  const handleSubmit = async () => {
    await onSubmit();
    setProspects([]);
    setOpen(false);
  };

  const handleCancel = () => {
    setProspects([]);
    setOpen(false);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline">
          <FilePlus /> Upload Excel, CSV
        </Button>
      </SheetTrigger>
      <SheetContent className="min-w-[500px]">
        <SheetTitle className="hidden">upload prospect</SheetTitle>
        <UploadProspects setProspects={setProspects} />
        <div className="flex gap-2 justify-end">
          <Button
            className="mt-8"
            onClick={handleSubmit}
            disabled={loading || isEmpty}
          >
            <Loader loading={loading}>Submit</Loader>
          </Button>
          <Button
            variant="secondary"
            className="mt-8"
            onClick={handleCancel}
            disabled={loading}
          >
            Cancel
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
