import { z } from "zod";

export const ProductInputSchema = z.object({
  name: z.string().min(1, "Name is required"),
  price: z
    .string() // Accept string from input
    .transform((val) => parseInt(val, 10)) // Transform to number
    .refine((val) => !isNaN(val), { message: "Price must be a valid number" })
    .refine((val) => val >= 0, { message: "Price cannot be negative" }),
  description: z.string().min(1, "Description is required"),
});