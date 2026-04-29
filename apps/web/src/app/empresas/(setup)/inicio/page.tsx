"use client";

import { login } from "@/lib/auth";
import { cn } from "@/utils/cn";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";

const loginSchema = z.object({
  email: z.email("El email no es válido"),
  password: z
    .string()
    .min(
      6,
      "La contraseña debe tener al menos 6 caracteres"
    ),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onBlur",
  });
  const router = useRouter();

  const onSubmit = handleSubmit(async (data) => {
    const formData = new FormData();
    formData.append("email", data.email);
    formData.append("password", data.password);
    const result = await login(formData);
    
    console.log("Login result:", result);
    router.push("/empresas/panel");
  });

  return (
    <div>
      <form
        className="flex flex-col gap-2 w-[15rem]"
        onSubmit={onSubmit}
      >
        <input
          type="email"
          placeholder="Cuenta de correo"
          {...register("email")}
          className={cn("input-text")}
          disabled={isSubmitting}
        />
        {errors.email && (
          <p className="text-red-500">
            {errors.email.message}
          </p>
        )}
        <input
          type="password"
          placeholder="Contraseña"
          {...register("password")}
          className={cn("input-text")}
          disabled={isSubmitting}
        />
        {errors.password && (
          <p className="text-red-500">
            {errors.password.message}
          </p>
        )}
        <button
          type="submit"
          className="btn-login-submit"
          disabled={isSubmitting}
        >
          {"Iniciar sesión"}
        </button>
      </form>
    </div>
  );
}
