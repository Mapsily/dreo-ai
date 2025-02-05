"use client";

import { InputContainer } from "@/components/forms/settings/input-container";
import { Input } from "@/components/ui/input";
import { DateTimePicker } from "@/components/date-time-picker";
import FormGenerator from "@/components/forms/form-generator";
import { useAdvanceSetting } from "@/hooks/settings/use-settings";

const AdvanceSettings = () => {
  const { errors, loading, onChangeAdvanceSetting, register, control } =
    useAdvanceSetting();

  return (
    <form onSubmit={onChangeAdvanceSetting} className="flex flex-col gap-4">
      <InputContainer
        label="Max Conversation Duration"
        description="The maximum number of seconds that a conversation can last."
      >
        <FormGenerator
          name="maxConversationDuration"
          placeholder="Enter number"
          register={register}
          errors={errors}
          inputType="input"
          type="number"
        />
      </InputContainer>

      <InputContainer
        label="Keywords"
        direction="horizontal"
        description="Define a comma-separated list of keywords that have a higher likelihood of being predicted correctly."
      >
        <Input name="keywords" placeholder="Enter Keywords" />
      </InputContainer>

      <InputContainer
        label="Start Date and Time"
        direction="horizontal"
        description="Specify the starting date and time when the AI agent is allowed to initiate calls."
      >
        <DateTimePicker name="startAt" control={control} />
      </InputContainer>

      <InputContainer
        label="End Date and Time"
        direction="horizontal"
        description="Specify the ending date and time when the AI agent should stop initiating calls."
      >
        <DateTimePicker name="endAt" control={control} />
      </InputContainer>
    </form>
  );
};

export default AdvanceSettings;
