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
import { useProductForm } from "@/hooks/product/use-product-form";
import { useProspectForm } from "@/hooks/prospect/use-prospect-form";
import { Loader } from "../loader";
import ProspectAddSelector from "./prospect-add-selector";
import UploadProspects from "../upload-prospects";
import { validateProspectsFields } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

export default function OutreachSheet() {
  const {
    errors: productErrors,
    loading: productLoading,
    onAdd: productOnAdd,
    register: productRegister,
    onDelete: productOnDelete,
    onSubmit: productOnSubmit,
    products,
  } = useProductForm();
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
  const [step, setStep] = useState(1);
  const { toast } = useToast();

  const handleBack = async () => {
    if (step === 4) setStep(2);
    else setStep(step - 1);
  };

  const handleNext = async () => {
    if (step === 1) {
      await productOnSubmit();
    } else if (step === 3) {
      const isValid = validateProspectsFields(prospects);
      if (isValid) {
        await prospectOnSubmit();
        setStep(5);
      } else {
        toast({
          title: "Error",
          description: "Some field are not valid",
          variant: "destructive",
        });
      }
      return;
    } else if (step === 4) {
      await prospectOnSubmit();
    }
    setStep(step + 1);
  };

  const handleSelect = async (type: "manual" | "upload") => {
    if (type === "manual") setStep(4);
    else setStep(3);
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button>
          <PhoneForwarded /> Start Outreach
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="p-0 !max-w-[700px] overflow-y-auto">
        <SheetHeader className="border-b p-4 flex flex-row items-center gap-4">
          {step !== 1 && (
            <Button className="w-fit" variant="secondary" onClick={handleBack}>
              Back <ChevronLeft />
            </Button>
          )}
          <Button
            disabled={productLoading || prospectLoading}
            className="!mt-0 w-fit"
            onClick={handleNext}
          >
            <Loader loading={productLoading || prospectLoading}>
              Next <ChevronRight />
            </Loader>
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
          <div className="w-full">
            {step === 1 ? (
              <AddProducts
                errors={productErrors}
                loading={productLoading}
                products={products}
                register={productRegister}
                onAdd={productOnAdd}
                onDelete={productOnDelete}
              />
            ) : step === 2 ? (
              <ProspectAddSelector onSelect={handleSelect} />
            ) : step === 3 ? (
              <UploadProspects setProspects={setProspects} />
            ) : step === 4 ? (
              <AddProspects
                errors={prospectErrors}
                loading={prospectLoading}
                onAdd={prospectOnAdd}
                onDelete={prospectOnDelete}
                prospects={prospects}
                register={prospectRegister}
              />
            ) : (
              <TimeSelector />
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
