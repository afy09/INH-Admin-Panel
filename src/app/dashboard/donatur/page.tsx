import React from "react";
import { fetchDataDonatur } from "@/app/api/datadonatur/getDonatur";
import { Metadata } from "next";
import TableDonatur from "@/components/Donatur/table-donatur";
export const metadata: Metadata = {
  title: "Admin Panel INH | Donatur",
};

export default async function page({ searchParams }: { searchParams: { page?: string; limit?: string } }) {
  const page = Number(searchParams.page);
  const limit = Number(searchParams.limit);
  const dataBerita = await fetchDataDonatur({ page, limit });
  return (
    <div>
      <TableDonatur dataBerita={dataBerita.data} currentPage={dataBerita.page} lastPage={dataBerita.pageCount} />
    </div>
  );
}

export const dynamic = "force-dynamic";
