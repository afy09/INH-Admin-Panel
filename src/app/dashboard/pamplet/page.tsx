import React from "react";
import { fetchDataPamplet } from "@/app/api/dataPamplet/getDataPamplet";
import { Metadata } from "next";
import TablePamplet from "@/components/pamplet/table-pamplet";
import PagePamplet from "@/components/pamplet";

export const metadata: Metadata = {
  title: "Admin Panel INH | Pamplet",
};

export default async function page() {
  const dataPamplet = await fetchDataPamplet();
  return (
    <div className="border rounded-lg">
      <PagePamplet />
      <TablePamplet dataPamplet={dataPamplet} />
    </div>
  );
}

export const dynamic = "force-dynamic";
