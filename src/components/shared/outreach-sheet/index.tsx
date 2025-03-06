"use client";

import { useEffect, useMemo, useState } from "react";
import { ChevronRight, ChevronLeft, PhoneForwarded } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import ProgressView from "@/components/shared/progress-view";
import { AddProducts } from "./add-products";
import { AddProspects } from "./add-prospects";
import { useProductForm } from "@/hooks/product/use-product-form";
import { useProspectForm } from "@/hooks/prospect/use-prospect-form";
import { Loader } from "../loader";
import ProspectAddSelector from "./prospect-add-selector";
import UploadProspects from "../upload-prospects";
import { useToast } from "@/hooks/use-toast";
import { useOutreachContext } from "@/context/outreach-provider";
import { getProductsCount } from "@/actions/product";
import { useUser } from "@clerk/nextjs";

export default function OutreachSheet() {
  const {
    errors: productErrors,
    loading: productLoading,
    onAdd: productOnAdd,
    register: productRegister,
    onDelete: productOnDelete,
    onSubmit: productOnSubmit,
    products,
    setProducts,
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
  const { openSheet, closeOutreachSheet } = useOutreachContext();
  const [loading, setLoading] = useState(false);
  const [productsCount, setProductsCount] = useState(0);
  const [step, setStep] = useState(1);
  const { user, isLoaded } = useUser();
  const { toast } = useToast();

  useEffect(() => {
    if (!isLoaded || !user) return;
    const fetchProductsCount = async () => {
      setLoading(true);
      const res = await getProductsCount(user?.id);
      if (res.data) setProductsCount(res.data);
      else
        toast({
          title: "Error",
          description: res.error,
          variant: "destructive",
        });
      setLoading(false);
    };
    if (openSheet) fetchProductsCount();
  }, [isLoaded, user, openSheet, toast]);

  const handleBack = async () => {
    if (step === 4) setStep(2);
    else setStep(step - 1);
  };

  const handleNext = async () => {
    if (step === 3 || step === 4) {
      try {
        if (productsCount === 0) await productOnSubmit();
        await prospectOnSubmit();
        toast({
          title: "Success",
          description: "Outreach launched successfully",
        });
        handleChange(false);
        return;
      } catch (error) {
        toast({
          title: "Error",
          description: (error as Error).message,
          variant: "destructive",
        });
      }
    } else setStep(step + 1);
  };

  const handleSelect = async (type: "manual" | "upload") => {
    if (type === "manual") setStep(4);
    else setStep(3);
  };

  const handleChange = (value: boolean) => {
    if (!value) {
      setProspects([]);
      setProducts([]);
      setStep(1);
      closeOutreachSheet();
    }
  };

  const isDisabled = useMemo(() => {
    if (productLoading || prospectLoading || loading) return true;
    if (step === 1) {
      if (productsCount > 0) return false;
      else {
        return !products.length;
      }
    } else if (step === 3 || step === 4) return !prospects.length;
  }, [
    productLoading,
    prospectLoading,
    loading,
    prospects.length,
    products.length,
    step,
    productsCount,
  ]);

  const indicatorStep = useMemo(() => {
    if (step === 2 || step === 3 || step === 4) return 2;
    return step;
  }, [step]);

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
            <Loader loading={productLoading || prospectLoading}>
              {step === 3 || step === 4 ? (
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
          <ProgressView
            currentStep={indicatorStep}
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
            ) : (
              step === 4 && (
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
  const { openOutreachSheet } = useOutreachContext();

  const handleClick = () => {
    openOutreachSheet();
  };

  return (
    <Button variant={variant} onClick={handleClick}>
      <PhoneForwarded /> Start Outreach
    </Button>
  );
}
