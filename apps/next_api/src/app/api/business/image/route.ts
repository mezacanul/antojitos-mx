import {
  deleteBusinessPicture,
  upsertBusinessPicture,
} from "@/services/business/image.service";
import { handleZodError } from "@/lib/response";
import { UpsertBusinessImageDTO } from "@antojitos-mx/shared";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const businessId = req.headers.get(
    "proxy-business-id"
  ) as string;
  const contentType = req.headers.get("content-type") || "";
  console.log("POST /api/business/image content-type:", contentType);

  const isMultipart = contentType
    .toLowerCase()
    .startsWith("multipart/form-data");
  const isUrlEncoded = contentType
    .toLowerCase()
    .startsWith("application/x-www-form-urlencoded");

  if (!isMultipart && !isUrlEncoded) {
    return NextResponse.json(
      {
        error: "Unsupported Media Type",
        message:
          'Expected "multipart/form-data" or "application/x-www-form-urlencoded". Do not manually set Content-Type for FormData; it must include a boundary.',
        receivedContentType: contentType || null,
      },
      { status: 415 }
    );
  }

  const formData = await req.formData();
  console.log("formData", formData);
  const rawData = Object.fromEntries(formData.entries());
  console.log("rawData", rawData);

  try {
    const validatedData =
      UpsertBusinessImageDTO.parse(rawData);
    const upsertedImage = await upsertBusinessPicture(
      businessId,
      validatedData.image as File
    );

    return NextResponse.json(
      { upsertedImage },
      { status: 200 }
    );
  } catch (error: any) {
    return handleZodError(error);
  }
}

export async function DELETE(req: Request) {
  const businessId = req.headers.get(
    "proxy-business-id"
  ) as string;
  try {
    const deletedImage = await deleteBusinessPicture(
      businessId
    );
    return NextResponse.json(deletedImage, { status: 200 });
  } catch (error: any) {
    return handleZodError(error);
  }
}
