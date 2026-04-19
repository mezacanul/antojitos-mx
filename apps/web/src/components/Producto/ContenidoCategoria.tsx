import { getProductCategoryById } from "@/lib/data/products";
import { cn } from "@/utils/cn";
import ProductList from "../Empresas/Productos/List";
import ModalProducto from "../Empresas/Productos/ModalProducto";
import FormularioProducto from "../Empresas/Productos/ModalProducto/FormularioProducto";
import { getAllBaseUnits } from "@/lib/data/catalogs";

export default async function ContenidoCategoria({
  pcid,
}: {
  pcid: string;
}) {
  const baseUnits = await getAllBaseUnits();
  const category = await getProductCategoryById(pcid);
  // TODO: Get products by category id
  // ----------------------------------------------------
  // const products = await getProductsByCategoryId(pcid);

  const cns = {
    container: cn(
      "flex flex-col items-center gap-4",
      "p-6 border-3 rounded-md",
      "border-blue-700/20",
      "border-orange-600/30",
      // "bg-white",
      "w-full"
    ),
    title: "text-2xl font-bold text-center",
  };
  
  return (
    <div className={cns.container}>
      <h2 className={cns.title}>{category.name}</h2>

      <ModalProducto
        label="Agregar producto"
        btnClass="btn-base"
      >
        <h2 className="text-2xl font-bold text-gray-900 mb-5">
          {"Nuevo producto"}
        </h2>
        <FormularioProducto baseUnits={baseUnits} />
      </ModalProducto>

      <ProductList products={[]} />
    </div>
  );
}
