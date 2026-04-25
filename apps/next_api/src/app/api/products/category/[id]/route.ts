import {
  deleteProductCategory,
  getProductCategoryById,
  updateProductCategory,
} from "@/repositories/product.repo";
import { handleZodError } from "@/lib/response";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    const category = await getProductCategoryById(id);
    return NextResponse.json(category, { status: 200 });
  } catch (error: any) {
    return handleZodError(error);
  }
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const jsonData = await req.json();

  try {
    const category = await updateProductCategory(
      id,
      jsonData
    );
    return NextResponse.json(category, { status: 200 });
  } catch (error: any) {
    return handleZodError(error);
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const category = await deleteProductCategory(id);
    return NextResponse.json(category, { status: 200 });
  } catch (error: any) {
    return handleZodError(error);
  }
}
