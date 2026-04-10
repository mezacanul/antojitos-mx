// export * from './generated/zod';
// export * from './custom-schemas';
import { z } from "zod";

export const StatusSchema = z.enum([
  "pending",
  "completed",
  "failed",
]);
export type Status = z.infer<typeof StatusSchema>;
