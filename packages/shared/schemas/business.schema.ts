import { z } from "zod";

export const UpsertBusinessImageDTO = z.object({
  image: z
    .instanceof(File)
    .refine(
      (file) =>
        file.type === "image/jpeg" ||
        file.type === "image/png",
      {
        message: "Image must be a JPG or PNG file",
      }
    ),
});

export type UpsertBusinessImageInput = z.infer<
  typeof UpsertBusinessImageDTO
>;
export const UpdateBusinessDTO = z.object({
  name: z.string().min(2),
  address: z.string(),
  zip: z.string(),
  phone: z.string(),
  email: z.email(),
  website: z.url(),
  timezone: z.string(),
  rfc: z.string(),
});

export type UpdateBusinessInput = z.infer<
  typeof UpdateBusinessDTO
>;
