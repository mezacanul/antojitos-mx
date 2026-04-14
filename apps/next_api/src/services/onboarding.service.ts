import { authService } from "./auth.service";
import { prisma } from "@antojitos-mx/db";

// apps/next_api/src/services/onboarding.service.ts
import { createClient } from "@supabase/supabase-js";

// // We need the SERVICE_ROLE key to delete users if the DB fails
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  // process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
);

export const registerOnboarding = async (data: any) => {
  let supabaseUser: any = null;

  try {
    // 1. Create Supabase User
    const { data: sbData, error: sbError } =
      await supabaseAdmin.auth.admin.createUser({
        email: data.email,
        password: data.password,
        email_confirm: true,
      });

    if (sbError || !sbData.user)
      throw new Error(sbError?.message || "Auth failed");
    supabaseUser = sbData.user;

    // 2. Start Prisma Transaction
    const result = await prisma.$transaction(async (tx) => {
      const business = await tx.business.create({
        data: { name: data.businessName, slug: data.slug },
      });

      const tenant = await tx.tenant.create({
        data: {
          names: data.names,
          paternal_surname: data.paternal_surname,
          maternal_surname: data.maternal_surname,
          businessId: business.id,
        },
      });

      const user = await tx.user.create({
        data: {
          id: supabaseUser.id, // Direct mapping to SB UUID
          email: data.email,
          names: data.names,
          paternal_surname: data.paternal_surname,
          maternal_surname: data.maternal_surname,
          role: "TENANT_OWNER",
          tenantId: tenant.id,
        },
      });

      const session = await authService.signIn(
        data.email,
        data.password
      );

      return { business, tenant, user, session };
    });

    return result;
  } catch (error) {
    // 3. CLEANUP: If we have a Supabase user but the DB failed, delete them.
    if (supabaseUser) {
      await supabaseAdmin.auth.admin.deleteUser(
        supabaseUser.id
      );
    }
    throw error;
  }
};
