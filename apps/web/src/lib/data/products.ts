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

async function getProductCategoriesByBusinessId(
  businessId: string
): Promise<any[]> {
  const res = await performAction(
    `/products/categories?businessId=${businessId}`
  );
  return res;
}

export {
  getProductsByBusinessId,
  getProductCategoriesByBusinessId,
};
