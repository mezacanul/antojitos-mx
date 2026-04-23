// services/product.service.ts
import { uploadImageToSupabase } from "@/lib/images";
import {
  getDiffPrices,
  getDiffVariants,
} from "@/utils/diff";
import { createSSR_Client } from "@/utils/supabase/server";
import { prisma } from "@antojitos-mx/db"; // Your prisma instance
import {
  BaseUnitType,
  CreateProductType,
  Price,
  ProductVariant,
  UpdateProductType,
} from "@antojitos-mx/shared";

async function createProduct(
  validatedData: CreateProductType,
  businessId: string
) {
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
      message: "!Producto creado exitosamente!",
      data: {
        transaction,
        storageData: sbResponse?.storageData ?? null,
      },
    };
    // console.log("response:", response);
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
}

async function updateProduct(
  validatedData: UpdateProductType,
  productId: string,
  businessId: string
) {
  try {
    const transaction = await prisma.$transaction(
      async (tx) => {
        const updatedProduct = await tx.product.update({
          where: { id: productId, businessId },
          data: {
            name: validatedData.name,
            description: validatedData.description,
            baseUnit:
              validatedData.baseUnit as BaseUnitType,
            isActive: validatedData.isActive,
            productCategory: {
              connect: {
                id: validatedData.productCategoryId,
              },
            },
          },
        });
        return updatedProduct;
      }
    );

    return {
      message: "!Producto actualizado exitosamente!",
      data: {
        transaction,
      },
    };
  } catch (error: any) {
    // Throw the error to be handled
    // by the caller (the controller)
    throw error;
  }
}

