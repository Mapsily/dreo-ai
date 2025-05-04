"use client";

import { useMemo, useState } from "react";
import { ChevronRight, ChevronLeft, PhoneForwarded } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { AddProspects } from "./add-prospects";
import { useProspectForm } from "@/hooks/prospect/use-prospect-form";
import { Loader } from "../loader";
import ProspectAddSelector from "./prospect-add-selector";
import UploadProspects from "../upload-prospects";
import { useToast } from "@/hooks/use-toast";
import { useOutreachContext } from "@/context/outreach-provider";

export default function OutreachSheet() {
  const {
    errors: prospectErrors,
    loading: prospectLoading,
    onAdd: prospectOnAdd,
    register: prospectRegister,
    onDelete: prospectOnDelete,
    onSubmit: prospectOnSubmit,
    prospects,
    setProspects,
  } = useProspectForm();
  const { openSheet, closeOutreachSheet } = useOutreachContext();
  const [step, setStep] = useState(1);
  const { toast } = useToast();

  const handleBack = async () => {
    if (step === 3) setStep(1);
    else setStep(step - 1);
  };

  const handleNext = async () => {
    if (step === 2 || step === 3) {
      await prospectOnSubmit();
      toast({
        title: "Success",
        description: "Outreach launched successfully",
      });
      handleChange(false);
    } else setStep(step + 1);
  };

  const handleSelect = async (type: "manual" | "upload") => {
    if (type === "manual") setStep(3);
    else setStep(2);
  };

  const handleChange = (value: boolean) => {
    if (!value) {
      setProspects([]);
      setStep(1);
      closeOutreachSheet();
    }
  };

  const isDisabled = useMemo(() => {
    if (prospectLoading) return true;
    if (step === 2 || step === 3) return !prospects.length;
  }, [prospectLoading, prospects.length, step]);

  return (
    <Sheet open={openSheet} onOpenChange={handleChange}>
      <SheetContent side="right" className="p-0 !max-w-[700px] overflow-y-auto">
        <SheetHeader className="border-b p-4 flex flex-row items-center gap-4">
          {step !== 1 && (
            <Button className="w-fit" variant="secondary" onClick={handleBack}>
              Back <ChevronLeft />
            </Button>
          )}
          <Button
            disabled={isDisabled}
            className="!mt-0 w-fit"
            onClick={handleNext}
          >
            <Loader loading={prospectLoading}>
              {step === 2 || step === 3 ? (
                "Launch"
              ) : (
                <>
                  Next <ChevronRight />
                </>
              )}
            </Loader>
          </Button>
        </SheetHeader>
        <div className="py-10 px-8 flex flex-col items-center gap-10">
          <SheetTitle className="text-center text-2xl font-semibold">
            Start Oureach
          </SheetTitle>
          <div className="w-full">
            {step === 1 ? (
              <ProspectAddSelector onSelect={handleSelect} />
            ) : step === 2 ? (
              <UploadProspects setProspects={setProspects} />
            ) : (
              step === 3 && (
                <AddProspects
                  errors={prospectErrors}
                  loading={prospectLoading}
                  onAdd={prospectOnAdd}
                  onDelete={prospectOnDelete}
                  prospects={prospects}
                  register={prospectRegister}
                />
              )
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

export function OutreachSheetButton({
  variant = "default",
}: {
  variant?: "default" | "secondary" | "outline";
}) {
  const { openOutreachSheet, outreachRunning } = useOutreachContext();

  const handleClick = () => {
    if(!outreachRunning) openOutreachSheet();
  };

  return (
    <Button variant={variant} onClick={handleClick}>
      <Loader loading={outreachRunning}>
        <PhoneForwarded /> Start Outreach
      </Loader>
      {outreachRunning && "Outreach running"}
    </Button>
  );
}
