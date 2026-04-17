import { performAction } from "../api-wrapper";

async function getAllBusinessCategories() {
  const res = await performAction(
    "/catalogs?type=business_category",
    { method: "GET" }
  );
  return res;
}

export { getAllBusinessCategories };
