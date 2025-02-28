"use client";

import { InputContainer } from "@/components/settings/input-container";
import FormGenerator from "@/components/shared/form-generator";
import { useAgentSettings } from "@/hooks/setting/use-setting";
import { AgentSetting } from "@prisma/client";
import { LANGUAGES } from "@/constants/setting";
import Header from "./header";

type VOICE = {
  voiceId: string;
  name: string;
  description: string;
  previewUrl: string;
  ownership: string;
};

const AgentSettingsForm = ({
  defaultValues,
  voices,
}: {
  voices: VOICE[];
  defaultValues?: AgentSetting | null;
}) => {
  const { register, errors, onUpdate, control, loading, isDirty } =
    useAgentSettings(defaultValues);
  return (
    <form className="flex flex-col gap-4">
      <Header
        heading="AI AGENT"
        disabled={!isDirty}
        loading={loading}
        onSave={onUpdate}
      />
      <InputContainer
        label="Agent Language"
        description="Choose the default language the agent will communicate in."
      >
        <FormGenerator
          name="language"
          placeholder="Select language"
          register={register}
          errors={errors}
          inputType="select"
          type="text"
          options={LANGUAGES}
          control={control}
        />
      </InputContainer>
      <InputContainer
        label="Voice"
        description="Select the ElevenLabs voice you want to use for the agent."
      >
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
        />
      </InputContainer>
      <InputContainer
        label="First Message"
        direction="horizontal"
        description="The first message the agent will say. If empty, the agent will wait for the user to start the conversation."
      >
        <FormGenerator
          name="firstMessage"
          placeholder="Enter first message"
          register={register}
          errors={errors}
          inputType="textarea"
          type="text"
        />
      </InputContainer>
      <InputContainer
        label="Knowledge base"
        direction="horizontal"
        description="Provide the LLM with domain-specific information to help it answer questions more accurately."
      >
        <FormGenerator
          name="knowledgeBase"
          placeholder="Enter knowledge"
          register={register}
          errors={errors}
          inputType="textarea"
          type="text"
        />
      </InputContainer>
    </form>
  );
};

export default AgentSettingsForm;
