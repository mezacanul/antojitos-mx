import { z } from "zod";

export const CreateBranchDTO = z.object({
  name: z.string(),
  latitude: z.number(),
  longitude: z.number(),
  cityId: z.string(),
  stateId: z.string(),
  address: z.string(),
  zip: z.string(),
  imageUrl: z.string().optional(),
});

export type CreateBranchDTOType = z.infer<
  typeof CreateBranchDTO
>;
