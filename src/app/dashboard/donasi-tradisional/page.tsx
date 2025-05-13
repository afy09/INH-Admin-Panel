import React from "react";
import { fetchDataDonasiTradisional } from "@/app/api/datadonasitradisonal/get/getDataDonasiTradisonal";
import { Metadata } from "next";

import TableTransaksi from "@/components/DonasiTradisonal/table-donasi-tradisional";

export const metadata: Metadata = {
  title: "Admin Panel INH | Transaksi",
};

export default async function page({ searchParams }: { searchParams: { page?: string; limit?: string } }) {
  const page = Number(searchParams.page);
  const limit = Number(searchParams.limit);
  const dataTransaksi = await fetchDataDonasiTradisional({ limit, page });
  return (
    <div className="border rounded-lg">
      <TableTransaksi dataTransaksi={dataTransaksi.data} currentPage={dataTransaksi.current_page} lastPage={dataTransaksi.last_page} />
    </div>
  );
}

export const dynamic = "force-dynamic";
