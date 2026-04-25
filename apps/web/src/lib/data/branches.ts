import { Branch } from "@/types";
import { performAction } from "@/lib/api-wrapper";

async function getAllBranches(): Promise<Branch[]> {
  const res = await performAction(`/branches`);
  // console.log("res:", res);
  return res;
}

export { getAllBranches };
