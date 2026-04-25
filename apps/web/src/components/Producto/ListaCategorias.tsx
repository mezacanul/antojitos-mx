import FormularioCategoria from "@/components/Empresas/Productos/FormularioCategoria";
import CategoryList from "@/components/Empresas/Productos/CategoryList";
import { getAllProductCategories } from "@/lib/data/products";

export default async function ListaCategorias({
  businessId,
}: {
  businessId: string;
}) {
  const ProductCategoryList =
    await getAllProductCategories();

  return (
    <div className="flex flex-col gap-8 w-full h-full">
      <div className="h-full pb-6">
        <CategoryList categories={ProductCategoryList} />
      </div>
      <FormularioCategoria businessId={businessId} />
    </div>
  );
}
