import { getProductCategoryById } from "@/lib/data/products";
import { cn } from "@/utils/cn";
import ProductList from "../Empresas/Productos/List";
import { getAllBaseUnits } from "@/lib/data/catalogs";
import Link from "next/link";
import { BiFoodMenu } from "react-icons/bi";

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
      "flex flex-col items-start gap-4",
      "p-6 border-3 rounded-md",
      "border-blue-700/20",
      // "border-orange-600/30",
      "bg-white",
      "w-full"
    ),
    header: "flex w-full justify-between gap-4 items-start",
    title: "text-4xl font-bold flex items-center gap-2",
  };

  return (
    <div className={cns.container}>
      <div className={cns.header}>
        <div className="flex flex-col gap-2">
          <h2 className={cns.title}>
            <span>
              <BiFoodMenu />
            </span>
            <span>{category.name}</span>
          </h2>
          <p>{"Catálogo de productos"}</p>
        </div>

        <Link
          href={`/empresas/panel/productos/nuevo?pcid=${pcid}`}
          className="btn-base font-bold text-base"
        >
          {"Agregar producto"}
        </Link>
        {/* <ModalProducto
          label="Agregar producto"
          btnClass="btn-base py-0"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-5">
            {"Nuevo producto"}
          </h2>
          <FormularioProducto baseUnits={baseUnits} />
        </ModalProducto> */}
      </div>
      <ProductList products={[]} />
    </div>
  );
}
