"use client";

import FormGenerator from "@/components/shared/form-generator";
import { Loader } from "@/components/shared/loader";
import { Button } from "@/components/ui/button";
import { useProfileSetupContext } from "@/context/profile-setup-provider";
import { Building, ChevronRight, Phone } from "lucide-react";
import { FormEvent } from "react";
import {
  Control,
  FieldErrors,
  FieldValues,
  UseFormRegister,
} from "react-hook-form";

type Props = {
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
  control?: Control<FieldValues>;
  loading: boolean;
  onUpdate: () => Promise<void>;
};
export default function AccountSetupForm({
  errors,
  loading,
  onUpdate,
  register,
}: Props) {
  const { setCurrentStep, currentStep } = useProfileSetupContext();

  const handleNext = async () => {
    await onUpdate();
    setCurrentStep(currentStep + 1);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <form className="mt-10 space-y-4" onSubmit={handleSubmit}>
      <fieldset className="space-y-8 w-full">
        <FormGenerator
          errors={errors}
          register={register}
          inputType="input"
          name="companyName"
          placeholder="Enter company name"
          type="text"
          label="Company Name"
          LeftIcon={<Building size={16} />}
        />
        <FormGenerator
          errors={errors}
          register={register}
          inputType="input"
          name="phoneNumber"
          placeholder="Enter phone number"
          type="text"
          label="Phone Number"
          LeftIcon={<Phone size={16} />}
        />
      </fieldset>
      <Button
        onClick={handleNext}
        className="ml-auto mt-auto flex items-center"
      >
        <Loader loading={loading}>
          Next <ChevronRight />
        </Loader>
      </Button>
    </form>
  );
}
