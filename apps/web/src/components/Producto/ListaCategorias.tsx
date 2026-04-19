import FormularioCategoria from "@/components/Empresas/Productos/FormularioCategoria";
import CategoryList from "@/components/Empresas/Productos/CategoryList";
import { getProductCategoriesByBusinessId } from "@/lib/data/products";

export default async function ListaCategorias({
  businessId,
}: {
  businessId: string;
}) {
  const ProductCategoryList =
    await getProductCategoriesByBusinessId(businessId);

  return (
    <div className="flex h-full flex-col gap-8 w-full">
      <FormularioCategoria businessId={businessId} />
      <CategoryList categories={ProductCategoryList} />
    </div>
  );
}
