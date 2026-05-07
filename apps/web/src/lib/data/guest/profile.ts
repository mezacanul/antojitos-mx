import { performAction } from "@/lib/api-wrapper";

export async function getGuestProfile() {
  const response = await performAction(
    "/guests/protected/profile"
  );
  return response;
}
