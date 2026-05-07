import { createClient } from "@/lib/supabase/server";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function performAction(
  endpoint: string,
  options: RequestInit = {}
) {
  const supabase = await createClient();

  // 1. Get the session (Supabase handles the cookie check here)
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const headers = new Headers(options.headers);

  // 2. Attach the JWT if the user is logged in
  if (session?.access_token) {
    headers.set(
      "Authorization",
      `Bearer ${session.access_token}`
    );
  }

  headers.set("Content-Type", "application/json");

  // console.log("API_URL:", API_URL);

  // 3. Call your standalone Backend API
  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const error = await response.json();
    console.log(error);
    throw new Error(error.message || "Action failed");
  }

  return response.json();
}
