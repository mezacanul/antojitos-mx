import { Branch } from "@/types";
import Link from "next/link";

export default function BranchList({
  branches,
}: {
  branches: Branch[];
}) {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl font-bold">Sucursales</h2>

      <div className="grid grid-cols-4 gap-2">
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
