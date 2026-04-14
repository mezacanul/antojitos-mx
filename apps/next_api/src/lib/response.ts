import { NextResponse } from "next/server";

function handleZodError(error: any) {
  console.log(error);
  return NextResponse.json(
    {
      error:
        error.name === "ZodError"
          ? JSON.parse(error.message)
          : error.message,
    },
    { status: 400 }
  );
}

export { handleZodError };
