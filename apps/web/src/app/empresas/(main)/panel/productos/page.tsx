"use server";

import ProductList from "@/components/Product/List";
import { performAction } from "@/lib/api-client";
import { createClient } from "@/lib/supabase/server";
import { Business, Product } from "@/types";

async function getBusinessByUserId(): Promise<Business> {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();

  // Get user id from current supabase session
  if (error || !data?.user?.id) {
    throw new Error("Failed to get user ID from session");
  }

  const res = await performAction(
    `/business?userId=${data.user.id}`
  );
  console.log("res:", res);
  return res;
}

async function getProductsByBusinessId(
  businessId: string
): Promise<Product[]> {
  const res = await performAction(
    `/products?businessId=${businessId}`
  );
  console.log("res:", res);
  return res;
}

export default async function Home() {
  const business = await getBusinessByUserId();
  // console.log("Business:", business);
  const products = await getProductsByBusinessId(
    business.id
  );

  return (
    <div className="flex h-[80vh] px-[5rem] py-[2rem] flex-col gap-4">
      <h1 className="text-4xl font-bold">
        {business.name}
      </h1>
      <ProductList products={products} />
    </div>
  );
}
