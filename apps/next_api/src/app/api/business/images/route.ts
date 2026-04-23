import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const businessId = req.headers.get(
    "proxy-business-id"
  ) as string;
  const formData = await req.clone().formData();
  const rawData = Object.fromEntries(formData.entries());
  console.log("rawData", rawData);

  return NextResponse.json({ message: "Hello, world!" });
}
