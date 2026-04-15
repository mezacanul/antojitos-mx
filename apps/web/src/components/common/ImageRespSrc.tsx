"use client";
import {
  useResponsive,
  ResponsiveValues,
} from "@/hooks/useResponsive";
import { getImagesBaseURL } from "@/lib/image";
import Image from "next/image";

export default function ImageRespSrc({
  className,
  srcArray,
  useCDN = false,
}: {
  className: string;
  srcArray: ResponsiveValues<string>;
  useCDN: boolean;
}) {
  const src = useCDN
    ? `${getImagesBaseURL()}/${useResponsive<string>(
        srcArray
      )}`
    : useResponsive<string>(srcArray);
  return (
    <Image
      src={src}
      alt="Image"
      className={className}
      width={1000}
      height={1000}
      loading="eager"
    />
  );
}
