import { z } from "zod";

export const CreateUserDTO = z
  .object({
    email: z.email("Correo electrónico inválido"),
    names: z.string().min(2, "El nombre es requerido"),
    maternal_surname: z.string().min(2, "El apellido materno es requerido"),
    paternal_surname: z.string().min(2, "El apellido paterno es requerido"),
    password: z.string().min(8, "La contraseña es requerida"),
    confirm_password: z.string().min(8, "La contraseña no coincide"),
  })
  .refine(
    (data) => data.password === data.confirm_password,
    {
      message: "Passwords do not match",
      path: ["confirm_password"],
    }
  );

export type CreateUserInput = z.infer<typeof CreateUserDTO>;

// export const PasswordConfirmDTO = z
//   .object({
//     password: z.string().min(8),
//     confirm_password: z.string().min(8),
//   })
//   .refine(
//     (data) => data.password === data.confirm_password,
//     {
//       message: "Passwords do not match",
//       path: ["confirm_password"],
//     }
//   );

// export type PasswordConfirmInput = z.infer<
//   typeof PasswordConfirmDTO
// >;
