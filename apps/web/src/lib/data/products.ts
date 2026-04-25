import { Product } from "@/types";
import { performAction } from "../api-wrapper";

async function getProductsByBusinessId(
  businessId: string
): Promise<Product[]> {
  const res = await performAction(
    `/products?businessId=${businessId}`
  );
  console.log("res:", res);
  return res;
}

async function getAllProductCategories(): Promise<any[]> {
  try {
    const res = await performAction(`/products/category`);
    console.log("res:", res);
    return res;
  } catch (error) {
    console.error(error);
    return [];
  }
}

async function getProductCategoryById(
  productCategoryId: string
): Promise<any> {
  const res = await performAction(
    `/products/category/${productCategoryId}`
  );
  return res;
}

export {
  getProductsByBusinessId,
  getAllProductCategories,
  getProductCategoryById,
};
