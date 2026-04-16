"use server";

import BranchList from "@/components/Branch/List";
import { performAction } from "@/lib/api-client";
import { createClient } from "@/lib/supabase/server";
import { Branch } from "@/types";
// import type { Business } from "@antojitos-mx/shared";
type Business = {
  id: string;
  name: string;
  description: string;
  // image: string;
  created_at: string;
  updated_at: string;
};

async function getBusinessByUserId(): Promise<Business> {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();

  // Get user id from current supabase session
  if (error || !data?.user?.id) {
    throw new Error("Failed to get user ID from session");
  }

  const res = await performAction(
    `/business?userId=${data.user.id}`
  );
  console.log("res:", res);
  return res;
}

async function getBranchesByBusinessId(
  businessId: string
): Promise<Branch[]> {
  const res = await performAction(
    `/branches?businessId=${businessId}`
  );
  console.log("res:", res);
  return res;
}

export default async function Home() {
  const business = await getBusinessByUserId();
  // console.log("Business:", business);
  const branches = await getBranchesByBusinessId(
    business.id
  );

  return (
    <div className="flex h-full flex-col gap-4">
      <h1 className="text-4xl font-bold">{business.name}</h1>
      <BranchList branches={branches} />
    </div>
  );
}
