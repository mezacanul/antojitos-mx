import { supabaseAdmin } from "@/utils/supabase/service";
import { prisma } from "@antojitos-mx/db";
import { authService } from "../auth.service";

export async function signupGuest(data: any) {
  let supabaseUser: any = null;

  const newPassword = data.password;
  delete data.password;
  delete data.confirm_password;

  try {
    // Create Supabase User
    const { data: sbData, error: sbError } =
      await supabaseAdmin.auth.admin.createUser({
        email: data.email,
        password: newPassword,
        email_confirm: true,
      });

    if (sbError || !sbData.user)
      throw new Error(sbError?.message || "Auth failed");
    supabaseUser = sbData.user;

    // Update Supabase User Role
    const updatedSBUserRole =
      await authService.updateSBUserRole(
        supabaseUser.id,
        "GUEST"
      );

    // Start Prisma Transaction
    // Create user
    // Create verification code
    // Create account status
    const transaction = await prisma.$transaction(
      async (tx) => {
        // Create user
        const user = await tx.user.create({
          data: {
            id: supabaseUser.id,
            ...data,
            // Role is set to GUEST by default
          },
        });

        // Create verification code
        const newCode = crypto
          .randomUUID()
          .substring(0, 8)
          .toUpperCase();
        const verificationCode =
          await tx.verificationCode.create({
            data: {
              userId: user.id,
              code: newCode,
              type: "EMAIL",
              status: "PENDING",
              expiresAt: new Date(
                Date.now() + 1000 * 60 * 60 * 24
              ),
            },
            select: {
              type: true,
              expiresAt: true,
              status: true,
            },
          });

        // Create account status
        const accountStatus = await tx.accountStatus.create(
          {
            data: {
              userId: user.id,
              type: "EMAIL",
              isVerified: false,
            },
            select: {
              userId: true,
              type: true,
              isVerified: true,
            },
          }
        );
        return {
          accountStatus,
          verificationCode,
          user,
        };
      }
    );
    return {
      message: "Guest signed up successfully",
      success: true,
      user: transaction.user.email,
      accountStatus: transaction.accountStatus,
      verificationCode: transaction.verificationCode,
    };
  } catch (error: any) {
    if (supabaseUser) {
      console.log("deleting supabase user", supabaseUser);
      await supabaseAdmin.auth.admin.deleteUser(
        supabaseUser.id
      );
    }
    throw error;
  }
}

export const GuestService = {
  signupGuest,
};
