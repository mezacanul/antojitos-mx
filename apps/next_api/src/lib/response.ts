import { NextResponse } from "next/server";

function handleZodError(error: any, props = {}): any {
  console.log("error", error);
  const isPrismaKnown =
    typeof error === "object" &&
    error !== null &&
    typeof (error as any).code === "string";

  // Prisma unique constraint violation
  if (isPrismaKnown && (error as any).code === "P2002") {
    return NextResponse.json(
      {
        error: error.message,
        message: "Error: El producto ya existe",
        meta: (error as any).meta ?? null,
        props,
      },
      { status: 409 }
    );
  }

  return NextResponse.json(
    {
      error:
        error.name === "ZodError"
          ? JSON.parse(error.message)
          : error.message,
      message: "Error: uno o más campos no son válidos",
      props: props,
    },
    { status: 400 }
  );
}

export { handleZodError };
