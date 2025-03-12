import React from "react";
import { Metadata } from "next";
import PageKerjaSama from "@/components/KerjaSama";

export const metadata: Metadata = {
  title: "Admin Panel INH | Kerja Sama",
};

export default async function page() {
  return <PageKerjaSama />;
}

export const dynamic = "force-dynamic";
