import React from "react";
import { fetchDataLembaga } from "@/app/api/datakerjasama/lembaga/get/getDataLembaga";
import { Metadata } from "next";
import PageKerjaSama from "@/components/KerjaSama";
import TableLembaga from "@/components/KerjaSama/Lembaga/table-lembaga";

export const metadata: Metadata = {
  title: "Admin Panel INH | Kerja Sama - Lembaga",
};

export default async function page() {
  const dataLembaga = await fetchDataLembaga();
  return (
    <div className="border rounded-lg">
      <PageKerjaSama />
      <TableLembaga dataLembaga={dataLembaga} />
    </div>
  );
}

export const dynamic = "force-dynamic";
