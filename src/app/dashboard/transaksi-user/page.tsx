import React from "react";
import { fetchDataTransaksiUser } from "@/app/api/dataTransaksiUser/getDataTransaksiUser";
import TableTransaksiUser from "@/components/TransaksiUser/transaksiUser";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Panel INH | Transaksi User",
};

export default async function Page({ searchParams }: { searchParams: Record<string, string> }) {
  const dataTransaksi = await fetchDataTransaksiUser(searchParams);

  return (
    <div className="rounded-lg">
      <TableTransaksiUser dataTransaksi={dataTransaksi.data} currentPage={dataTransaksi.current_page} lastPage={dataTransaksi.last_page} />
    </div>
  );
}

export const dynamic = "force-dynamic";
