"use client";
import { cn } from "@/utils/cn";
import Link from "next/link";
import { logout } from "@/lib/auth";
import { Business } from "@/types";
import Image from "next/image";
import ImageInput from "../common/ImageInput";

export default function Layout({
  business,
  children,
}: {
  children: React.ReactNode;
  business: Business;
}) {
  const { usePathname } = require("next/navigation");
  const pathname = usePathname();
  const isRootPath = pathname === "/empresas/panel";
  const match = pathname.match(
    /\/empresas\/panel\/([^\/]+)/
  );
  const currentTab = match
    ? match[1]
    : isRootPath
    ? "inicio"
    : null;
  const capitalized = currentTab
    ? currentTab.charAt(0).toUpperCase() +
      currentTab.slice(1)
    : null;

  if (!currentTab && !isRootPath) return <div>404</div>;
  return (
    <div className="grid grid-cols-[15rem_1fr] h-dvh w-full">
      <Sidebar />
      <div className="flex flex-col">
        <ContentHeader business={business} />
        <div className="pd-panel flex flex-col items-start w-full">
          <h1 className="text-3xl mb-6">{capitalized}</h1>
          <div className="h-[65vh] w-full overflow-y-auto">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

function ContentHeader({
  business,
}: {
  business: Business;
}) {
  return (
    <div
      className={cn(
        "flex gap-2 pd-panel bg-white",
        "justify-between items-center",
        "border-b border-black/80"
      )}
    >
      {/* Left side of the header */}
      <div>
        <h1 className="text-2xl font-bold text-orange-600/80">
          Panel de control
        </h1>
        <p>Bienvenido, {"user.name"}</p>
      </div>

      {/* Right side of the header */}
      <div className="flex gap-4 items-center">
        <div className="flex flex-col gap-2 items-end">
          <h2 className="text-3xl font-bold">
            {business.name}
          </h2>
          <div className="badge badge-success">
            {"Abierto"}
          </div>
        </div>

        <ImageInput
          imageSrc={business.imageUrl}
          // imageSrc={"/logo_b.jpg"}
        />
      </div>
    </div>
  );
}

function Sidebar() {
  const basePath = "/empresas/panel";
  return (
    <div className="pd-sidebar flex flex-col justify-between bg-blue-800 text-white">
      <div className="flex flex-col gap-2 font-bold">
        <Link href={`${basePath}`}>Inicio</Link>
        <Link href={`${basePath}/productos`}>
          Productos
        </Link>
        <Link href={`${basePath}/sucursales`}>
          Sucursales
        </Link>
        <Link href={`${basePath}/estadisticas`}>Likes</Link>
        <Link href={`${basePath}/resenas`}>Reseñas</Link>
      </div>

      <button className="btn-logout" onClick={logout}>
        {"Cerrar sesión"}
      </button>
    </div>
  );
}
