import { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/app/globals.css";
import { cn } from "@/utils/cn";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Meniux",
  description: "Your favorite food app",
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <div
          className={cn(
            "flex flex-col items-center justify-center h-dvh bg-slate-200",
            "gap-10"
          )}
        >
          <Logo />
          {children}
          <Options />
        </div>
      </body>
    </html>
  );
}

function Logo() {
  return (
    <div>
      <p>Logo</p>
    </div>
  );
}

function Options() {
  return (
    <div>
      <a
        href="/empresas/registro"
        className="text-blue-500"
      >
        Registro
      </a>
    </div>
  );
}
