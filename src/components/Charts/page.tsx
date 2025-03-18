"use client";

import ChartThree from "./ChartThree";
import DataTotal from "./DataTotal";

const Chart = ({ berandaCampaign, berandaBerita, berandaProgram }: { berandaCampaign: any; berandaBerita: any; berandaProgram: any }) => {
  return (
    <>
      <div className="w-full flex gap-5">
        <DataTotal berandaCampaign={berandaCampaign} berandaBerita={berandaBerita} berandaProgram={berandaProgram} />
        <ChartThree berandaCampaign={berandaCampaign} berandaBerita={berandaBerita} berandaProgram={berandaProgram} />
      </div>
    </>
  );
};

export default Chart;
