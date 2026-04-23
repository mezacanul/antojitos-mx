import { handleZodError } from "@/lib/response";
import { productService } from "@/services/product.service";
import {
  DeleteProductImageDTO,
  UpsertProductImageDTO,
} from "@antojitos-mx/shared";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const businessId = req.headers.get(
    "proxy-business-id"
  ) as string;
  const formData = await req.formData();
  const rawData = Object.fromEntries(formData.entries());
  // console.log("rawData", rawData);
  try {
    const validatedData =
      UpsertProductImageDTO.parse(rawData);
    const upsertedImage =
      await productService.upsertProductImage(
        businessId,
        validatedData.productId,
        validatedData.image as File
      );
    console.log("upsertedImage", upsertedImage);

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
  const formData = await req.formData();
  const rawData = Object.fromEntries(formData.entries());
  console.log("rawData", rawData);
  try {
    const validatedData =
      DeleteProductImageDTO.parse(rawData);
    const deletedImage =
      await productService.deleteProductImage(
        businessId,
        validatedData.productId
      );
    console.log("deletedImage", deletedImage);

    return NextResponse.json(
      { deletedImage },
      { status: 200 }
    );
  } catch (error: any) {
    return handleZodError(error);
  }
}
