import { z } from "zod";


export const AccountSettingsSchema = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email(),
  phoneNumber: z.number().optional(),
  companyName: z.string().optional(),
});

export const AdvancedSettingsSchema = z.object({
  maxConversationDuration: z.number().min(0).max(3600),
  keywords: z.array(z.string()),
  startDate: z.date(),
  endDate: z.date(),
});

export const AgentSettingsSchema = z.object({
  maxConversationDuration: z.number().min(0).max(3600),
  keywords: z.array(z.string()),
  startDate: z.date(),
  endDate: z.date(),
});

