import { Branch } from "@/types";
import { performAction } from "@/lib/api-wrapper";

async function getBranchesByBusinessId(
  businessId: string
): Promise<Branch[]> {
  const res = await performAction(
    `/branches?businessId=${businessId}`
  );
  // console.log("res:", res);
  return res;
}

export { getBranchesByBusinessId };
