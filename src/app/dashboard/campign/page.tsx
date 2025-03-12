import React from "react";
import Campign from "@/components/Campign";
import { fetchDataCampign } from "@/app/api/campign/get/getCampign";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Panel INH | Campaign",
};

export default async function page() {
  const dataCampign = await fetchDataCampign();
  return (
    <div>
      <Campign dataCampign={dataCampign} />
    </div>
  );
}

export const dynamic = "force-dynamic";
