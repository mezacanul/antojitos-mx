import {
  userFormSchema,
  UserFormType,
} from "@/lib/schema/forms";
import {
  useUserFormStore,
  defaultUserFormData,
} from "@/store/useUserFormStore";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TextInput } from "@/components/Brand/TextInput";

export function Step2({
  setStep,
}: {
  setStep: (step: number) => void;
}) {
  const { setUserFormData } = useUserFormStore();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserFormType>({
    resolver: zodResolver(userFormSchema),
    defaultValues: defaultUserFormData,
    mode: "onBlur",
  });

  const onSubmit = handleSubmit((data) => {
    console.log(data);
    setUserFormData(data);
    setStep(3);
  });

  return (
    <form
      className="flex w-full flex-col gap-2"
      onSubmit={onSubmit}
    >
      <TextInput
        spreadProps={{ ...register("names") }}
        placeholder="Nombres"
        errors={errors.names}
      />
      <TextInput
        spreadProps={{ ...register("paternal_surname") }}
        placeholder="Apellido paterno"
        errors={errors.paternal_surname}
      />
      <TextInput
        spreadProps={{ ...register("maternal_surname") }}
        placeholder="Apellido materno"
        errors={errors.maternal_surname}
      />
      <TextInput
        spreadProps={{ ...register("email") }}
        placeholder="Email"
        errors={errors.email}
      />
      <TextInput
        spreadProps={{ ...register("phone") }}
        placeholder="Teléfono"
        errors={errors.phone}
      />
      <TextInput
        spreadProps={{ ...register("password") }}
        placeholder="Contraseña"
        errors={errors.password}
      />
      <TextInput
        spreadProps={{ ...register("confirm_password") }}
        placeholder="Confirmar contraseña"
        errors={errors.confirm_password}
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
