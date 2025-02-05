import { z } from "zod";

export const ProductInputSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(10),
  price: z.string(),
});
