import { Branch } from "@/types";
import { cn } from "@/utils/cn";
import Link from "next/link";

export default function BranchList({
  branches,
}: {
  branches: Branch[];
}) {
  return (
    <div className="flex flex-col gap-4">
      <div
        className={cn(
          "grid gap-2",
          "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        )}
      >
        {branches.map((branch) => (
          <Link
            href={`/empresas/panel/productos`}
            className="branch-card"
            key={branch.id}
          >
            <h2 className="font-bold">{branch.name}</h2>
            <h2>{branch.address}</h2>
          </Link>
        ))}
      </div>
    </div>
  );
}
