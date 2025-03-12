import React from "react";
import { fetchDataMedia } from "@/app/api/datakerjasama/media/get/getMedia";
import { Metadata } from "next";
import TambahMedia from "@/components/KerjaSama/Media/tambah-media";

export const metadata: Metadata = {
  title: "Admin Panel INH | Kerja Sama - Tambah Media",
};

export default async function page() {
  const dataMedia = await fetchDataMedia();
  return (
    <>
      <TambahMedia />
    </>
  );
}

export const dynamic = "force-dynamic";
