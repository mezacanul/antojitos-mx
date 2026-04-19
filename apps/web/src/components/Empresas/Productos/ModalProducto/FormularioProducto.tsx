"use client";
import { TextInput } from "@/components/Brand/TextInput";
import {
  useForm,
  useWatch,
  Control,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useModalStateStore } from "@/store/useModalStateStore";
import { useProductMetadataStore } from "@/store/useProductMetadataStore";
import { Variants } from "./Variants";
import { Precios } from "./Precios";
import ProductCard from "../ProductCard";
import {
  productFormSchema,
  ProductFormType,
} from "@/lib/schema/forms";
import DatosProducto from "./Formulario/DatosProducto";

const defaults: ProductFormType = {
  name: "",
  description: "",
  baseUnit: "pza",
  // image: null as unknown as FileList,
};

export default function FormularioProducto({
  baseUnits,
}: {
  baseUnits: any[];
}) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ProductFormType>({
    resolver: zodResolver(productFormSchema),
    defaultValues: defaults,
    mode: "onBlur",
  });
  const { closeModal } = useModalStateStore();
  const variants = useProductMetadataStore(
    (s) => s.variants
  );
  const prices = useProductMetadataStore((s) => s.prices);

  const onSave = handleSubmit((data) => {
    console.log({
      form: data,
      variants,
      prices,
    });
    closeModal();
  });

  return (
    <form onSubmit={onSave}>
      <div className="flex flex-col gap-10 max-h-[60vh] overflow-y-auto">
        <ProductCard product={{}} />

        {/* <DatosProducto
          register={register}
          errors={errors}
          baseUnits={baseUnits}
        /> */}
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-[4fr_2fr] gap-2">
            <TextInput
              label="Nombre del producto"
              spreadProps={{ ...register("name") }}
              // placeholder="Nombre"
              errors={errors.name}
            />

            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-gray-700">
                {"Unidad de medida"}
              </label>
              <select
                className="input-text text-center"
                {...register("baseUnit")}
              >
                {baseUnits.map((baseUnit) => (
                  <option
                    key={baseUnit.enumlabel}
                    value={baseUnit.enumlabel}
                  >
                    {baseUnit.enumlabel}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-gray-700">
              {"Descripción"}
            </label>
            <textarea
              className="input-text col-span-3"
              {...register("description")}
              placeholder="Descripción"
            />
            {errors.description && (
              <p className="text-red-500 text-xs">
                {errors.description.message}
              </p>
            )}
          </div>
        </div>

        {/* <span>{"Foto"}</span> */}

        <div className="grid grid-cols-2 gap-8">
          <Precios formControl={control} />
          <Variants />
        </div>
      </div>

      <div className="flex justify-center w-full mt-8 gap-2">
        <button
          className="btn-base bg-gray-500"
          type="button"
          onClick={closeModal}
        >
          {"Cancelar"}
        </button>
        <button
          className="btn-base"
          type="submit"
          // onClick={onSave}
        >
          {"Guardar"}
        </button>
      </div>
    </form>
  );
}
