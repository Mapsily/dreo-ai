"use client";

import Header from "./header";
import { InputContainer } from "@/components/settings/input-container";
import FormGenerator from "@/components/shared/form-generator";
import { useAdvancedSettings } from "@/hooks/setting/use-setting";
import { CONVERSATION_DURATIONS, TIMEZONES } from "@/constants/setting";
import { AdvancedSetting } from "@prisma/client";
import MultiAddInput from "../shared/multi-add-input";

const AdvanceSettingsForm = ({
  defaultValues,
}: {
  defaultValues?: AdvancedSetting | null;
}) => {
  const { errors, loading, onUpdate, register, control, isDirty } =
    useAdvancedSettings(defaultValues);

    console.log(errors)

  return (
    <form className="flex flex-col gap-4">
      <Header
        heading="ADVANCED"
        loading={loading}
        disabled={!isDirty}
        onSave={onUpdate}
      />
      <InputContainer
        label="Qualification questions"
        description="Agent will ask this question to quality the prospect."
        direction="horizontal"
      >
        <MultiAddInput control={control} name="questions" />
      </InputContainer>
      <InputContainer
        label="Max Conversation Duration"
        description="The maximum number of seconds that a conversation can last."
      >
        <FormGenerator
          name="maxConversationDuration"
          placeholder="Select Duration"
          register={register}
          errors={errors}
          inputType="select"
          type="number"
          options={CONVERSATION_DURATIONS}
          control={control}
        />
      </InputContainer>
      <InputContainer
        label="Time Zone"
        description="The time zone in which the agent will calls as per the start and end time setting."
      >
        <FormGenerator
          name="timeZone"
          placeholder="Select time zone"
          register={register}
          errors={errors}
          inputType="select"
          options={TIMEZONES}
          type="text"
          control={control}
        />
      </InputContainer>

      <InputContainer
        label="Start Time"
        direction="horizontal"
        description="Specify the starting time when the AI agent is allowed to initiate calls."
      >
        <FormGenerator
          name="startAt"
          placeholder="Select time zone"
          register={register}
          errors={errors}
          inputType="input"
          type="number"
        />
      </InputContainer>

      <InputContainer
        label="End Time"
        direction="horizontal"
        description="Specify the ending time when the AI agent should stop initiating calls."
      >
        <FormGenerator
          name="endAt"
          placeholder="Select time zone"
          register={register}
          errors={errors}
          inputType="input"
          type="number"
        />
      </InputContainer>
    </form>
  );
};

export default AdvanceSettingsForm;
