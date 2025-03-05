import { z } from "zod";

export const AccountSettingsSchema = z.object({
  firstName: z.string().min(1).max(100),
  lastName: z.string().min(1).max(100),
  email: z.string().email(),
  phoneNumber: z.string().optional(),
  companyName: z.string().optional(),
});

export const ChangePasswordInputSchema = z.object({
  newPassword: z
    .string()
    .min(8, { message: "Your password must be atleast 8 characters long" })
    .max(64, {
      message: "Your password can not be longer then 64 characters long",
    })
    .refine(
      (value) => /^[a-zA-Z0-9_.-]*$/.test(value ?? ""),
      "password should contain only alphabets and numbers"
    ),
});

export const AgentSettingsSchema = z.object({
  language: z.string(),
  voice: z.string(),
  firstMessage: z.string(),
  knowledgeBase: z.string(),
});

export const ScriptSettingsSchema = z.object({
  initial: z.string(),
  followUp: z.string(),
});

export const AdvancedSettingsSchema = z.object({
  maxConversationDuration: z.string(),
  keywords: z.array(z.string()),
  timeZone: z.string(),
  startAt: z.string().min(1),
  endAt: z.string().min(1),
});
