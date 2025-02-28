"use client";

import FormGenerator from "@/components/shared/form-generator";
import { Loader } from "@/components/shared/loader";
import { Button } from "@/components/ui/button";
import { CONVERSATION_DURATIONS, TIMEZONES } from "@/constants/setting";
import { useProfileSetupContext } from "@/context/profile-setup-provider";
import {
  ChevronLeft,
  ChevronRight,
  Clock5,
  Clock9,
  Globe,
  ParkingMeter,
} from "lucide-react";
import { useRouter } from "next/navigation";
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
  loading: boolean;
  onUpdate: () => Promise<void>;
  control: Control<FieldValues>;
};

export default function AdvancedSetupForm({
  control,
  errors,
  loading,
  onUpdate,
  register,
}: Props) {
  const { currentStep, setCurrentStep } = useProfileSetupContext();
  const router = useRouter();

  const handleNext = async () => {
    await onUpdate();
    router.replace("/dashboard");
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <form className="mt-10 space-y-4" onSubmit={handleSubmit}>
      <fieldset className="flex flex-col gap-4 w-full">
        <FormGenerator
          name="maxConversationDuration"
          placeholder="Select Duration"
          register={register}
          errors={errors}
          inputType="select"
          type="number"
          options={CONVERSATION_DURATIONS}
          control={control}
          label="Max Conversation Duration"
          LeftIcon={<ParkingMeter size={16} />}
        />
        <FormGenerator
          name="timeZone"
          placeholder="Select time zone"
          register={register}
          errors={errors}
          inputType="select"
          options={TIMEZONES}
          type="text"
          control={control}
          label="Time Zone"
          LeftIcon={<Globe size={16} />}
        />
        <FormGenerator
          name="startAt"
          placeholder="Select time zone"
          register={register}
          errors={errors}
          inputType="input"
          type="number"
          label="Start At"
          LeftIcon={<Clock9 size={16} />}
        />
        <FormGenerator
          name="endAt"
          placeholder="Select time zone"
          register={register}
          errors={errors}
          inputType="input"
          type="number"
          label="End At"
          LeftIcon={<Clock5 size={16} />}
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
