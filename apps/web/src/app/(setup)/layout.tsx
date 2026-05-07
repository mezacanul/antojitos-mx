import Logo from "@/components/Brand/Logo";

export default async function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex flex-col items-center justify-center h-dvh">
      <Logo extraClasses="mb-10" />
      {children}
    </main>
  );
}
