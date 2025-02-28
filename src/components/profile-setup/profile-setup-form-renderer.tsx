"use client";

import React from "react";
import dynamic from "next/dynamic";
import { Spinner } from "@/components/shared/loader/spinner";
import { useProfileSetupContext } from "@/context/profile-setup-provider";
import AccountSetupForm from "./account-setup-form";
import ProgressView from "../shared/progress-view";
import { SETTING_STEPS } from "@/constants/setting";
import {
  useAccountSettings,
  useAdvancedSettings,
  useAgentSettings,
  useScriptSettings,
} from "@/hooks/setting/use-setting";
import { User } from "@prisma/client";

const AgentSetupForm = dynamic(() => import("./agent-setup-form"), {
  ssr: false,
  loading: Spinner,
});

const ScriptSetupForm = dynamic(() => import("./script-setup-form"), {
  ssr: false,
  loading: Spinner,
});

const AdvancedSetupForm = dynamic(() => import("./advanced-setup-form"), {
  ssr: false,
  loading: Spinner,
});

const ProfileSetupFormRenderer = ({ user }: { user: User | null }) => {
  const {
    errors: accountErrors,
    loading: accountLoading,
    onUpdate: accountOnUpdate,
    register: accountRegister,
  } = useAccountSettings(user);
  const {
    errors: agentErrors,
    control: agentControl,
    onUpdate: agentOnUpdate,
    register: agentRegister,
    loading: agentLoading,
  } = useAgentSettings();
  const {
    errors: scriptErrors,
    onUpdate: scriptOnUpdate,
    register: scriptRegister,
    loading: scriptLoading,
  } = useScriptSettings();
  const {
    errors: advancedErrors,
    onUpdate: advancedOnUpdate,
    register: advancedRegister,
    loading: advancedLoading,
    control: advancedControl,
  } = useAdvancedSettings();
  const { currentStep } = useProfileSetupContext();

  const getForm = () => {
    switch (currentStep) {
      case 1:
        return (
          <AccountSetupForm
            errors={accountErrors}
            loading={accountLoading}
            onUpdate={accountOnUpdate}
            register={accountRegister}
          />
        );
      case 2:
        return (
          <AgentSetupForm
            errors={agentErrors}
            loading={agentLoading}
            onUpdate={agentOnUpdate}
            register={agentRegister}
            control={agentControl}
          />
        );
      case 3:
        return (
          <ScriptSetupForm
            errors={scriptErrors}
            loading={scriptLoading}
            onUpdate={scriptOnUpdate}
            register={scriptRegister}
          />
        );
      case 4:
        return (
          <AdvancedSetupForm
            control={advancedControl}
            errors={advancedErrors}
            loading={advancedLoading}
            onUpdate={advancedOnUpdate}
            register={advancedRegister}
          />
        );
    }
  };

  return (
    <>
      <ProgressView steps={SETTING_STEPS} currentStep={currentStep} />
      {getForm()}
    </>
  );
};

export default ProfileSetupFormRenderer;
