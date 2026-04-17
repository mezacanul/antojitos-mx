import { Product } from "@/types";

export default function ProductList({
  products,
}: {
  products: Product[];
}) {
  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-4 gap-2">
        {products.map((product) => (
          <button className="product-card" key={product.id}>
            <h2 className="font-bold">{product.name}</h2>
          </button>
        ))}
      </div>
    </div>
  );
}
