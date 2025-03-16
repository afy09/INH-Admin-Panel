import React from "react";
import { fetchDataProgram } from "@/app/api/dataProgram/get/getDataProgram";
import { Metadata } from "next";
import TableDistribusi from "@/components/DistribusiProgram/table-distribusi";

export const metadata: Metadata = {
  title: "Admin Panel INH | Distribusi Program",
};

export default async function page() {
  const dataProgram = await fetchDataProgram();
  return (
    <div>
      <TableDistribusi dataProgram={dataProgram} />
    </div>
  );
}

export const dynamic = "force-dynamic";
