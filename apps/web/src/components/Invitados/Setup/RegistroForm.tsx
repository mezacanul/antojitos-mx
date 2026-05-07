"use client";
import { TextInput } from "@/components/Brand/TextInput";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CreateUserDTO,
  CreateUserInput,
} from "@antojitos-mx/shared";
import {
  createGuest,
  testEmail,
} from "@/lib/actions/guest/onboarding";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

const defaultValues: CreateUserInput = {
  names: "Eduardo",
  paternal_surname: "Lopez",
  maternal_surname: "Gomez",
  email: "",
  password: "dev@2026",
  confirm_password: "dev@2026",
};

export default function RegistroForm() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isEmailAvailable, setIsEmailAvailable] = useState<
    boolean | null
  >(null);
  const [isError, setIsError] = useState<boolean | null>(
    null
  );
  const [isSuccess, setIsSuccess] = useState<
    boolean | null
  >(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreateUserInput>({
    resolver: zodResolver(CreateUserDTO),
    defaultValues,
    mode: "onBlur",
  });

  const onSubmit = handleSubmit(async (formData) => {
    setIsEmailAvailable(null);
    setIsError(null);
    setIsSuccess(null);
    try {
      const testEmailResult = await testEmail({
        email: formData.email,
      });
      if (testEmailResult === false) {
        setIsEmailAvailable(false);
      } else {
        const createGuestResult = await createGuest(
          formData
        );
        if (createGuestResult.success === false) {
          setIsError(true);
        } else if (createGuestResult.success === true) {
          setIsSuccess(true);
          const supabase = createClient();
          const { data, error } =
            await supabase.auth.signInWithPassword({
              email: formData.email,
              password: formData.password,
            });
          if (error) {
            throw error;
          }
          console.log("data:", data);
          // setTimeout(() => {
          router.push("/bienvenido");
          // }, 1000);
        }
      }
    } catch (error) {
      setIsError(true);
    }
  });

  return (
    <div className="">
      {!isOpen && (
        <button
          className="btn-base"
          onClick={() => setIsOpen(true)}
        >
          {"Comenzar"}
        </button>
      )}

      {isOpen && (
        <form
          className="flex flex-col gap-3 items-center w-[30rem]"
          onSubmit={onSubmit}
        >
          <div className="grid grid-cols-2 gap-2 w-full">
            <TextInput
              spreadProps={{ ...register("names") }}
              placeholder="Nombre(s)"
              errors={errors.names}
            />
            <TextInput
              spreadProps={{
                ...register("paternal_surname"),
              }}
              placeholder="Apellido paterno"
              errors={errors.paternal_surname}
            />
            <TextInput
              spreadProps={{
                ...register("maternal_surname"),
              }}
              placeholder="Apellido materno"
              errors={errors.maternal_surname}
            />
            <TextInput
              spreadProps={{ ...register("email") }}
              placeholder="Email"
              errors={errors.email}
            />
            <TextInput
              spreadProps={{ ...register("password") }}
              placeholder="Contraseña"
              errors={errors.password}
            />
            <TextInput
              spreadProps={{
                ...register("confirm_password"),
              }}
              placeholder="Confirmar contraseña"
              errors={errors.confirm_password}
            />
          </div>

          <div className="w-[50%] flex flex-col items-center gap-2">
            {isSuccess !== true && (
              <button
                type="submit"
                className="btn-base w-full"
                disabled={isSubmitting}
              >
                {isSubmitting
                  ? "Creando cuenta..."
                  : "Registrar"}
              </button>
            )}
            {isEmailAvailable === false && (
              <p className="text-red-500">
                {"Email no disponible"}
              </p>
            )}
            {isError === true && (
              <p className="text-red-500">
                {"Error al crear la cuenta"}
              </p>
            )}
            {isSuccess === true && (
              <p className="text-green-600">
                {"¡Cuenta creada exitosamente!"}
              </p>
            )}
          </div>
        </form>
      )}
    </div>
  );
}
