import {
  onUpdateAccountSettings,
  onUpdateAdvancedSettings,
  onUpdateAgentSettings,
  onUpdatePassword,
  onUpdateScriptSettings,
} from "@/actions/setting";
import { useToast } from "@/hooks/use-toast";
import {
  AccountSettingsSchema,
  AdvancedSettingsSchema,
  AgentSettingsSchema,
  ChangePasswordInputSchema,
  ScriptSettingsSchema,
} from "@/schemas/setting.schema";
import { ClerkAPIError } from "@clerk/types";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  AdvancedSetting,
  AgentSetting,
  Prisma,
  ScriptSetting,
  User,
} from "@prisma/client";
import { useState } from "react";
import { useForm } from "react-hook-form";

export const useAccountSettings = (defaultValues?: User | null) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    reset,
    control,
  } = useForm<Prisma.UserUpdateInput>({
    resolver: zodResolver(AccountSettingsSchema),
    mode: "onChange",
    defaultValues: defaultValues || {},
  });
  const { toast } = useToast();
  const [loading, setLoading] = useState<boolean>(false);

  const onUpdate = handleSubmit(async (values) => {
    try {
      setLoading(true);
      const updated = await onUpdateAccountSettings(values);
      if (updated.status === 200) {
        toast({ title: "Success", description: updated.message });
        reset(values);
      } else
        toast({
          title: "Error",
          description: updated.message,
          variant: "destructive",
        });
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  });

  return {
    register,
    errors,
    onUpdate,
    loading,
    control,
    isDirty,
  };
};

export const useChangePassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    reset,
  } = useForm({
    resolver: zodResolver(ChangePasswordInputSchema),
    mode: "onChange",
  });
  const { toast } = useToast();
  const [loading, setLoading] = useState<boolean>(false);

  const onUpdate = handleSubmit(async (values) => {
    setLoading(true);
    try {
      const res = await onUpdatePassword(values.newPassword);
      if (res.status == 200) {
        toast({ title: "Success", description: "Password updated" });
        reset();
      } else {
        toast({
          title: "Error",
          description: res.message,
          variant: "destructive",
        });
      }
    } catch (error: unknown) {
      const clerkError = error as { errors?: ClerkAPIError[] };
      toast({
        title: "Error",
        description: clerkError?.errors?.[0].longMessage,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  });

  return {
    register,
    errors,
    onUpdate,
    loading,
    isDirty,
  };
};

export const useAgentSettings = (defaultValues?: AgentSetting | null) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    reset,
    control,
  } = useForm<Prisma.AgentSettingUpdateInput>({
    resolver: zodResolver(AgentSettingsSchema),
    mode: "onChange",
    defaultValues: defaultValues || {},
  });
  const { toast } = useToast();
  const [loading, setLoading] = useState<boolean>(false);

  const onUpdate = handleSubmit(async (values) => {
    try {
      setLoading(true);
      const updated = await onUpdateAgentSettings(values);
      if (updated.status === 200) {
        reset(values);
        toast({ title: "Success", description: updated.message });
      } else {
        toast({
          title: "Error",
          description: updated.message,
          variant: "destructive",
        });
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  });
  return {
    register,
    errors,
    onUpdate,
    loading,
    control,
    isDirty,
  };
};

export const useScriptSettings = (defaultValues?: ScriptSetting | null) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    reset,
    control,
  } = useForm<Prisma.ScriptSettingUpdateInput>({
    resolver: zodResolver(ScriptSettingsSchema),
    mode: "onChange",
    defaultValues: defaultValues || {},
  });
  const { toast } = useToast();
  const [loading, setLoading] = useState<boolean>(false);

  const onUpdate = handleSubmit(async (values) => {
    try {
      setLoading(true);
      const updated = await onUpdateScriptSettings(values);
      if (updated.status === 200) {
        reset(values);
        toast({ title: "Success", description: updated.message });
      } else {
        toast({
          title: "Error",
          description: updated.message,
          variant: "destructive",
        });
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  });
  return {
    register,
    errors,
    onUpdate,
    loading,
    control,
    isDirty,
  };
};

export const useAdvancedSettings = (defaultValues?: AdvancedSetting | null) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    reset,
    control,
  } = useForm<Prisma.AdvancedSettingUpdateInput>({
    resolver: zodResolver(AdvancedSettingsSchema),
    mode: "onChange",
    defaultValues: defaultValues || {},
  });
  const { toast } = useToast();
  const [loading, setLoading] = useState<boolean>(false);

  const onUpdate = handleSubmit(async (values) => {
    try {
      setLoading(true);
      const updated = await onUpdateAdvancedSettings({
        ...values,
        startAt: parseInt(`${values.startAt}` || "8"),
        endAt: parseInt(`${values.endAt}` || "18"),
      });
      if (updated.status === 200) {
        reset(values);
        toast({ title: "Success", description: updated.message });
      } else {
        toast({
          title: "Error",
          description: updated.message,
          variant: "destructive",
        });
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  });

  return {
    register,
    errors,
    onUpdate,
    loading,
    control,
    isDirty,
  };
};
