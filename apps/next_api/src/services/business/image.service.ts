import { prisma } from "@antojitos-mx/db";
import { createSSR_Client } from "@/utils/supabase/server";
import { uploadImageToSupabase } from "@/lib/images";

export async function upsertBusinessPicture(
  businessId: string,
  image: File
) {
  let supabase: any;
  let sbResponse: any;
  const bucketName = "business";

  try {
    // 1. Get the existing image data from the database
    // before uploading the new image
    const existingBusiness =
      await prisma.business.findUnique({
        where: { id: businessId },
        select: { imageUrl: true },
      });

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
        const updatedBusiness = await tx.business.update({
          where: { id: businessId },
          data: {
            imageUrl: sbResponse.storageData.path,
          },
          select: {
            id: true,
            name: true,
            imageUrl: true,
          },
        });
        return updatedBusiness;
      }
    );

    // 4. Delete the old image from Supabase only after
    // a successful database update.
    if (sbResponse && existingBusiness?.imageUrl) {
      supabase = supabase ?? (await createSSR_Client());
      await supabase.storage
        .from(bucketName)
        .remove([existingBusiness.imageUrl]);
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

export async function deleteBusinessPicture(
  businessId: string
) {
  let supabase: any;
  let sbResponse: any;
  const bucketName = "business";
  try {
    const existingBusiness =
      await prisma.business.findUnique({
        where: { id: businessId },
        select: { imageUrl: true },
      });

    if (existingBusiness?.imageUrl) {
      supabase = await createSSR_Client();
      const { data: deletedFile, error: deletedFileError } =
        await supabase.storage
          .from(bucketName)
          .remove([existingBusiness.imageUrl]);
      sbResponse = { deletedFile, deletedFileError };

      const transaction = await prisma.$transaction(
        async (tx) => {
          const updatedBusiness = await tx.business.update({
            where: { id: businessId },
            data: { imageUrl: null },
            select: {
              id: true,
              name: true,
              imageUrl: true,
            },
          });
          return updatedBusiness;
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
