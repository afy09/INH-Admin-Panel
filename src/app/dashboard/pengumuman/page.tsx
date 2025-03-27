import React from "react";
import { Metadata } from "next";
import PagePengumuman from "@/components/Pengumuman/index";

export const metadata: Metadata = {
  title: "Admin Panel INH | Pengumuman",
};

export default async function page() {
  return <PagePengumuman />;
}

export const dynamic = "force-dynamic";
