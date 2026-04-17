import FormularioCategoria from "@/components/Empresas/Productos/FormularioCategoria";
import { getBusinessByUserId } from "@/lib/data/business";
import CategoryList from "@/components/Empresas/Productos/CategoryList";
import { getProductCategoriesByBusinessId } from "@/lib/data/products";

export default async function Home({
  searchParams,
}: {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}) {
  const pcid = (await searchParams).pcid as string;
  console.log("pcid:", pcid);
  const business = await getBusinessByUserId();
  // console.log("Business:", business);
  const categories = await getProductCategoriesByBusinessId(
    business.id
  );

  if (pcid) {
    return <p>Categoria seleccionada: {pcid}</p>;
  }

  return (
    <div className="flex h-full flex-col gap-8 w-full">
      <FormularioCategoria businessId={business.id} />
      <CategoryList categories={categories} />
    </div>
  );
}
