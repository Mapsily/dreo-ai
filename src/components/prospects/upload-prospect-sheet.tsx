"use client";

import { useState } from "react";
import { FilePlus } from "lucide-react";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import UploadProspects from "../shared/upload-prospects";
import { useProspectForm } from "@/hooks/prospect/use-prospect-form";
import { Button } from "../ui/button";
import { Loader } from "../shared/loader";

export default function UploadProspectSheet() {
  const [open, setOpen] = useState(false);
  const { setProspects, prospects, loading, onSubmit } = useProspectForm();

  const handleSubmit = async () => {
    await onSubmit();
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
        <UploadProspects setProspects={setProspects} />
        {!!prospects.length && (
          <Button className="mt-8" onClick={handleSubmit} disabled={loading}>
            <Loader loading={loading}>Submit</Loader>
          </Button>
        )}
      </SheetContent>
    </Sheet>
  );
}
