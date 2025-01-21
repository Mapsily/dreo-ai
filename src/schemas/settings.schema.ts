import { z } from "zod";

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

