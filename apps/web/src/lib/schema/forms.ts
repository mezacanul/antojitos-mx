import { z } from "zod";

export const businessFormSchema = z.object({
  name: z.string().min(1, "El nombre es requerido"),
  category_id: z
    .string()
    .min(1, "La categoría es requerida"),
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
    email: z.email("El email no es válido"),
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
  zip: z
    .string()
    .length(5, "El código postal debe tener 5 caracteres"),
  address: z
    .string()
    .min(
      3,
      "La dirección debe tener al menos 3 caracteres"
    ),
  cityId: z.string().min(1, "La ciudad es requerida"),
  stateId: z.string().min(1, "El estado es requerido"),
  latitude: z
    .string()
    .min(9, "La latitud debe tener al menos 9 caracteres")
    .max(
      12,
      "La latitud debe tener menos de 12 caracteres"
    ),
  longitude: z
    .string()
    .min(9, "La longitud debe tener al menos 9 caracteres")
    .max(
      12,
      "La longitud debe tener menos de 12 caracteres"
    ),
});

export type BranchFormType = z.infer<
  typeof branchFormSchema
>;

export const productFormSchema = z.object({
  name: z.string().min(1, "El nombre es requerido"),
  description: z
    .string()
    .min(1, "La descripción es requerida"),
  baseUnit: z
    .string()
    .min(1, "La unidad de medida es requerida"),
});

export type ProductFormType = z.infer<
  typeof productFormSchema
>;

export const imageFileSchema = z.object({
  image: z
    // .instanceof(FileList)
    .instanceof(File),
  // .refine((files) => files.length === 1, {
  //   message: "Please select exactly one image",
  // })
  // .refine(
  //   (files) =>
  //     files[0] && files[0].size <= 5 * 1024 * 1024, // 5MB max
  //   {
  //     message: "Image must be smaller than 5MB",
  //   }
  // )
  // .refine(
  //   (files) => {
  //     if (!files[0]) return false;

  //     return [
  //       "image/jpeg",
  //       "image/png",
  //       "image/webp",
  //     ].includes(files[0].type);
  //   },
  //   {
  //     message: "Only JPG, PNG or WebP images are allowed",
  //   }
  // ),
});
export type ImageFileFormType = z.infer<
  typeof imageFileSchema
>;
