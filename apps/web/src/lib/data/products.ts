import { Product } from "@/types";
import { performAction } from "../api-wrapper";

async function getProductsBySession_Categorized(): Promise<
  Product[] | any[]
> {
  try {
    const res = await performAction(`/products`);
    return res;
  } catch (error) {
    console.error(error);
    return [];
  }
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
  getProductsBySession_Categorized,
  getAllProductCategories,
  getProductCategoryById,
};
