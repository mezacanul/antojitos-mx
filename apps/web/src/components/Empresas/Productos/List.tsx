import Image from "next/image";
import { FaRegListAlt } from "react-icons/fa";
import { HiCurrencyDollar } from "react-icons/hi2";

export default async function ProductList({
  productsByCategory,
}: {
  productsByCategory: any[];
}) {
  const cns = {
    productsContainer: "grid grid-cols-2 gap-2",
    productName: "font-bold text-lg",
    categoryName: "text-4xl font-light",
  };
  return (
    <div className="flex flex-col gap-5">
      {productsByCategory.map((category) => (
        <div
          key={category.id}
          className="flex flex-col gap-3"
        >
          {/* Category title */}
          <h2 className={cns.categoryName}>
            {category.name}
          </h2>

          {/* Products list */}
          <div className={cns.productsContainer}>
            {category.products.map((product: any) => (
              <ProductCard
                product={product}
                key={product.id}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function ProductCard({ product }: { product: any }) {
  const bucketUrl = `${process.env.NEXT_PUBLIC_BUCKET_URL}/products/`;
  return (
    <div
      className={"product-card h-[9rem]"}
      key={product.id}
    >
      <div className="flex items-start gap-2 h-full w-full">
        <Image
          src={`${bucketUrl}${product.imageUrl}`}
          alt={product.name}
          width={500}
          height={500}
          className="w-[10rem] h-full object-cover"
        />

        <div className="flex justify-between h-full w-full gap-2">
          {/* Columna Izquierda */}
          <div className="flex h-full w-[60%] flex-col justify-between gap-1 px-2">
            <div className="flex flex-col gap-1">
              <h2 className={"font-bold text-lg"}>
                {product.name}
              </h2>
              {/* <p className={"text-sm text-gray-500"}>
                {product.description}
              </p> */}
            </div>

            <Opciones options={product.productVariants} />
          </div>

          {/* Columna Derecha */}
          <Precios
            prices={product.prices}
            baseUnit={product.baseUnit}
          />
        </div>
      </div>
    </div>
  );
}

function Precios({
  prices,
  baseUnit,
}: {
  prices: any[];
  baseUnit: string;
}) {
  return (
    <div className="flex flex-col gap-2 w-[40%]">
      <div className="flex flex-col gap-1">
        {prices.map((p, index) => (
          <PriceItem
            price={p}
            baseUnit={baseUnit}
            key={index}
          />
        ))}
      </div>
    </div>
  );
}

function PriceItem({
  price,
  baseUnit,
}: {
  price: any;
  baseUnit: string;
}) {
  const { quantity, sizeLabel, price: priceValue } = price;
  const textObj = {
    quantity: baseUnit != "label" ? quantity : null,
    sizeLabel:
      baseUnit == "label"
        ? sizeLabel
        : baseUnit == "piece"
        ? `pieza${quantity > 1 ? "s" : ""}`
        : baseUnit,
    price: `$${Number(priceValue).toFixed(2)}`,
  };
  return (
    <div className="flex items-center justify-between gap-2">
      <span className="font-medium text-sm">
        {textObj.quantity && (
          <span>{`${textObj.quantity} `}</span>
        )}
        {textObj.sizeLabel}
      </span>

      <span className="text-green-700/85 font-bold">
        {textObj.price}
      </span>
    </div>
  );
}

function Metadata({
  variants,
  prices,
}: {
  variants: any[];
  prices: any[];
}) {
  return (
    <div className="flex justify-between">
      <div className="text-sm flex items-end gap-1">
        <div className="text-blue-600 font-bold flex items-center gap-1">
          <FaRegListAlt size={16} />
          {variants.length}
        </div>
        <span>{` opciones`}</span>
      </div>
      <div className="text-sm flex items-end gap-1">
        <div className="text-green-600 font-bold flex items-center gap-1">
          <HiCurrencyDollar size={20} />
          {prices.length}
        </div>
        <span>{` precios`}</span>
      </div>
    </div>
  );
}

function Opciones({ options }: { options: any[] }) {
  return (
    <div className="flex items-center gap-2 flex-wrap">
      {options.map((option, index) => (
        <div className="badge badge-primary" key={index}>
          {option.name}
        </div>
      ))}
    </div>
  );
}
