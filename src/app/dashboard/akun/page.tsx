import React from "react";
import { Metadata } from "next";
import { fetchDataUserAdmin } from "@/app/api/dataakun/get/getUserAdmin";
import Akun from "@/components/Akun";
export const metadata: Metadata = {
  title: "Admin Panel INH | Akun",
};

export default async function page() {
  const dataUserAdmin = await fetchDataUserAdmin();
  return (
    <div>
      <Akun dataUserAdmin={dataUserAdmin} />
    </div>
  );
}

export const dynamic = "force-dynamic";
