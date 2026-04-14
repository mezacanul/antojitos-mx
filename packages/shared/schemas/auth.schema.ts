import { z } from "zod";

export const LoginDTO = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export type LoginInput = z.infer<typeof LoginDTO>;
