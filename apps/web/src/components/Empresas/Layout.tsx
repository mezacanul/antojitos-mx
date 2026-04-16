"use client";
import { cn } from "@/utils/cn";
import Link from "next/link";
import { logout } from "@/lib/auth";

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-[15rem_1fr] h-dvh">
      <Sidebar />
      <div className="flex flex-col">
        <ContentHeader />
        <div className="pd-panel">{children}</div>
      </div>
    </div>
  );
}

function ContentHeader() {
  return (
    <div
      className={cn(
        "flex flex-col gap-2 pd-panel bg-white",
        "border-b border-black/80"
      )}
    >
      <h1 className="text-2xl font-bold">
        Panel de control
      </h1>
      <p>Bienvenido, {"user.name"}</p>
    </div>
  );
}

function Sidebar() {
  const basePath = "/empresas/panel";
  return (
    <div className="pd-sidebar flex flex-col justify-between bg-orange-600/80 text-white">
      <div className="flex flex-col gap-2 font-bold">
        <Link href={`${basePath}`}>Inicio</Link>
        <Link href={`${basePath}/categorias`}>
          Categorías
        </Link>
        <Link href={`${basePath}/productos`}>
          Productos
        </Link>
        <Link href={`${basePath}/sucursales`}>
          Sucursales
        </Link>
      </div>

      <button className="btn-logout" onClick={logout}>
        {"Cerrar sesión"}
      </button>
    </div>
  );
}
