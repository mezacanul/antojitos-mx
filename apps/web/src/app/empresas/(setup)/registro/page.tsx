import RegistroWizard from "@/components/Empresas/RegistroWizard";
import { getAllBusinessCategories } from "@/lib/data/catalogs";
import { getStates } from "@/lib/data/geo";
// import { logout } from "@/lib/auth";

export default async function RegistroPage() {
  const businessCategories =
    await getAllBusinessCategories();
  const states = await getStates();
  // await logout();

  return (
    <div className="h-dvh flex flex-col items-center justify-center gap-[2rem]">
      <RegistroWizard
        businessCategories={businessCategories}
        states={states}
      />
    </div>
  );
}
