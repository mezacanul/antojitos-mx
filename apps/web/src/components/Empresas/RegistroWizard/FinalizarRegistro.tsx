import { zodResolver } from "@hookform/resolvers/zod";
import { useBusinessFormStore } from "@/store/useBusinessFormStore";
import { useUserFormStore } from "@/store/useUserFormStore";
import { useBranchFormStore } from "@/store/useBranchFormStore";
import Link from "next/link";
import { createBusiness } from "@/lib/actions/onboarding";
import { redirect } from "next/navigation";
import { useForm } from "react-hook-form";

export function FinalizarRegistro() {
  const { businessFormData } = useBusinessFormStore();
  const { userFormData } = useUserFormStore();
  const { branchFormData } = useBranchFormStore();
  const {
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm({
    mode: "onBlur",
  });

  const onSubmit = handleSubmit(async (data) => {
    console.log(
      businessFormData,
      userFormData,
      branchFormData
    );
    const payload = {
      businessFormData,
      userFormData,
      branchFormData,
    };
    const result = await createBusiness(payload);
    if (result.error) {
      console.error(
        "Error creating business:",
        result.error
      );
      // throw new Error(result.error.message);
    } else {
      redirect("/empresas/panel");
    }
  });

  return (
    <form
      className="flex w-full flex-col gap-2"
      onSubmit={onSubmit}
    >
      <div className="grid grid-cols-1 gap-4">
        <button
          type="submit"
          className="btn-registro-siguiente"
          disabled={isSubmitting}
        >
          {"Finalizar Registro"}
        </button>

        {!isSubmitting && (
          <Link
            href="/empresas/inicio"
            className="text-center text-gray-400 hover:text-gray-600"
          >
            {"Cancelar"}
          </Link>
        )}
      </div>
    </form>
  );
}
