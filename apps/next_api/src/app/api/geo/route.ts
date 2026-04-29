import { NextResponse } from "next/server";
import {
  getCitiesByStateId,
  getStatesByCountryCode,
} from "@/repositories/geo.repo";
import { allowAllOriginsCorsHeaders } from "@/lib/cors";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const resource = searchParams.get("resource");
  const parentId = searchParams.get("parentId");
  const corsHeaders = allowAllOriginsCorsHeaders();

  switch (resource) {
    case "cities":
      const cities = await getCitiesByStateId(parentId!);
      return NextResponse.json(cities, { headers: corsHeaders });
    case "states":
      const states = await getStatesByCountryCode(parentId!);
      return NextResponse.json(states, { headers: corsHeaders });
    default:
      return NextResponse.json(
        { error: "Invalid resource" },
        { status: 400, headers: corsHeaders }
      );
  }
}
