import { z } from "zod";
import { Prisma } from "@prisma/client";

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
  image: true,
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
  // businessId: z.string().min(25).max(25),
  image: z.instanceof(File),
});

export type UpsertProductImageType = z.infer<
  typeof UpsertProductImageDTO
>;

export const DeleteProductImageDTO =
  UpsertProductImageDTO.omit({
    image: true,
  });

export type DeleteProductImageType = z.infer<
  typeof DeleteProductImageDTO
>;

export const UpdateProductVariantsDTO = z.object({
  productId: z.string().min(25).max(25),
  variants: z.array(
    z.object({
      // Required fields for new variants.
      name: z.string().min(3),
      // Optional fields for existing variants.
      id: z.string().min(36).max(36).optional(),
      isActive: z.boolean().optional(),
    })
  ),
});

export type UpdateProductVariantsType = z.infer<
  typeof UpdateProductVariantsDTO
>;

export const UpdateProductPricesDTO = z.object({
  productId: z.string().min(25).max(25),
  prices: z.array(
    z.object({
      // Required fields for new prices.
      price: z.coerce
        .number()
        .transform((val) => new Prisma.Decimal(val)),

      // Optional fields for new prices.
      quantity: z.coerce
        .number()
        .transform((val) => new Prisma.Decimal(val))
        .nullable()
        .optional(),
      sizeLabel: z
        .string()
        .min(2)
        .max(30)
        .nullable()
        .optional(),

      // Optional fields for existing prices.
      id: z.string().min(36).max(36).optional(),
      isActive: z.boolean().optional(),
      productId: z.string().min(25).max(25).optional(),
    })
  ),
});

export type UpdateProductPricesType = z.infer<
  typeof UpdateProductPricesDTO
>;

export const CreateProductCategoryDTO = z.object({
  name: z.string(),
  description: z.string().optional(),
});

export type CreateProductCategoryType = z.infer<
  typeof CreateProductCategoryDTO
>;
