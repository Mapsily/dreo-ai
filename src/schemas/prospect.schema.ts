import { z } from "zod";

export const ProspectInputSchema = z.object({
  name: z.string().min(1, "Name is required").max(20),
  phone: z
    .string()
    .regex(
      /^\+\d{11,12}$/,
      "Phone number must start with '+' followed by 11 to 12 digits"
    )
    .min(12)
    .max(13),
  notes: z.string().min(1, "Notes is required").max(100),
});
