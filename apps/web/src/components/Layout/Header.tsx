import Image from "next/image";
export default function Header() {
  return (
    <header className="h-[10vh] bg-slate-200 flex items-center justify-center">
      <Image
        src="/next.svg"
        alt="Logo"
        width={100}
        height={100}
      />
    </header>
  );
}
