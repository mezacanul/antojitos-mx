"use server";

import BranchList from "@/components/Branch/List";
import { getBusinessByUserId } from "@/lib/data/business";
import { getBranchesByBusinessId } from "@/lib/data/branches";

export default async function Sucursales() {
  const business = await getBusinessByUserId();
  const branches = await getBranchesByBusinessId(
    business.id
  );

  return (
    <div className="flex h-full flex-col gap-4">
      <BranchList branches={branches} />
    </div>
  );
}
