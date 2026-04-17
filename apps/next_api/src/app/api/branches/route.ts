// apps/next_api/src/app/api/branches/route.ts
import { createSSR_Client } from "@/utils/supabase/server";
import { authService } from "@/services/auth.service";
import { createBranch } from "@/services/branch.service";
import { NextResponse } from "next/server";
import { getBranchesByBusinessId } from "@/services/branch.service";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const businessId = searchParams.get("businessId");

  if (!businessId) {
    return NextResponse.json(
      { error: "Business ID is required" },
      { status: 400 }
    );
  }

  try {
    const branches = await getBranchesByBusinessId(
      businessId
    );
    return NextResponse.json(branches, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 400 }
    );
  }
}

export async function POST(req: Request) {
  // const supabase = await createSSR_Client();
  // const {
  //   data: { user },
  // } = await supabase.auth.getUser();
  const { user, error } = await authService.getSession();

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
      body.city,
      body.state,
      body.latitude,
      body.longitude
    );

    return NextResponse.json(branch, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 400 }
    );
  }
}
