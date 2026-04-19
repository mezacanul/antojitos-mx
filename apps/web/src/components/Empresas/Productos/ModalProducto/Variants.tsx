"use client";

import { TextInput } from "@/components/Brand/TextInput";
import {
  useProductMetadataStore,
  type ProductVariantItem,
} from "@/store/useProductMetadataStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const variantRowSchema = z.object({
  name: z
    .string()
    .min(1, "Agrega un nombre o elimina la fila"),
});

type VariantRowValues = z.infer<typeof variantRowSchema>;

function VariantRow({
  item,
}: {
  item: ProductVariantItem;
}) {
  const updateVariant = useProductMetadataStore(
    (s) => s.updateVariant
  );
  const removeVariant = useProductMetadataStore(
    (s) => s.removeVariant
  );

  const {
    register,
    formState: { errors },
  } = useForm<VariantRowValues>({
    resolver: zodResolver(variantRowSchema),
    defaultValues: { name: item.value },
    mode: "onBlur",
  });

  const nameField = register("name");

  return (
    <div className="relative flex items-start gap-2">
      <div className="min-w-0 flex-1 pr-10">
        <TextInput
          label="Nombre de la variante"
          spreadProps={{
            ...nameField,
            onChange: (e) => {
              void nameField.onChange(e);
              updateVariant(item.id, e.target.value);
            },
          }}
          errors={errors.name}
        />
      </div>
      <button
        type="button"
        className="absolute top-2 right-0 flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-lg leading-none text-gray-500 hover:text-gray-900"
        onClick={() => removeVariant(item.id)}
        aria-label="Eliminar variante"
      >
        ×
      </button>
    </div>
  );
}

export function Variants() {
  const variants = useProductMetadataStore(
    (s) => s.variants
  );
  const addVariant = useProductMetadataStore(
    (s) => s.addVariant
  );

  return (
    <div className="flex flex-col gap-3">
      <div>
        <div className="flex items-center justify-between gap-2">
          <h3 className="text-xl font-bold text-gray-900">
            Variantes
          </h3>

          <button
            type="button"
            className="btn-base text-sm py-1"
            onClick={() => addVariant()}
          >
            +
          </button>
        </div>
        {/* <p className="mt-1 text-sm text-gray-600">
          Agrega sabores y modificaciones que no cambian el
          precio por pieza/porción de tus productos. Si
          deseas cambiar el precio de una variante, agrega
          un producto nuevo.
        </p> */}
      </div>

      <div className="flex flex-col gap-3">
        {variants.map((item) => (
          <VariantRow key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
