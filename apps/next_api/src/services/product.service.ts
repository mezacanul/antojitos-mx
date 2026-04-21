// services/product.service.ts
import { createSSR_Client } from "@/utils/supabase/server";
import { prisma } from "@antojitos-mx/db"; // Your prisma instance

export const productService = {
  async createProduct(formData: FormData) {
    const supabase = await createSSR_Client();
    // console.log(formData);

    const file = formData.get("image") as File;
    const name = formData.get("name") as string;
    const description = formData.get(
      "description"
    ) as string;
    const price = formData.get("price") as string;
    const branchId = formData.get("branchId") as string;
    const businessId = formData.get("businessId") as string;

    // 1. Validate File Type
    const allowedTypes = [
      "image/png",
      "image/jpeg",
      "image/jpg",
    ];
    // console.log(file);

    if (!file || !allowedTypes.includes(file.type)) {
      throw new Error(
        "Invalid file type. Only PNG and JPG are allowed."
      );
    }

    // 2. Upload to Supabase Storage (S3)
    const fileExt = file.name.split(".").pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const bucketName = "products";

    const { data: storageData, error: storageError } =
      await supabase.storage
        .from(bucketName)
        .upload(fileName, file);

    if (storageError)
      throw new Error(
        `Storage error: ${storageError.message}`
      );

    try {
      // 3. Add Product to Database via Prisma
      const newProduct = await prisma.product.create({
        data: {
          name,
          description,
          businessId,
          imageUrl: storageData.path, // Store the path to retrieve it later
        },
      });

      return newProduct;
    } catch (dbError) {
      console.log(dbError);

      // 4. Rollback: If DB fails, remove the uploaded picture
      await supabase.storage
        .from(bucketName)
        .remove([fileName]);

      throw new Error(
        "Database transaction failed. Image upload rolled back."
      );
    }
  },
};
