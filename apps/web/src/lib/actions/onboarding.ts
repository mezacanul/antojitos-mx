"use server";
import { createClient } from "../supabase/server";
import { performAction } from "../api-wrapper";
// import { createClient } from "../supabase/client";

export async function createBusiness(payload: any) {
  try {
    // Send payload to API to create business
    const onboardingResult = await performAction(
      "/onboarding",
      {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log("onboardingResult:", onboardingResult);
    const {
      success,
      user,
      transaction,
      error: onboardingError,
    } = onboardingResult;

    // If business is created successfully,
    // send user to sign in
    if (success) {
      const supabase = await createClient();
      const signinPayload = {
        email: user,
        password: payload.userFormData.password,
      };
      const { error: signInError, data: signInData } =
        await supabase.auth.signInWithPassword(
          signinPayload
        );

      // if (signInError) {
      //   console.error("Error signing in:", signInError);
      //   throw new Error(signInError.message);
      // } else {
      console.log("signInData:", signInData);
      return {
        success: true,
        redirect: "/empresas/panel",
        session: signInData,
      };
      // }
    }
  } catch (error) {
    console.error(
      "Business creation failed at onboarding service"
    );
    console.log(error);
    throw error;
  }
}
