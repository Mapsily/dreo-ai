import { InputContainer } from "@/components/forms/settings/input-container";
import { Textarea } from "@/components/ui/textarea";

const ScriptSetting = () => {
  return (
    <>
      <InputContainer
        label="Prospecting"
        direction="horizontal"
        description="Define the initial message your agent uses to introduce itself and start engaging potential customers."
      >
        <Textarea placeholder="Enter script" />
      </InputContainer>

      <InputContainer
        label="Qualification"
        direction="horizontal"
        description="Specify the questions or criteria your agent will use to assess whether a lead is a good fit for your offerings."
      >
        <Textarea placeholder="Enter script" />
      </InputContainer>

      <InputContainer
        label="Appointment"
        direction="horizontal"
        description="Provide the script your agent will use to schedule appointments or close the conversation with a clear next step."
      >
        <Textarea placeholder="Enter script" />
      </InputContainer>
    </>
  );
};

export default ScriptSetting;
