"use client"

import { InputContainer } from "@/components/forms/settings/input-container";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useAgentSetting } from "@/hooks/settings/use-settings";

const AgentSettings = () => {
  const { register, errors, onChangeAgentSetting } = useAgentSetting();
  return (
    <form className="flex flex-col gap-4" onSubmit={onChangeAgentSetting}>
      <InputContainer
        label="Agent Language"
        description="Choose the default language the agent will communicate in."
      >
        <Select {...register("agentLanguage")}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Language" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="light">Light</SelectItem>
            <SelectItem value="dark">Dark</SelectItem>
            <SelectItem value="system">System</SelectItem>
          </SelectContent>
        </Select>
      </InputContainer>
      <InputContainer
        label="Voice"
        description="Select the ElevenLabs voice you want to use for the agent."
      >
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Voice" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="light">Light</SelectItem>
            <SelectItem value="dark">Dark</SelectItem>
            <SelectItem value="system">System</SelectItem>
          </SelectContent>
        </Select>
      </InputContainer>
      <InputContainer
        label="First Message"
        direction="horizontal"
        description="The first message the agent will say. If empty, the agent will wait for the user to start the conversation."
      >
        <Textarea placeholder="Enter message" />
      </InputContainer>
      <InputContainer
        label="Knowledge base"
        direction="horizontal"
        description="Provide the LLM with domain-specific information to help it answer questions more accurately."
      >
        <Textarea placeholder="Enter details" />
      </InputContainer>
    </form>
  );
};

export default AgentSettings;
