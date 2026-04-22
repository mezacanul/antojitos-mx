type UploadImageToSupabasePayload = {
  file: File;
  bucketName: string;
  supabase: any;
};

async function uploadImageToSupabase(
  payload: UploadImageToSupabasePayload
) {
  const { file, bucketName, supabase } = payload;
  if (!file || !bucketName) {
    throw new Error("File and bucket name are required");
  }

  // 1. Validate File Type
  const allowedTypes = [
    "image/png",
    "image/jpeg",
    "image/jpg",
  ];
  // console.log(file);

  if (!allowedTypes.includes(file.type)) {
    throw new Error(
      "Invalid file type. Only PNG and JPG are allowed."
    );
  }

  // 2. Upload to Supabase Storage (S3)
  const fileExt = file.name.split(".").pop();
  const fileName = `${Date.now()}.${fileExt}`;

  const { data: storageData, error: storageError } =
    await supabase.storage
      .from(bucketName)
      .upload(fileName, file);

  console.log(
    "Uploaded image data",
    storageData
  );

  if (storageError)
    throw new Error(
      `Storage error: ${storageError.message}`
    );

  return {
    data: storageData,
    error: storageError,
  };
}

export { uploadImageToSupabase };
