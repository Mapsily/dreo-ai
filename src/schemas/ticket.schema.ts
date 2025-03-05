import { z } from "zod";

export const TicketInputSchema = z.object({
  title: z.string().min(1).max(100),
  description: z.string().min(10).max(200),
  category: z.enum(["TECHNICAL", "FEATURE", "PAYMENT"]),
});
