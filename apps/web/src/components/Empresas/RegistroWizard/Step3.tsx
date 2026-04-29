"use client";
import { TextInput } from "@/components/Brand/TextInput";
import { useForm } from "react-hook-form";
import {
  branchFormSchema,
  BranchFormType,
} from "@/lib/schema/forms";
import {
  defaultBranchFormData,
  useBranchFormStore,
} from "@/store/useBranchFormStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { CitySelector } from "./CitySelector";

export function Step3({
  setStep,
  states,
}: {
  setStep: (step: number) => void;
  states: any[];
}) {
  const { setBranchFormData } = useBranchFormStore();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<BranchFormType>({
    resolver: zodResolver(branchFormSchema),
    defaultValues: defaultBranchFormData,
    mode: "onBlur",
  });

  const onSubmit = handleSubmit((data) => {
    console.log(data);
    setBranchFormData(data);
    setStep(4);
  });

  return (
    <form
      className="flex w-full flex-col gap-2"
      onSubmit={onSubmit}
    >
      <TextInput
        spreadProps={{ ...register("name") }}
        placeholder="Nombre de la colonia / sucursal"
        errors={errors.name}
      />

      <TextInput
        spreadProps={{ ...register("address") }}
        placeholder="Dirección"
        errors={errors.address}
      />

      <TextInput
        spreadProps={{ ...register("zip") }}
        placeholder="Código postal"
        errors={errors.zip}
      />

      <TextInput
        spreadProps={{ ...register("latitude") }}
        placeholder="Latitud"
        errors={errors.latitude}
      />

      <TextInput
        spreadProps={{ ...register("longitude") }}
        placeholder="Longitud"
        errors={errors.longitude}
      />

      <select
        className="input-text"
        {...register("stateId")}
      >
        <option value="" disabled>
          Selecciona un estado
        </option>
        {states.map((state) => (
          <option key={state.id} value={state.id}>
            {state.name}
          </option>
        ))}
      </select>
      {errors.stateId && (
        <p className="text-red-500 text-xs px-1">
          {errors.stateId.message}
        </p>
      )}

      <CitySelector
        control={control}
        spreadProps={{ ...register("cityId") }}
      />
      {errors.cityId && (
        <p className="text-red-500 text-xs px-1">
          {errors.cityId.message}
        </p>
      )}

      <div className="grid grid-cols-2 gap-2">
        <button
          type="button"
          className="btn-registro-siguiente bg-gray-400!"
          onClick={() => setStep(4)}
        >
          {"Omitir"}
        </button>
        <button
          type="submit"
          className="btn-registro-siguiente"
        >
          {"Siguiente"}
        </button>
      </div>
    </form>
  );
}
