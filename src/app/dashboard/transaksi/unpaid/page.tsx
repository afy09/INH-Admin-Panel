import React from "react";
import { fetchDataTransaksiUnpaid } from "@/app/api/dataTransaksi/getDataUnpaid";
import { Metadata } from "next";
import PageTransaksi from "@/components/Transaksi/PageTransaksi";
import TableTransaksiUnpaid from "@/components/Transaksi/table-unpaid";

export const metadata: Metadata = {
  title: "Admin Panel INH | Transaksi",
};

export default async function page({ searchParams }: { searchParams: { page?: string; limit?: string } }) {
  const page = Number(searchParams.page);
  const limit = Number(searchParams.limit);
  const dataTransaksi = await fetchDataTransaksiUnpaid({ limit, page });
  return (
    <div className="border rounded-lg">
      <PageTransaksi />
      <TableTransaksiUnpaid dataTransaksi={dataTransaksi.data} currentPage={dataTransaksi.page} lastPage={dataTransaksi.pageCount} />
    </div>
  );
}

export const dynamic = "force-dynamic";
