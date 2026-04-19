"use client";
import { TextInput } from "@/components/Brand/TextInput";
import { ProductFormType } from "@/lib/schema/forms";
import { useFormContext } from "react-hook-form";

export default function DatosProducto({
  baseUnits,
  register,
  errors,
}: {
  register: any;
  errors: any;
  baseUnits: any[];
}) {
  // const { register, formState } =
  //   useFormContext<ProductFormType>();
  const nameError = errors.name;
  const descriptionError = errors.description;
  return (
    <div>
      <div className="grid grid-cols-2 gap-2">
        <TextInput
          label="Nombre del producto"
          spreadProps={{ ...register("name") }}
          // placeholder="Nombre"
          errors={nameError}
        />

        <div className="flex flex-col gap-2">
          <label className="text-sm font-bold text-gray-700">
            {"Unidad de medida"}
          </label>
          <select
            className="input-text"
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
        {descriptionError && (
          <p className="text-red-500 text-xs">
            {descriptionError.message}
          </p>
        )}
      </div>
    </div>
  );
}
