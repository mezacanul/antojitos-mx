import { performAction } from "../api-wrapper";

async function getAllBusinessCategories() {
  const res = await performAction(
    "/catalogs?resourceType=businessCategory",
    { method: "GET" }
  );
  return res;
}

async function getAllBaseUnits() {
  const res = await performAction(
    "/catalogs?resourceType=baseUnit",
    { method: "GET" }
  );
  return res;
}

export { getAllBusinessCategories, getAllBaseUnits };
