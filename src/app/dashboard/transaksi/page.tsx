import React from "react";
import { fetchDataTransaksi } from "@/app/api/dataTransaksi/getDataTransaksi";
import { Metadata } from "next";
import PageTransaksi from "@/components/Transaksi/PageTransaksi";
import TableTransaksi from "@/components/Transaksi/table-transaksi";

export const metadata: Metadata = {
  title: "Admin Panel INH | Transaksi",
};

export default async function page({ searchParams }: { searchParams: { page?: string; limit?: string } }) {
  const page = Number(searchParams.page);
  const limit = Number(searchParams.limit);
  const dataTransaksi = await fetchDataTransaksi({ limit, page });
  return (
    <div className="border rounded-lg">
      <PageTransaksi />
      <TableTransaksi dataTransaksi={dataTransaksi.data} currentPage={dataTransaksi.page} lastPage={dataTransaksi.pageCount} />
    </div>
  );
}

export const dynamic = "force-dynamic";
