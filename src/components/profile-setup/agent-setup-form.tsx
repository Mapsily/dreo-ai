"use client";

import { getVoices } from "@/actions/ultravox";
import FormGenerator from "@/components/shared/form-generator";
import { Loader } from "@/components/shared/loader";
import { Button } from "@/components/ui/button";
import { LANGUAGES } from "@/constants/setting";
import { useProfileSetupContext } from "@/context/profile-setup-provider";
import {
  AudioWaveform,
  ChevronLeft,
  ChevronRight,
  Languages,
} from "lucide-react";
import { FormEvent, useEffect, useState } from "react";
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

type VOICE = {
  voiceId: string;
  name: string;
  description: string;
  previewUrl: string;
  ownership: string;
};

export default function AgentSetupForm({
  errors,
  loading,
  onUpdate,
  register,
  control,
}: Props) {
  const { setCurrentStep, currentStep } = useProfileSetupContext();
  const [voices, setVoices] = useState<VOICE[]>([]);

  useEffect(() => {
    getVoices().then((res) => res.status === 200 && setVoices(res.data));
  }, []);

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
          name="language"
          placeholder="Select language"
          register={register}
          errors={errors}
          inputType="select"
          type="text"
          options={LANGUAGES}
          control={control}
          label="Agent Language"
          LeftIcon={<Languages size={16} />}
        />
        <FormGenerator
          name="voice"
          placeholder="Select voice"
          register={register}
          errors={errors}
          inputType="select"
          type="text"
          options={voices.map((v) => ({
            id: v.voiceId,
            label: v.name,
            value: v.name,
          }))}
          control={control}
          label="Voice"
          LeftIcon={<AudioWaveform size={16} />}
        />
        <FormGenerator
          name="firstMessage"
          placeholder="Enter first message"
          register={register}
          errors={errors}
          inputType="textarea"
          type="text"
          label="First Message"
        />
        <FormGenerator
          name="knowledgeBase"
          placeholder="Enter knowledge"
          register={register}
          errors={errors}
          inputType="textarea"
          type="text"
          label="Knowledge Base"
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
