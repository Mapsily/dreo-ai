"use client";

import { useState } from "react";
import { ChevronRight, ChevronLeft, PhoneForwarded } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import ProgressView from "@/components/shared/progress-view";
import { AddProducts } from "./add-products";
import { AddProspects } from "./add-prospects";
import TimeSelector from "./time-selector";

export default function OutreachSheet() {
  const [step, setStep] = useState(1);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button>
          <PhoneForwarded /> Start Outreach
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="p-0 !max-w-[700px]">
        <SheetHeader className="border-b p-4 flex flex-row items-center gap-4">
          {step !== 1 && (
            <Button
              className="w-fit"
              variant="secondary"
              onClick={() => setStep(step - 1)}
            >
              Back <ChevronLeft />
            </Button>
          )}
          <Button className="!mt-0 w-fit" onClick={() => setStep(step + 1)}>
            Next <ChevronRight />
          </Button>
        </SheetHeader>
        <div className="py-10 px-8 flex flex-col items-center gap-10">
          <SheetTitle className="text-center text-2xl font-semibold">
            Start Oureach
          </SheetTitle>
          <ProgressView
            currentStep={step}
            steps={["Add Products", "Add Prospects"]}
          />
          {step === 1 ? (
            <AddProducts />
          ) : step === 2 ? (
            <AddProspects />
          ) : (
            <TimeSelector />
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
