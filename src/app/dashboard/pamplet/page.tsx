import React from "react";
import { fetchDataPamplet } from "@/app/api/dataPamplet/getDataPamplet";
import { Metadata } from "next";
import TablePamplet from "@/components/pamplet/table-pamplet";
import PagePamplet from "@/components/pamplet";

export const metadata: Metadata = {
  title: "Admin Panel INH | Pamplet",
};

export default async function page({ searchParams }: { searchParams: { page?: string; limit?: string } }) {
  const page = Number(searchParams.page);
  const limit = Number(searchParams.limit);
  const dataPamplet = await fetchDataPamplet({ page, limit });
  return (
    <div className="border rounded-lg">
      <PagePamplet />
      <TablePamplet dataPamplet={dataPamplet.data} currentPage={dataPamplet.current_page} lastPage={dataPamplet.last_page} />
    </div>
  );
}

export const dynamic = "force-dynamic";
