import React from "react";
import Campign from "@/components/Campign";
import { fetchDataCampign } from "@/app/api/campign/get/getCampign";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Panel INH | Campaign",
};

export default async function page({ searchParams }: { searchParams: { page?: string; limit?: string } }) {
  const page = Number(searchParams.page);
  const limit = Number(searchParams.limit);
  const dataCampign = await fetchDataCampign({ page, limit });
  return (
    <div>
      <Campign dataCampign={dataCampign.data} currentPage={dataCampign.current_page} lastPage={dataCampign.last_page} />
    </div>
  );
}

export const dynamic = "force-dynamic";
