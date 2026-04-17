import { authService } from "./auth.service";
import { prisma } from "@antojitos-mx/db";
import { supabaseAdmin } from "@/utils/supabase/service";
import {
  UserCreateInputSchema,
  BranchCreateInputSchema,
  BusinessCreateInputSchema,
} from "@antojitos-mx/shared";

const createBusiness = async (payload: any) => {
  let supabaseUser: any = null;

  // Extract category_id and password from the business and user forms
  const businessCategory = payload.business.category_id;
  const newPassword = payload.user.password;

  // Delete category_id and password from the forms
  delete payload.business.category_id;
  delete payload.user.password;
  delete payload.user.confirm_password;

  // Reshape the forms validation schemas
  const UserValidation = (
    UserCreateInputSchema as any
  ).omit({ id: true });
  const BranchValidation = (
    BranchCreateInputSchema as any
  ).omit({ business: true });

  // Validate the forms
  const validatedBusinessForm =
    BusinessCreateInputSchema.parse(payload.business);
  const validatedUserForm = UserValidation.parse(
    payload.user
  );
  const validatedBranchForm = BranchValidation.parse(
    payload.branch
  );

  try {
    // 1. Create Supabase User
    const { data: sbData, error: sbError } =
      await supabaseAdmin.auth.admin.createUser({
        email: payload.user.email,
        password: newPassword,
        email_confirm: true,
      });
    if (sbError || !sbData.user)
      throw new Error(sbError?.message || "Auth failed");
    supabaseUser = sbData.user;

    // 2. Start Prisma Transaction
    const result = await prisma.$transaction(async (tx) => {
      const business = await tx.business.create({
        data: {
          name: payload.business.name,
          city: payload.business.city,
          state: payload.business.state,
          categories: {
            connect: {
              id: businessCategory,
            },
          },
        },
      });
      const tenant = await tx.tenant.create({
        data: {
          email: payload.user.email,
          names: payload.user.names,
          paternal_surname: payload.user.paternal_surname,
          maternal_surname: payload.user.maternal_surname,
          businessId: business.id,
        },
      });
      const user = await tx.user.create({
        data: {
          id: supabaseUser.id, // Direct mapping to SB UUID
          email: payload.user.email,
          names: payload.user.names,
          paternal_surname: payload.user.paternal_surname,
          maternal_surname: payload.user.maternal_surname,
          role: "TENANT_OWNER",
          tenantId: tenant.id,
        },
      });
      const branch = await tx.branch.create({
        data: {
          businessId: business.id,
          name: payload.branch.name,
          city: payload.business.city,
          state: payload.business.state,
          latitude: payload.branch.latitude,
          longitude: payload.branch.longitude,
        },
      });
      return { business, tenant, user, branch };
    });

    const { data: linkData, error: linkError } =
      await supabaseAdmin.auth.admin.generateLink({
        type: "magiclink",
        email: payload.user.email,
      });
    // console.log("linkData", linkData);
    // console.log("linkError", linkError);

    if (linkError) throw new Error(linkError.message);
    const { hashed_token } = linkData.properties;

    return { hashed_token, ...result };
    // return { success: true, payload };
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

export const OnboardingService = {
  createBusiness,
};
