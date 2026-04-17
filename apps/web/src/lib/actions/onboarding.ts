"use server";
import { createClient } from "../supabase/server";
import { performAction } from "../api-wrapper";

export async function createBusiness(payload: any) {
  // Send payload to API to create business
  const result = await performAction("/onboarding", {
    method: "POST",
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json",
    },
  });
  console.log(result);

  // Get hashed token from response
  const { hashed_token, error } = result;
  // console.log(code, error);
  if (error) {
    console.error(error);
    throw new Error(error.message);
  }

  // If business is created successfully,
  // verify OTP to login user
  const supabase = await createClient();
  const { data, error: sessionError } =
    await supabase.auth.verifyOtp({
      type: "magiclink",
      token_hash: hashed_token,
    });
  if (sessionError) {
    console.error(sessionError);
    throw new Error(sessionError.message);
  }
  return { data, result, error: sessionError || error };
}
