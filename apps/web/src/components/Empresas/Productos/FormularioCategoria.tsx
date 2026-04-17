"use client";
import { useState } from "react";
import { TextInput } from "@/components/Brand/TextInput";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { createProductCategory } from "@/lib/actions/products";

const defaultCategoryFormData = {
  name: "",
};
const categoryFormSchema = z.object({
  name: z.string().min(2, "El nombre es requerido"),
});

export default function FormularioCategoria({
  businessId,
}: {
  businessId: string;
}) {
  // console.log("businessId from form:", businessId);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(categoryFormSchema),
    defaultValues: defaultCategoryFormData,
    mode: "onBlur",
  });
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  const onSubmit = handleSubmit(async (data) => {
    try {
      const payload = {
        ...data,
        businessId,
      };
      const result = await createProductCategory(payload);
      if (result.name) {
        toggleOpen();
      }

      // console.log("submit result:", result);
    } catch (error) {
      console.error(error);
    }
  });

  return (
    <div>
      {!isOpen && (
        <button className="btn-base" onClick={toggleOpen}>
          {"Agregar categoría"}
        </button>
      )}

      {isOpen && (
        <form
          className="flex flex-col gap-2"
          onSubmit={onSubmit}
        >
          <h3 className="text-lg font-bold">
            {"Nueva categoría de productos"}
          </h3>
          <TextInput
            spreadProps={{ ...register("name") }}
            placeholder="Nombre"
            errors={errors.name}
          />

          <div className="flex gap-2">
            <button
              className="btn-base"
              onClick={toggleOpen}
            >
              {"Cancelar"}
            </button>
            <button
              type="submit"
              className="btn-base"
              disabled={isSubmitting}
            >
              {"Guardar"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
