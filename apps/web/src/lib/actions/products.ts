"use server";
import { performAction } from "@/lib/api-wrapper";
import { revalidatePath } from "next/cache";

export async function createProductCategory(payload: any) {
  console.log("payload:", payload);
  const result = await performAction(
    "/products/categories",
    {
      method: "POST",
      body: JSON.stringify(payload),
    }
  );
  console.log("createProductCategory:", result);

  // Revalidate the productos panel path
  await revalidatePath("/empresas/panel/productos");

  return result;
}
