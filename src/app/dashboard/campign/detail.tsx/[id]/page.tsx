import React from "react";
import DetailCampaign from "../../../../../components/Campign/detail";

export default function page({ params }: { params: { id: number } }) {
  return (
    <div>
      <DetailCampaign />
    </div>
  );
}
