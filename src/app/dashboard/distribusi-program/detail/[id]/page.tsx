import React from "react";
import { fetchDetailProgram } from "@/app/api/dataProgram/get/getDetailProgram";
import { Metadata } from "next";
import DetailProgram from "@/components/DistribusiProgram/detail-program";

export const metadata: Metadata = {
  title: "Admin Panel INH | Detail Distribusi Program",
};

export default async function page({ params }: { params: { id: number } }) {
  const detailProgram = await fetchDetailProgram(params.id);
  return (
    <div>
      <DetailProgram detailProgram={detailProgram} />
    </div>
  );
}

export const dynamic = "force-dynamic";
