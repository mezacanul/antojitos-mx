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
        message:
          "Error: Valores duplicados en la base de datos",
        meta: (error as any).meta ?? null,
        props,
      },
      { status: 409 }
    );
  }

  const isZodError = error.name === "ZodError";
  return NextResponse.json(
    {
      error: isZodError
        ? JSON.parse(error.message)
        : error.message,
      message: isZodError
        ? "Error: uno o más campos no son válidos"
        : "Error en el servidor",
      // props: props,
    },
    { status: 400 }
  );
}

export { handleZodError };
