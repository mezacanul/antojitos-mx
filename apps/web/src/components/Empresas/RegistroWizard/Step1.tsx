import { cn } from "@/utils/cn";
import { TextInput } from "@/components/Brand/TextInput";
import { useForm } from "react-hook-form";
import {
  businessFormSchema,
  BusinessFormType,
} from "@/lib/schema/forms";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  useBusinessFormStore,
  defaultBusinessFormData,
} from "@/store/useBusinessFormStore";

export function Step1({
  businessCategories,
  setStep,
}: {
  businessCategories: any[];
  setStep: (step: number) => void;
}) {
  const { setBusinessFormData } = useBusinessFormStore();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BusinessFormType>({
    resolver: zodResolver(businessFormSchema),
    defaultValues: defaultBusinessFormData,
    mode: "onBlur",
  });

  const onSubmit = handleSubmit((data) => {
    console.log(data);
    setBusinessFormData(data);
    setStep(2);
  });

  return (
    <form
      className="flex w-full flex-col gap-2"
      onSubmit={onSubmit}
    >
      <TextInput
        spreadProps={{ ...register("name") }}
        placeholder="Nombre de la empresa"
        errors={errors.name}
      />

      <select
        className="input-text"
        {...register("category_id")}
      >
        <option value="">Selecciona una categoría</option>
        {businessCategories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
      {errors.category_id && (
        <p className="text-red-500">
          {errors.category_id.message}
        </p>
      )}

      <TextInput
        spreadProps={{ ...register("city") }}
        placeholder="Ciudad"
        errors={errors.city}
      />

      <TextInput
        spreadProps={{ ...register("state") }}
        placeholder="Estado"
        errors={errors.state}
      />

      <button
        type="submit"
        className="btn-registro-siguiente"
      >
        {"Siguiente"}
      </button>
    </form>
  );
}
