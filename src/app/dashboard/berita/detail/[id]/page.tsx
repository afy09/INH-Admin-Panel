import React from "react";
import { fetchDetailBerita } from "@/app/api/databerita/get/getDetailBerita";
import { Metadata } from "next";
import DetailBerita from "@/components/Berita/detail-berita";

export const metadata: Metadata = {
  title: "Admin Panel INH | Detail Berita",
};

export default async function page({ params }: { params: { id: number } }) {
  const detailBerita = await fetchDetailBerita(params.id);
  return (
    <div>
      <DetailBerita detailBerita={detailBerita} />
    </div>
  );
}

export const dynamic = "force-dynamic";
