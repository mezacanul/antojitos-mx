import { Product } from "@/types";

export default async function ProductList({
  products,
}: {
  products: Product[];
}) {
  const cns = {
    productsContainer: "grid grid-cols-4 gap-2",
    productCard: "product-card",
    productName: "font-bold",
  };
  return (
    <div className={cns.productsContainer}>
      {products.map((product) => (
        <button
          className={cns.productCard}
          key={product.id}
        >
          <h2 className={cns.productName}>
            {product.name}
          </h2>
        </button>
      ))}
    </div>
  );
}
