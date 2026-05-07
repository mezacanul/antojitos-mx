// import { authService } from "./auth.service";
import { prisma } from "@antojitos-mx/db";
import { supabaseAdmin } from "@/utils/supabase/service";
import {
  UserCreateInputSchema,
  BranchUncheckedCreateInputSchema,
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
    BranchUncheckedCreateInputSchema as any
  ).omit({
    id: true,
    createdAt: true,
    updatedAt: true,
    businessId: true,
  });

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
    const onboardingTransaction = await prisma.$transaction(
      async (tx) => {
        const business = await tx.business.create({
          data: {
            name: validatedBusinessForm.name,
            categories: {
              connect: {
                id: businessCategory,
              },
            },
          },
        });
        const tenant = await tx.tenant.create({
          data: {
            ...validatedUserForm,
            businessId: business.id,
          },
        });
        const user = await tx.user.create({
          data: {
            id: supabaseUser.id, // Direct mapping to SB UUID
            ...validatedUserForm,
            role: "TENANT_OWNER",
            tenantId: tenant.id,
          },
        });
        const branch = await tx.branch.create({
          data: {
            businessId: business.id,
            ...validatedBranchForm,
          },
        });
        return { business, tenant, user, branch };
      }
    );

    return {
      message: "Onboarding successful!",
      transaction: onboardingTransaction,
      success: true,
      user: onboardingTransaction.user.email,
    };
  } catch (error) {
    // 3. CLEANUP: If we have a Supabase user but the DB failed, delete them.
    if (supabaseUser) {
      console.log("deleting supabase user", supabaseUser);
      await supabaseAdmin.auth.admin.deleteUser(
        supabaseUser.id
      );
    }
    throw error;
  }
};

const testBusinessName = async (payload: any) => {
  const { businessName } = payload;
  const business = await prisma.business.findFirst({
    where: { name: businessName },
  });

  return business === null;
};

const testEmail = async (payload: any) => {
  const { email } = payload;
  const lowercaseEmail = email.toLowerCase();
  const user = await prisma.user.findFirst({
    where: { email: lowercaseEmail },
  });
  return user === null;
};

async function verifyUserEmail(code: string) {
  const gtDate = new Date();
  // console.log("get", get);

  const verificationCode =
    await prisma.verificationCode.findFirst({
      where: {
        // Verify the code is correct
        code,
        // Verify request configuration
        type: "EMAIL",
        status: "PENDING",
        expiresAt: {
          gt: new Date(),
        },
      },
      select: {
        id: true,
        code: true,
        expiresAt: true,
        user: {
          select: {
            id: true,
          },
        },
      },
    });
  if (!verificationCode) {
    throw new Error("Verification code not found");
  } else {
    const updatedVerificationCode =
      await prisma.verificationCode.update({
        where: {
          id: verificationCode.id,
        },
        data: {
          status: "VERIFIED",
        },
      });
    const updatedAccountStatus =
      await prisma.accountStatus.update({
        where: {
          userId_type: {
            userId: verificationCode.user.id,
            type: "EMAIL",
          },
        },
        data: {
          isVerified: true,
        },
      });
    return {
      message: "Email verified successfully",
      success: true,
      // verificationCode,
      gtDate,
      updatedVerificationCode,
      updatedAccountStatus,
    };
  }
}

export const OnboardingService = {
  createBusiness,
  testBusinessName,
  testEmail,
  verifyUserEmail,
};
