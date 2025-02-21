import React from "react";
import Campign from "@/components/Campign";
import { fetchDataCampign } from "@/app/api/campign/get/getCampign";

export default async function page() {
  const dataCampign = await fetchDataCampign();
  return (
    <div>
      <Campign dataCampign={dataCampign} />
    </div>
  );
}

export const dynamic = "force-dynamic";
