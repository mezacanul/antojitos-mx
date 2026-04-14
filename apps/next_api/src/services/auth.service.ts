// apps/next_api/src/services/auth.service.ts
import { createClient } from "@supabase/supabase-js";
import { createSSR_Client } from "@/utils/supabase/server";

async function getSession() {
  const supabase = await createSSR_Client();
  const {
    data: { user },
    error: supabaseError,
  } = await supabase.auth.getUser();
  return { user, error: supabaseError };
}

async function signIn(email: string, password: string) {
  // We use the anon key here because we want to initiate a standard user session
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const { data, error } =
    await supabase.auth.signInWithPassword({
      email,
      password,
    });

  if (error) throw new Error(error.message);

  return data; // This contains your Access Token (JWT)
}

export const authService = { getSession, signIn };
