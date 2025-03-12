import React from "react";
import DetailCampaign from "../../../../../components/Campign/detail";
import { fetchDetailCampaign } from "@/app/api/campign/get/getDetailCampaign";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Panel INH | Detail Campaign",
};

export default async function page({ params }: { params: { id: number } }) {
  const detailCampaign = await fetchDetailCampaign(params.id);
  return (
    <div>
      <DetailCampaign detailCampaign={detailCampaign} />
    </div>
  );
}

export const dynamic = "force-dynamic";
