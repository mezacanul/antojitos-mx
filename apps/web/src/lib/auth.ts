// "use server";

// import { createClient } from "@/lib/supabase/server";
import { createClient } from "@/lib/supabase/client";
import { redirect } from "next/navigation";
// import { revalidatePath } from "next/cache";

const redirectPaths = {
  TENANT_OWNER: "/empresas/panel",
  GUEST: "/invitado/inicio",
  SYSTEM_ADMIN: "/admin",
};

type Role = keyof typeof redirectPaths;

export async function login(formData: FormData) {
  const supabase = await createClient();

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const { error, data } =
    await supabase.auth.signInWithPassword({
      email,
      password,
    });

  console.log(data);

  if (error) {
    return { error: "Invalid login credentials" };
  }

  const role = data?.user?.app_metadata?.role;
  // Head straight to the tenant dashboard
  // revalidatePath("/", "layout");
  // redirect("/dashboard");
  return {
    success: true,
    data,
    // redirect: redirectPaths[role as Role],
  };
}

export async function logout() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/empresas/inicio");
}

export async function getSession() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getSession();
  if (error) {
    console.error("Error getting session:", error);
    return null;
  }
  return data;
}
