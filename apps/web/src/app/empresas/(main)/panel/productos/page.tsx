import { getProductsBySession_Categorized } from "@/lib/data/products";
import ProductList from "@/components/Empresas/Productos/List";

export default async function Home() {
  const productsByCategory =
    await getProductsBySession_Categorized();
  // console.log("productsByCategory:", productsByCategory);

  return (
    <div>
      <ProductList
        productsByCategory={productsByCategory}
      />
    </div>
  );
}
