import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/app/globals.css";
import Layout from "@/components/Empresas/Layout";
import { getBusinessByUserSession } from "@/lib/data/business";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Meniux | Empresas",
  description:
    "A template for a Next.js project with Tailwind CSS, TypeScript and the App Router",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const business = await getBusinessByUserSession();
  console.log("business:", business);
  
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-gray-100">
        <Layout business={business}>{children}</Layout>
        {/* <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(cmsData.jsonLD).replace(
              /</g,
              "\\u003c"
            ),
          }}
        /> */}
      </body>
    </html>
  );
}
