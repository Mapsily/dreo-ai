"use client";

import FormGenerator from "@/components/shared/form-generator";
import { Loader } from "@/components/shared/loader";
import { Button } from "@/components/ui/button";
import { useProfileSetupContext } from "@/context/profile-setup-provider";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { FormEvent } from "react";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

type Props = {
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
  loading: boolean;
  onUpdate: () => Promise<{ status: number } | void>;
};

export default function ScriptSetupForm({
  errors,
  loading,
  onUpdate,
  register,
}: Props) {
  const { currentStep, setCurrentStep } = useProfileSetupContext();

  const handleNext = async () => {
    await onUpdate();
    setCurrentStep(currentStep + 1);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <form className="mt-10 space-y-4" onSubmit={handleSubmit}>
      <fieldset className="flex flex-col gap-4 w-full">
        <FormGenerator
          name="initial"
          placeholder="Enter initial call script"
          register={register}
          errors={errors}
          inputType="textarea"
          type="text"
          label="Initial Call Script"
        />
        <FormGenerator
          name="followUp"
          placeholder="Enter follow up call script"
          register={register}
          errors={errors}
          inputType="textarea"
          type="text"
          label="Follow-Up Call Script"
        />
      </fieldset>
      <div className="flex justify-between">
        <Button
          onClick={() => setCurrentStep(currentStep - 1)}
          variant="outline"
        >
          <ChevronLeft />
          Back
        </Button>
        <Button onClick={handleNext}>
          <Loader loading={loading}>
            Next <ChevronRight />
          </Loader>
        </Button>
      </div>
    </form>
  );
}
