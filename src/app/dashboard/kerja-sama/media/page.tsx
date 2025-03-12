import React from "react";
import TableMedia from "@/components/KerjaSama/Media/table-media";
import { fetchDataMedia } from "@/app/api/datakerjasama/media/get/getMedia";
import { Metadata } from "next";
import PageKerjaSama from "@/components/KerjaSama";

export const metadata: Metadata = {
  title: "Admin Panel INH | Kerja Sama - Media",
};

export default async function page() {
  const dataMedia = await fetchDataMedia();
  return (
    <div className="border rounded-lg">
      <PageKerjaSama />
      <TableMedia dataMedia={dataMedia} />
    </div>
  );
}

export const dynamic = "force-dynamic";
