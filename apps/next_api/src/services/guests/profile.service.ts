import { uploadImageToSupabase } from "@/lib/images";
import { createSSR_Client } from "@/utils/supabase/server";
import { prisma } from "@antojitos-mx/db";

async function upsertUserPicture(
  userID: string,
  picture: File
) {
  let supabase: any = null;
  let sbResponse: any;
  const bucketName = "profile";

  try {
    // 1. Get the existing picture from the database
    const existingPicture = await prisma.user.findUnique({
      where: { id: userID },
      select: { imageUrl: true },
    });

    // 2. Upload the picture to Supabase
    // and get the storage data
    supabase = await createSSR_Client();
    const { data: storageData, error: storageError } =
      await uploadImageToSupabase({
        file: picture,
        bucketName,
        supabase,
      });
    sbResponse = { storageData, storageError };

    // 3. Update the user picture in the database
    // and return the updated user
    const updatedUser = await prisma.user.update({
      where: { id: userID },
      data: {
        imageUrl: sbResponse.storageData.path,
      },
      select: {
        id: true,
        names: true,
        imageUrl: true,
      },
    });

    // 4. If theres was an existing picture,
    // delete it from Supabase only after
    // a successful database "imageUrl" update.
    if (sbResponse && existingPicture?.imageUrl) {
      supabase = supabase ?? (await createSSR_Client());
      await supabase.storage
        .from(bucketName)
        .remove([existingPicture.imageUrl]);
    }

    return {
      message: "!Imagen actualizada exitosamente!",
      data: {
        transaction: updatedUser,
        storageData: sbResponse?.storageData ?? null,
      },
    };
  } catch (error: any) {
    // 5. If there was an error, delete the newly uploaded picture from Supabase
    let deletedFile: any = null;
    if (sbResponse) {
      console.log(
        "deleting file:",
        sbResponse.storageData.path
      );
      supabase = supabase ?? (await createSSR_Client());
      deletedFile = await supabase.storage
        .from(bucketName)
        .remove([sbResponse.storageData.path]);
      console.log("deleted file successfully");
    }

    // 6. Throw the error to be handled
    // by the caller (the controller)
    throw error;
  }
}

async function deleteUserPicture(userID: string) {
  let supabase: any = null;
  let sbResponse: any;
  const bucketName = "profile";

  try {
    // 1. Get the existing picture from the database
    const existingPicture = await prisma.user.findUnique({
      where: { id: userID },
      select: { imageUrl: true },
    });

    // 2. Delete the picture from Supabase
    supabase = await createSSR_Client();
    const { data: storageData, error: storageError } =
      await supabase.storage
        .from(bucketName)
        .remove([existingPicture?.imageUrl]);
    sbResponse = { storageData, storageError };

    // 3. Update the user picture in the database
    const updatedUser = await prisma.user.update({
      where: { id: userID },
      data: {
        imageUrl: null,
      },
      select: {
        id: true,
        names: true,
        imageUrl: true,
      },
    });

    return {
      message: "!Imagen eliminada exitosamente!",
      data: {
        transaction: updatedUser,
      },
    };
  } catch (error: any) {
    // 4. If there was an error, throw the error to be handled
    // by the caller (the controller)
    throw error;
  }
}

export const ProfileService = {
  upsertUserPicture,
  deleteUserPicture,
};
