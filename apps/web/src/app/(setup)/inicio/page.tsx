import LoginForm from "@/components/Invitados/Setup/LoginForm";
import Link from "next/link";
import Logo from "@/components/Brand/Logo";

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center justify-center gap-10">
      <LoginForm />
      <Options />
    </div>
  );
}

function Options() {
  return (
    <Link className="text-blue-500" href="/registro">
      {"Registro"}
    </Link>
  );
}
