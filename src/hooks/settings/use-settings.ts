import { onUpdateAdvanceSettings, onUpdateAgentSettings, onUpdatePassword } from "@/actions/settings";
import { useToast } from "@/components/ui/use-toast";
import {
  ChangePasswordProps,
  ChangePasswordSchema,
} from "@/schemas/auth.schema";
import {
  AdvancedSettingsSchema,
  AgentSettingsSchema,
} from "@/schemas/settings.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Prisma } from "@prisma/client";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const upload = undefined;

export const useThemeMode = () => {
  const { setTheme, theme } = useTheme();
  return {
    setTheme,
    theme,
  };
};

export const useChangePassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ChangePasswordProps>({
    resolver: zodResolver(ChangePasswordSchema),
    mode: "onChange",
  });
  const { toast } = useToast();
  const [loading, setLoading] = useState<boolean>(false);

  const onChangePassword = handleSubmit(async (values) => {
    try {
      setLoading(true);
      const updated = await onUpdatePassword(values.password);
      if (updated) {
        reset();
        setLoading(false);
        toast({ title: "Success", description: updated.message });
      }
    } catch (error) {
      console.log(error);
    }
  });
  return {
    register,
    errors,
    onChangePassword,
    loading,
  };
};

export const useAdvanceSetting = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm<Prisma.AdvanceSettingUpdateInput>({
    resolver: zodResolver(AdvancedSettingsSchema),
    mode: "onChange",
  });
  const { toast } = useToast();
  const [loading, setLoading] = useState<boolean>(false);

  const onChangeAdvanceSetting = handleSubmit(async (values) => {
    try {
      setLoading(true);
      console.log(values);
      const updated = await onUpdateAdvanceSettings(values);
      if (updated) {
        reset();
        setLoading(false);
        toast({ title: "Success", description: updated.message });
      }
    } catch (error) {
      console.log(error);
    }
  });
  return {
    register,
    errors,
    onChangeAdvanceSetting,
    loading,
    control,
  };
};

export const useAgentSetting = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm<Prisma.AgentSettingUpdateInput>({
    resolver: zodResolver(AgentSettingsSchema),
    mode: "onChange",
  });
  const { toast } = useToast();
  const [loading, setLoading] = useState<boolean>(false);

  const onChangeAgentSetting = handleSubmit(async (values) => {
    try {
      setLoading(true);
      const updated = await onUpdateAgentSettings(values);
      if (updated) {
        reset();
        setLoading(false);
        toast({ title: "Success", description: updated.message });
      }
    } catch (error) {
      console.log(error);
    }
  });
  return {
    register,
    errors,
    onChangeAgentSetting,
    loading,
    control,
  };
};
