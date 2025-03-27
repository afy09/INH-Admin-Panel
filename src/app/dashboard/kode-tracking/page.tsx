import React from "react";
import { fetchDataKodeTracking } from "@/app/api/dataKodeTracking/getDataKodeTracking";
import { Metadata } from "next";
import TableDistribusi from "@/components/DistribusiProgram/table-distribusi";
import TableKode from "@/components/KodeTracking/table-kode-tracking";

export const metadata: Metadata = {
  title: "Admin Panel INH | Kode Tracking",
};

export default async function page() {
  const dataKode = await fetchDataKodeTracking();
  return (
    <div>
      <TableKode dataKode={dataKode} />
    </div>
  );
}

export const dynamic = "force-dynamic";
