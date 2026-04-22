// services/product.service.ts
import { uploadImageToSupabase } from "@/lib/images";
import { handleZodError } from "@/lib/response";
import { createProduct } from "@/repositories/product.repo";
import { createSSR_Client } from "@/utils/supabase/server";
import { prisma } from "@antojitos-mx/db"; // Your prisma instance
import { CreateProductType } from "@antojitos-mx/shared";

export const productService = {
  createProduct: async (
    validatedData: CreateProductType,
    businessId: string
  ) => {
    let supabase: any;
    let sbResponse: any;
    const bucketName = "products";

    try {
      const file = validatedData.image;

      // Upload the image to Supabase if it
      // exists in the request
      if (file) {
        supabase = await createSSR_Client();
        console.log("file:", file);
        const { data: storageData, error: storageError } =
          await uploadImageToSupabase({
            file: file as File,
            bucketName,
            supabase,
          });
        sbResponse = { storageData, storageError };
      }

      // Insert the product into the database
      const transaction = await prisma.$transaction(
        async (tx) => {
          const newProduct = await tx.product.create({
            data: {
              name: validatedData.name,
              description: validatedData.description,
              imageUrl: sbResponse
                ? sbResponse.storageData.path
                : null,
              imageId: sbResponse
                ? sbResponse.storageData.id
                : null,
              productCategory: {
                connect: {
                  id: validatedData.productCategoryId,
                },
              },
              business: {
                connect: {
                  id: businessId,
                },
              },
              productVariants: {
                create: validatedData.variants,
              },
              prices: { create: validatedData.prices },
            },
            include: {
              productVariants: true,
              prices: true,
            },
          });
          return newProduct;
        }
      );

      // Return the transaction, storage data (if any)
      // and a success message
      const response = {
        message: "!Producto creado correctamente!",
        data: {
          transaction,
          storageData: sbResponse?.storageData ?? null,
        },
      };
      console.log("response:", response);
      return response;
    } catch (error: any) {
      // Delete the file from Supabase
      // if there was an error inserting the product
      let deletedFile: any = null;
      if (sbResponse) {
        deletedFile = await supabase.storage
          .from(bucketName)
          .remove([sbResponse.storageData.path]);
        console.log("deleted file:", deletedFile);
      }

      // Throw the error to be handled
      // by the caller (the controller)
      throw error;
    }
  },
};
