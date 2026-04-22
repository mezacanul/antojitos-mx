import { z } from "zod";

export const CreateProductDTO = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  baseUnit: z.string().min(1),
  image: z.instanceof(File).optional(),

  productCategoryId: z.string().min(36).max(36),
  variants: z
    .string()
    .transform((str, ctx) => {
      try {
        const parsed = JSON.parse(str);
        return parsed;
      } catch (error) {
        ctx.addIssue({
          code: "custom",
          message: "Invalid variants JSON",
        });
        return z.never();
      }
    })
    .pipe(
      z.array(
        z.object({
          name: z.string().min(1),
        })
      )
    ),
  prices: z
    .string()
    .transform((str, ctx) => {
      try {
        const parsed = JSON.parse(str);
        return parsed;
      } catch (error) {
        ctx.addIssue({
          code: "custom",
          message: "Invalid prices JSON",
        });
        return z.never();
      }
    })
    .pipe(
      z.array(
        z.object({
          price: z.coerce.number(),
          quantity: z.coerce.number().optional(),
          sizeLabel: z.string().optional(),
        })
      )
    ),
});

export type CreateProductType = z.infer<
  typeof CreateProductDTO
>;
