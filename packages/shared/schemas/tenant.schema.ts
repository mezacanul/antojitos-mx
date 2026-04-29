import { z } from "zod";

export const UpdateTenantDTO = z.object({
  names: z.string().min(2),
  maternal_surname: z.string().min(2),
  paternal_surname: z.string().min(2),
  email: z.email(),
  phone: z.string(),
  rfc: z.string(),
});

export type UpdateTenantInput = z.infer<
  typeof UpdateTenantDTO
>;
