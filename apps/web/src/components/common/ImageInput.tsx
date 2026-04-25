"use client";
import { cn } from "@/utils/cn";
import Image from "next/image";
import {
  TbCameraPlus,
  TbCameraRotate,
} from "react-icons/tb";

export default function ImageInput({
  imageSrc,
}: {
  imageSrc: string | null;
}) {
  const bucketUrl = `${process.env.NEXT_PUBLIC_BUCKET_URL}/business/`;
  console.log(`${bucketUrl}${imageSrc}`);
  return (
    <div
      className={cn(
        "w-[8rem] h-[8rem] rounded-md overflow-hidden",
        imageSrc && "shadow-md",
        "relative"
      )}
    >
      {imageSrc ? (
        <>
          <ImageOverlay />
          <Image
            className="w-full h-full object-cover"
            src={`${bucketUrl}${imageSrc}` as string}
            alt="Logo"
            width={500}
            height={500}
          />
        </>
      ) : (
        <div
          className={cn(
            "w-full h-full border-3 border-black  rounded-md",
            "flex items-center justify-center",
            "opacity-30 hover:opacity-85 transition-all duration-300",
            "cursor-pointer"
          )}
        >
          <TbCameraPlus className="w-[3.5rem] h-[3.5rem]" />
        </div>
      )}
    </div>
  );
}

function ImageOverlay() {
  return (
    <div
      className={cn(
        "inset-0 absolute bg-black/50 w-full h-full",
        "flex items-center justify-center",
        "opacity-0 hover:opacity-100 transition-all duration-300",
        "cursor-pointer"
      )}
    >
      <div className="flex flex-col gap-2 text-xs">
        <button className="bg-white rounded-md p-1 px-2 cursor-pointer">
          {"Actualizar"}
        </button>
        <button className="bg-red-500 text-white rounded-md p-1 px-2 cursor-pointer">
          {"Eliminar"}
        </button>
      </div>
    </div>
  );
}
