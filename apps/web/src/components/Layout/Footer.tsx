import Link from "next/link";

export default function Footer() {
  return (
    <footer className="h-[10vh] bg-slate-200 flex flex-col items-center justify-center gap-1">
        <Link
          href="https://eduardomeza.vercel.app"
          target="_blank"
          className="hover:text-blue-600"
        >
          {"Eduardo Meza"}
        </Link>
        <p className="text-sm text-gray-500">{"2026"}</p>
    </footer>
  );
}
