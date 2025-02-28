import { z } from "zod";

export const AccountSettingsSchema = z.object({
  firstName: z.string().min(1).max(100),
  lastName: z.string().min(1).max(100),
  email: z.string().email(),
  phoneNumber: z.string().optional(),
  companyName: z.string().optional(),
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
