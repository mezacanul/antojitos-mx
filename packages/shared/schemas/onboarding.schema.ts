// packages/shared/schemas/onboarding.schema.ts
import { z } from "zod";

export const OnboardingDTO = z.object({
  names: z.string().min(2),
  maternal_surname: z.string().min(2),
  paternal_surname: z.string().min(2),
  businessName: z.string().min(3).max(50),
  slug: z
    .string()
    .min(3)
    .regex(/^[a-z0-9-]+$/),
  email: z.string().email(),
  password: z.string().min(8),
});

export type OnboardingInput = z.infer<typeof OnboardingDTO>;
