import { cn } from "@/utils/cn";

export function TextInput({
  spreadProps,
  placeholder,
  cns = "",
  errors,
}: {
  spreadProps: React.InputHTMLAttributes<HTMLInputElement>;
  placeholder: string;
  cns?: string;
  errors: any;
}) {
  return (
    <div className="flex flex-col gap-2 w-full">
      <input
        type="text"
        placeholder={placeholder}
        {...spreadProps}
        className={cn("input-text", cns)}
      />
      {errors && (
        <p className="text-red-500">{errors.message}</p>
      )}
    </div>
  );
}
