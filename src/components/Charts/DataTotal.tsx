import React from "react";
import { SiGooglecampaignmanager360 } from "react-icons/si";
import { FaDiagramProject } from "react-icons/fa6";
import { IoNewspaperOutline } from "react-icons/io5";

const DataTotal = ({ berandaCampaign, berandaBerita, berandaProgram }: { berandaCampaign: any; berandaBerita: any; berandaProgram: any }) => {
  return (
    <>
      <div className="flex flex-col gap-4 w-full">
        <div className="border rounded-3xl py-3 px-7 text-black-2 w-full">
          <h1 className="">Total Campaign</h1>
          <div className="text-[40px] mt-5 mb-3 font-semibold">{berandaCampaign?.total_campaigns}</div>
        </div>

        <div className="border rounded-3xl py-3 px-7 text-black-2 w-full">
          <h1 className="">Total Berita</h1>
          <div className="text-[40px] mt-5 mb-3 font-semibold">{berandaBerita?.total_news}</div>
        </div>

        <div className="border rounded-3xl py-3 px-7 text-black-2 w-full">
          <h1 className="">Total Daftar Program</h1>
          <div className="text-[40px] mt-5 mb-3 font-semibold">{berandaProgram?.total_programs}</div>
        </div>
      </div>
    </>
  );
};

export default DataTotal;
