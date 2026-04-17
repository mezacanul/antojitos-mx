import { z } from "zod";

export const businessFormSchema = z.object({
  name: z.string().min(1, "El nombre es requerido"),
  category_id: z
    .string()
    .min(1, "La categoría es requerida"),
  city: z.string().min(1, "La ciudad es requerida"),
  state: z.string().min(1, "El estado es requerido"),
});

export type BusinessFormType = z.infer<
  typeof businessFormSchema
>;

export const userFormSchema = z
  .object({
    names: z.string().min(1, "El nombre es requerido"),
    paternal_surname: z
      .string()
      .min(1, "El apellido paterno es requerido"),
    maternal_surname: z
      .string()
      .min(1, "El apellido materno es requerido"),
    email: z.string().email("El email no es válido"),
    phone: z.string().min(1, "El teléfono es requerido"),
    password: z
      .string()
      .min(1, "La contraseña es requerida"),
    confirm_password: z.string(),
  })
  .refine(
    (data) => data.password === data.confirm_password,
    {
      message: "Las contraseñas no coinciden",
      path: ["confirm_password"],
    }
  );

export type UserFormType = z.infer<typeof userFormSchema>;

export const branchFormSchema = z.object({
  name: z.string().min(1, "El nombre es requerido"),
  address: z.string().min(1, "La dirección es requerida"),
  latitude: z.string().min(1, "La latitud es requerida"),
  longitude: z.string().min(1, "La longitud es requerida"),
});

export type BranchFormType = z.infer<
  typeof branchFormSchema
>;
