import type { Metadata } from "next";
import { Bebas_Neue, Exo_2 } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import clsx from "clsx";
import Head from "next/head";

const font = Bebas_Neue({ subsets: ["latin"], weight: "400" });
export const font2 = Exo_2({ subsets: ["latin"], weight: "400" });

export const metadata: Metadata = {
  title: "Alejo Trenti | Portfolio",
  description: "My personal portfolio, where I introduce myself, I show my work, and where I live",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const title = metadata.title;
  
  return (
    <html lang="en" className="relative h-full w-full bg-black text-slate-100">
      <head>
        <Head>
          <title>Alejo Trenti | Portfolio</title>
          <meta name="description" content="My personal portfolio, where I introduce myself, I show my work, and where I live" />
        </Head>
      </head>
      <body className={clsx(font.className, "relative min-h-screen")}>
        <div className="absolute pointer-events-none bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] -z-20"></div>
        <div className="absolute -z-30 left-0 right-0 top-[-10%] lg:h-[1000px] lg:w-[1000px] rounded-full bg-[radial-gradient(circle_400px_at_50%_300px,#fbfbfb36,#000)]"></div>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}

