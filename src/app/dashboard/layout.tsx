import "jsvectormap/dist/jsvectormap.css";
import "flatpickr/dist/flatpickr.min.css";
import { Inter } from "next/font/google";
import "@/css/style.css";
import React from "react";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { fetchAdmin } from "@/app/api/AdminProfile/getProfile";
import { DataAdminProvider } from "@/app/context/dataAdmin/store";
import { DataAdmin } from "@/models/DataAdmin";

const inter = Inter({ subsets: ["latin"] });

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const dataAdmin = await fetchAdmin();
  return (
    <DataAdminProvider dataAdmin={dataAdmin}>
      <DefaultLayout>
        <div className={`${inter.className} dark:bg-boxdark-2 dark:text-bodydark`}>{children}</div>
      </DefaultLayout>
    </DataAdminProvider>
  );
}

export const dynamic = "force-dynamic";
