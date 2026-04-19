"use client";

import { TextInput } from "@/components/Brand/TextInput";
import {
  useProductMetadataStore,
  type ProductPriceItem,
} from "@/store/useProductMetadataStore";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  useForm,
  useFormContext,
  useWatch,
  Control,
} from "react-hook-form";
import { z } from "zod";
import { FaTrashAlt } from "react-icons/fa";
import { cn } from "@/utils/cn";
import { ProductFormType } from "@/lib/schema/forms";

const precioRowSchema = z.object({
  price: z
    .number()
    .min(0, "El precio debe ser mayor o igual a 0"),
  amount: z
    .number()
    .min(1, "La cantidad debe ser al menos 1"),
});

type PrecioRowValues = z.infer<typeof precioRowSchema>;

function parseNum(v: unknown): number {
  if (v === "" || v === undefined || v === null) return 0;
  const n = typeof v === "number" ? v : Number(v);
  return Number.isNaN(n) ? 0 : n;
}

export function Precios({
  formControl,
}: {
  formControl: Control<ProductFormType>;
}) {
  const selectedBaseUnit = useWatch({
    control: formControl,
    name: "baseUnit",
  });
  const precios = useProductMetadataStore((s) => s.prices);
  const addPrecio = useProductMetadataStore(
    (s) => s.addPrice
  );

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between gap-2">
        <h3 className="text-xl font-bold text-gray-900">
          Precios
        </h3>

        <button
          type="button"
          className="btn-base py-0 text-lg"
          onClick={() => addPrecio()}
        >
          +
        </button>
      </div>

      <div className="flex items-start flex-col gap-3">
        {precios.map((item) => (
          <PrecioRow
            key={item.id}
            item={item}
            baseUnit={selectedBaseUnit}
          />
        ))}
      </div>
    </div>
  );
}

function PrecioRow({
  item,
  baseUnit,
}: {
  item: ProductPriceItem;
  baseUnit: string;
}) {
  const updatePrecio = useProductMetadataStore(
    (s) => s.updatePrice
  );
  const removePrecio = useProductMetadataStore(
    (s) => s.removePrice
  );

  const {
    register,
    formState: { errors },
  } = useForm<PrecioRowValues>({
    resolver: zodResolver(precioRowSchema),
    defaultValues: {
      price: item.price,
      amount: item.amount,
    },
    mode: "onBlur",
  });

  const priceField = register("price", {
    setValueAs: parseNum,
  });
  const amountField = register("amount", {
    setValueAs: parseNum,
  });

  return (
    <div className="relative flex justify-between items-center gap-2">
      <span className="font-bold text-lg">{"$"}</span>
      <TextInput
        // label="Precio"
        cns="text-center"
        spreadProps={{
          ...priceField,
          onChange: (e) => {
            void priceField.onChange(e);
            updatePrecio(item.id, {
              price: parseNum(e.target.value),
            });
          },
        }}
        placeholder="Precio"
        errors={errors.price}
      />
      <span>{" x "}</span>
      <TextInput
        // label="Cantidad"
        cns="text-center"
        spreadProps={{
          ...amountField,
          onChange: (e) => {
            void amountField.onChange(e);
            updatePrecio(item.id, {
              amount: parseNum(e.target.value),
            });
          },
        }}
        placeholder="Cantidad"
        errors={errors.amount}
      />
      <span className="font-bold ">{baseUnit}</span>
      <span className="mx-3 text-blue-600/80">{"|"}</span>
      <button
        type="button"
        className={cn(
          "flex shrink-0 items-center justify-center rounded-md text-lg leading-none",
          "text-gray-400 hover:text-red-500/70",
          "transition-all duration-300",
          "cursor-pointer"
        )}
        onClick={() => removePrecio(item.id)}
        aria-label="Eliminar precio"
      >
        <FaTrashAlt />
      </button>
    </div>
  );
}
