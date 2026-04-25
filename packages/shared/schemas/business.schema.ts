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
