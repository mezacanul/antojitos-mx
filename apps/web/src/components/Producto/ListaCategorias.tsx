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
    <div className="flex flex-col gap-8 w-full h-full">
      <div className="h-full pb-6">
        <CategoryList categories={ProductCategoryList} />
      </div>
      <FormularioCategoria businessId={businessId} />
    </div>
  );
}
