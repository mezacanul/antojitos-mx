// "use server";

// import { createClient } from "@/lib/supabase/server";
import { createClient } from "@/lib/supabase/client";
import { redirect } from "next/navigation";
// import { revalidatePath } from "next/cache";

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

  // Head straight to the tenant dashboard
  // revalidatePath("/", "layout");
  // redirect("/dashboard");
  return { success: true, data };
}
