"use client";
import { useEffect, useState } from "react";
import {
  imageFileSchema,
  ImageFileFormType,
} from "@/lib/schema/forms";
import { Product } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useProductMetadataStore } from "@/store/useProductMetadataStore";
import ProductImage from "./ModalProducto/ProductImage";

export default function ProductCard({
  product,
}: {
  product: any;
}) {
  const { setImage } = useProductMetadataStore();
  const [previewUrl, setPreviewUrl] = useState<
    string | null
  >(null);

  const { register, handleSubmit, control, watch, reset } =
    useForm<ImageFileFormType>({
      resolver: zodResolver(imageFileSchema),
      defaultValues: {
        image: null as unknown as FileList,
      },
      mode: "onBlur",
    });

  const imageForm = watch({
    control,
    name: "image",
  } as any);

  // useEffect(() => {
  // if (imageForm.image) {
  //     console.log(imageForm.image);
  //     const url = getImageUrl(imageForm.image);
  //     setPreviewUrl(url);
  //   } else if (!imageForm.image) {
  //     setPreviewUrl(null);
  //   }
  // }, [imageForm]);

  return (
    <div className="product-card">
      <ProductImage fileList={imageForm.image} />
      <input
        type="file"
        {...register("image")}
        // accept="image/*"
        className="input-text w-40"
        // placeholder="Foto"
      />
    </div>
  );
}

function getImageUrl(
  imageValue: FileList | null
): string | null {
  if (imageValue && imageValue.length > 0) {
    const file = imageValue[0];
    console.log(file);
    const url = URL.createObjectURL(file);
    console.log(url);
    return url;
  }
  return null;
}
