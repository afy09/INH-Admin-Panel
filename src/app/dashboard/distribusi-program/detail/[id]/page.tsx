import React from "react";
import { fetchDetailProgram } from "@/app/api/dataProgram/get/getDetailProgram";
import { Metadata } from "next";
import DetailProgram from "@/components/DistribusiProgram/detail-program";
import { fetchDataUserAdmin } from "@/app/api/dataakun/get/getUserAdmin";
import { fetchDataKategori } from "@/app/api/datakategori/get/getKategori";

export const metadata: Metadata = {
  title: "Admin Panel INH | Detail Distribusi Program",
};

export default async function page({ params }: { params: { id: number } }) {
  const detailProgram = await fetchDetailProgram(params.id);
  const dataKategori = await fetchDataKategori();
  const dataUserAdmin = await fetchDataUserAdmin();
  return (
    <div>
      <DetailProgram detailProgram={detailProgram} dataKategori={dataKategori} dataUserAdmin={dataUserAdmin} />
    </div>
  );
}

export const dynamic = "force-dynamic";
