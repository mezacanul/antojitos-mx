import { Business } from "@/types";
import { performAction } from "../api-wrapper";
import { createClient } from "../supabase/server";

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
  // console.log("res:", res);
  return res;
}

export { getBusinessByUserId };
