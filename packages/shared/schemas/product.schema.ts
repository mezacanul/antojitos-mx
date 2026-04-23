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

export const UpdateProductDTO = CreateProductDTO.omit({
  variants: true,
  prices: true,
}).extend({
  id: z.string().min(25).max(25),
  isActive: z.boolean(),
});

export type UpdateProductType = z.infer<
  typeof UpdateProductDTO
>;

export const UpsertProductImageDTO = z.object({
  productId: z.string().min(25).max(25),
  businessId: z.string().min(25).max(25),
  image: z.instanceof(File),
});

export type UpsertProductImageType = z.infer<
  typeof UpsertProductImageDTO
>;
