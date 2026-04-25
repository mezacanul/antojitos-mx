"use server";

import BranchList from "@/components/Branch/List";
import { getAllBranches } from "@/lib/data/branches";

export default async function Sucursales() {
  const branches = await getAllBranches();

  return (
    <div className="flex h-full flex-col gap-4">
      <BranchList branches={branches} />
    </div>
  );
}
