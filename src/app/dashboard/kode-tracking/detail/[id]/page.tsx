import React from "react";
import { fetchDetailProgram } from "@/app/api/dataProgram/get/getDetailProgram";
import { Metadata } from "next";
import DetailProgram from "@/components/DistribusiProgram/detail-program";
import DetailKode from "@/components/KodeTracking/detail-kode";

export const metadata: Metadata = {
  title: "Admin Panel INH | Detail Kode Tracking",
};

export default async function page({ params }: { params: { id: number } }) {
  const detailKode = await fetchDetailProgram(params.id);
  return (
    <div>
      <DetailKode detailKode={detailKode} />
    </div>
  );
}

export const dynamic = "force-dynamic";
