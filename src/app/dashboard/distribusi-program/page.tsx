import React from "react";
import { fetchDataProgram } from "@/app/api/dataProgram/get/getDataProgram";
import { Metadata } from "next";
import TableDistribusi from "@/components/DistribusiProgram/table-distribusi";

export const metadata: Metadata = {
  title: "Admin Panel INH | Distribusi Program",
};

export default async function page({ searchParams }: { searchParams: { page?: string; limit?: string } }) {
  const page = Number(searchParams.page);
  const limit = Number(searchParams.limit);
  const dataProgram = await fetchDataProgram({ page, limit });
  return (
    <div>
      <TableDistribusi dataProgram={dataProgram.data} currentPage={dataProgram.current_page} lastPage={dataProgram.last_page} />
    </div>
  );
}

export const dynamic = "force-dynamic";
