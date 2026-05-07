import { cn } from "@/utils/cn";

export default function Logo({
  extraClasses,
}: {
  extraClasses?: string;
}) {
  return (
    <div
      className={cn(
        "flex items-center text-3xl font-bold",
        extraClasses
      )}
    >
      <h1 className="text-blue-600">{"Menius."}</h1>
      <h1 className="text-orange-600">{"mx"}</h1>
    </div>
  );
}
