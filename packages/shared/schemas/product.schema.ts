import { z } from "zod";

export const CreateProductDTO = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  baseUnit: z.string().min(1),
  imageUrl: z.string().min(1),

  productCategoryId: z.string().min(1),
  variants: z.array(
    z.object({
      name: z.string().min(1),
    })
  ),
  prices: z.array(
    z.object({
      price: z.number(),
      quantity: z.number().optional(),
      sizeLabel: z.string().optional(),
    })
  ),
});

export type CreateProductInput = z.infer<
  typeof CreateProductDTO
>;