async function upsertProductImage(
  businessId: string,
  productId: string,
  image: File
) {
  let supabase: any;
  let sbResponse: any;
  const bucketName = "products";

  try {
    // 1. Get the existing image data from the database
    // before uploading the new image
    const existingProduct = await prisma.product.findUnique(
      {
        where: { id: productId, businessId },
        select: { imageUrl: true, imageId: true },
      }
    );

    // 2. Upload the image to Supabase
    // and get the storage data
    supabase = await createSSR_Client();
    const { data: storageData, error: storageError } =
      await uploadImageToSupabase({
        file: image as File,
        bucketName,
        supabase,
      });
    sbResponse = { storageData, storageError };

    // 3. Update the image data in the database
    // and return the transaction
    const transaction = await prisma.$transaction(
      async (tx) => {
        const updatedProduct = await tx.product.update({
          where: { id: productId, businessId },
          data: {
            imageUrl: sbResponse.storageData.path,
            imageId: sbResponse.storageData.id,
          },
          select: {
            id: true,
            name: true,
            imageUrl: true,
            imageId: true,
          },
        });
        return updatedProduct;
      }
    );

    // 4. Delete the old image from Supabase only after
    // a successful database update.
    if (sbResponse && existingProduct?.imageUrl) {
      supabase = supabase ?? (await createSSR_Client());
      await supabase.storage
        .from(bucketName)
        .remove([existingProduct.imageUrl]);
    }

    return {
      message: "!Imagen actualizada exitosamente!",
      data: {
        transaction,
        storageData: sbResponse?.storageData ?? null,
      },
    };
  } catch (error: any) {
    // Delete the newly uploaded file from Supabase
    // if there was an error updating the product
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
}

async function deleteProductImage(
  businessId: string,
  productId: string
) {
  let supabase: any;
  let sbResponse: any;
  const bucketName = "products";
  try {
    const existingProduct = await prisma.product.findUnique(
      {
        where: { id: productId, businessId },
        select: { imageUrl: true },
      }
    );

    if (existingProduct?.imageUrl) {
      supabase = await createSSR_Client();
      const { data: deletedFile, error: deletedFileError } =
        await supabase.storage
          .from(bucketName)
          .remove([existingProduct.imageUrl]);
      sbResponse = { deletedFile, deletedFileError };

      const transaction = await prisma.$transaction(
        async (tx) => {
          const updatedProduct = await tx.product.update({
            where: { id: productId, businessId },
            data: { imageUrl: null, imageId: null },
            select: {
              id: true,
              name: true,
              imageUrl: true,
              imageId: true,
            },
          });
          return updatedProduct;
        }
      );

      return {
        message: "!Imagen eliminada exitosamente!",
        data: {
          transaction,
          storageData: sbResponse?.deletedFile ?? null,
        },
      };
    } else {
      throw new Error("Imagen no encontrada");
    }
  } catch (error: any) {
    throw error;
  }
}

// TO DO:
// - Upsert / Delete product variants conditionally
// - Upsert / Delete product prices conditionally
async function updateProductVariants(
  productId: string,
  businessId: string,
  variants: ProductVariant[]
) {
  try {
    const incomingData = variants;

    const transaction = await prisma.$transaction(
      async (tx) => {
        // 1. FETCH (Inside the safety of the transaction)
        const existing =
          (await tx.productVariant.findMany({
            where: {
              product: {
                businessId: businessId,
                id: productId,
              },
            },
          })) || [];

        // 2. LOGIC (Separate this into a helper function if it feels clunky)
        const { toCreate, toUpdate, toDelete } =
          getDiffVariants(
            incomingData,
            existing,
            productId
          );

        // return {
        //   existing,
        //   incomingData,
        //   toCreate,
        //   toUpdate,
        //   toDelete,
        // };

        // 3. EXECUTION
        // 3.1. Delete missing variants.
        const toDeleteIds = toDelete.map((v) => v.id);
        const deletedData =
          await tx.productVariant.deleteMany({
            where: { id: { in: toDeleteIds } },
          });

        // 4. Create brand new variants.
        const createdData =
          await tx.productVariant.createMany({
            data: toCreate,
          });

        // 5. Update only changed variants.
        const updatedData = await Promise.all(
          toUpdate.map((v) =>
            tx.productVariant.update({
              where: { id: v.id },
              data: v.data,
            })
          )
        );
        return {
          deletedData,
          createdData,
          updatedData,
        };
      }
    );
    return {
      message: "!Variantes actualizadas exitosamente!",
      data: {
        transaction,
      },
    };
  } catch (error: any) {
    throw error;
  }
}

async function updateProductPrices(
  productId: string,
  businessId: string,
  prices: Price[]
) {
  try {
    const incomingData = prices;

    const transaction = await prisma.$transaction(
      async (tx) => {
        // 1. FETCH (Inside the safety of the transaction)
        const existing =
          (await tx.price.findMany({
            where: {
              product: {
                businessId: businessId,
                id: productId,
              },
            },
          })) || [];

        // 2. LOGIC (Separate this into a helper function if it feels clunky)
        const { toCreate, toUpdate, toDelete } =
          getDiffPrices(incomingData, existing, productId);
        // return {
        //   // existing,
        //   // incomingData,
        //   toCreate,
        //   toUpdate,
        //   toDelete,
        // };

        // 3. EXECUTION
        // 3.1. Delete missing prices.
        const toDeleteIds = toDelete.map((p) => p.id);
        const deletedData = await tx.price.deleteMany({
          where: { id: { in: toDeleteIds } },
        });

        // 4. Create brand new prices.
        const createdData = await tx.price.createMany({
          data: toCreate,
        });

        // 5. Update only changed prices.
        const updatedData = await Promise.all(
          toUpdate.map((p) =>
            tx.price.update({
              where: { id: p.id },
              data: p.data,
            })
          )
        );
        return {
          deletedData,
          createdData,
          updatedData,
        };
      }
    );

    return {
      message: "!Precios actualizados exitosamente!",
      data: {
        transaction,
      },
    };
  } catch (error: any) {
    throw error;
  }
}

export const productService = {
  createProduct,
  updateProduct,
  upsertProductImage,
  deleteProductImage,
  updateProductVariants,
  updateProductPrices,
};
