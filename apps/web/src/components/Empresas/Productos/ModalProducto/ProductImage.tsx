"use client";
import { ImageFileFormType } from "@/lib/schema/forms";
import { useEffect, useState } from "react";
import { Control, useWatch } from "react-hook-form";

export default function ProductImage({
  fileList,
}: {
  fileList: FileList | null;
}) {
  const [previewUrl, setPreviewUrl] = useState<
    string | null
  >(null);
  // const imageForm = useWatch({
  //   control,
  //   name: "image",
  // });

  // useEffect(() => {
  //   console.log(imageValue);
  // }, [imageValue]);
  useEffect(() => {
    console.log(fileList);
    if (fileList) {
      const url = getImageUrl(fileList);
      console.log(url);
      setPreviewUrl(url);
    } else {
      setPreviewUrl(null);
    }
  }, [fileList]);
  // const previewUrl = getImageUrl(imageForm.image);
  return (
    <div
      className="w-68 h-40 bg-gray-200 rounded-sm bg-cover bg-center"
      style={{
        backgroundImage: previewUrl
          ? `url(${previewUrl})`
          : undefined,
      }}
    />
  );
}

function getImageUrl(
  fileList: FileList | null
): string | null {
  if (fileList && fileList.length > 0) {
    const file = fileList[0];
    console.log(file);
    const url = URL.createObjectURL(file);
    console.log(url);
    return url;
  }
  return null;
}
