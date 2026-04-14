// apps/next_api/src/app/api/branches/route.ts
import { createSSR_Client } from "@/utils/supabase/server";
import { createBranch } from "@/services/branch.service";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const supabase = await createSSR_Client();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Scenario: Add branch WITHOUT a session
  if (!user) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    const body = await req.json();
    
    // Scenario: Add branch WITH a session
    const branch = await createBranch(
      user.id,
      body.name,
      body.address
    );

    return NextResponse.json(branch, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 400 }
    );
  }
}
