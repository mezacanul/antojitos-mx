// apps/next_api/src/services/auth.service.ts
import { createClient } from "@supabase/supabase-js";
import { createSSR_Client } from "@/utils/supabase/server";
import { prisma } from "@antojitos-mx/db";

async function getSession() {
  const supabase = await createSSR_Client();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();
  const {
    data: { session },
    error: sessionError,
  } = await supabase.auth.getSession();
  if (userError || sessionError) {
    throw new Error(
      userError?.message || sessionError?.message
    );
  }
  const send = { user, userError, session, sessionError };
  // console.log("getSession", send);
  return send;
}

async function login(email: string, password: string) {
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

async function getTenantBID(tenantId: string) {
  const tenant = await prisma.tenant.findUnique({
    where: { id: tenantId },
  });
  return tenant?.businessId;
}

async function getBManagerBID(branchId: string) {
  const branch = await prisma.branch.findUnique({
    where: { id: branchId },
  });
  return branch?.businessId;
}

export const authService = {
  getSession,
  login,
  getTenantBID,
  getBManagerBID,
};
