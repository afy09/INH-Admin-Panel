import "jsvectormap/dist/jsvectormap.css";
import "flatpickr/dist/flatpickr.min.css";
import { Inter } from "next/font/google";
import "@/css/style.css";
import React from "react";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

const inter = Inter({ subsets: ["latin"] });

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <DefaultLayout>
      <div className={`${inter.className} dark:bg-boxdark-2 dark:text-bodydark`}>{children}</div>
    </DefaultLayout>
  );
}

export const dynamic = "force-dynamic";
