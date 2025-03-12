import React from "react";
import { fetchDataMedia } from "@/app/api/datakerjasama/media/get/getMedia";
import { Metadata } from "next";
import TambahLembaga from "@/components/KerjaSama/Lembaga/tambah-lembaga";

export const metadata: Metadata = {
  title: "Admin Panel INH | Kerja Sama - Tambah Media",
};

export default async function page() {
  const dataMedia = await fetchDataMedia();
  return (
    <>
      <TambahLembaga />
    </>
  );
}

export const dynamic = "force-dynamic";
