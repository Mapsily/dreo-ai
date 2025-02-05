import { z } from "zod";

export const ProspectInputSchema = z.object({
  name: z.string(),
  phone: z.string().min(12).max(13),
  notes: z.string().max(100),
});
