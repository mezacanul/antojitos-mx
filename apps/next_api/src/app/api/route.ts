import { NextResponse } from "next/server";

export async function GET() {
  try {
    return NextResponse.json(
      { message: "Hello from Antojitos.mx!" },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 400 }
    );
  }
}
