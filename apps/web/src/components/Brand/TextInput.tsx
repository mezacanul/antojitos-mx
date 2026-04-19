"use client";
import { cn } from "@/utils/cn";

export function TextInput({
  spreadProps,
  label,
  placeholder = "",
  full = true,
  containerCns = "",
  cns = "",
  errors,
}: {
  spreadProps: React.InputHTMLAttributes<HTMLInputElement>;
  label?: string;
  placeholder?: string;
  full?: boolean;
  containerCns?: string;
  cns?: string;
  errors: any;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-2",
        full && "w-full",
        containerCns
      )}
    >
      {label && (
        <label className="text-sm font-bold text-gray-700">
          {label}
        </label>
      )}
      <input
        type="text"
        placeholder={placeholder}
        {...spreadProps}
        className={cn("input-text w-full", cns)}
      />
      {errors && (
        <p className="text-xs text-red-500">
          {errors.message}
        </p>
      )}
    </div>
  );
}
