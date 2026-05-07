"use client";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/utils/cn";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { login } from "@/lib/auth";

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

export default function LoginForm() {
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
  const supabase = createClient();

  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (data) {
        const role = data.user?.app_metadata?.role;
        if (role === "TENANT_OWNER") {
          toast.warning(
            `Tienes una sesión activa con el rol de Empresario. Al iniciar sesión, se cerrará la sesión actual.`
          );
          // router.push("/explorar");
        }
      }
      console.log("page data:", data);
      console.log("page error:", error);
    };
    fetchUser();
  }, []);

  const onSubmit = handleSubmit(async (data) => {
    const formData = new FormData();
    formData.append("email", data.email);
    formData.append("password", data.password);
    const result = await login(formData);
    console.log("Login result:", result);

    if (result.success) {
      router.push("/invitado/inicio");
    }
    // router.push("/explorar");
  });
  return (
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
  );
}
