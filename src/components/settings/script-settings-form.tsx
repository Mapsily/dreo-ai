"use client";

import { useScriptSettings } from "@/hooks/setting/use-setting";
import FormGenerator from "@/components/shared/form-generator";
import { InputContainer } from "./input-container";
import Header from "./header";
import { ScriptSetting } from "@prisma/client";

type Props = {
  defaultValues?: ScriptSetting | null;
};

const ScriptSettingsForm = ({ defaultValues }: Props) => {
  const { errors, loading, onUpdate, register, isDirty } =
    useScriptSettings(defaultValues);

  return (
    <form className="flex flex-col gap-4">
      <Header
        heading="SCRIPT"
        loading={loading}
        disabled={!isDirty}
        onSave={onUpdate}
      />
      <InputContainer
        label="Initial Call Script"
        direction="horizontal"
        description="Define the initial message your agent uses to introduce itself and start engaging potential customers."
      >
        <FormGenerator
          name="initial"
          placeholder="Enter initial call script"
          register={register}
          errors={errors}
          inputType="textarea"
          type="text"
        />
      </InputContainer>
      <InputContainer
        label="FollowUp Call Script"
        direction="horizontal"
        description="Specify the script for follow up calls by AI Agent to the prospects"
      >
        <FormGenerator
          name="followUp"
          placeholder="Enter follow up call script"
          register={register}
          errors={errors}
          inputType="textarea"
          type="text"
        />
      </InputContainer>
    </form>
  );
};

export default ScriptSettingsForm;
