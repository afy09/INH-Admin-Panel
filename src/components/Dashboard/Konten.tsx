"use client";
import React from "react";

import dynamic from "next/dynamic";
import { IconBeranda, IconTransaksi, IconUsers } from "./icons";
import Breadcrumb from "../Breadcrumbs/Breadcrumb";
const CardDataStats = dynamic(() => import("@/components/CardDataStats"), {
  ssr: false,
});
const ChartThree = dynamic(() => import("@/components/Charts/ChartThree"), {
  ssr: false,
});
const ChartTwo = dynamic(() => import("../Charts/ChartTwo"), {
  ssr: false,
});

const KontenDashboard: React.FC = () => {
  return (
    <>
      <Breadcrumb pageName="Beranda" />
      <div className="flex items-center rounded-xl w-full shadow-1  px-7 py-8 mb-4 dark:bg-[#1B1B24] dark:bg-opacity-30 md:py-2 md:px-2">
        <div className="mr-2 flex h-16 w-24  items-center justify-center rounded-lg ">
          <IconBeranda />
        </div>
        <div className="w-full">
          <h5 className=" text-sm md:text-xl font-bold text-primarydark">
            Selamat datang di dashboard Admin
          </h5>
          <p className="leading-relaxed md:text-base text-[11px] font-light text-gray-500">
            Mulai kelola semua transaksi dalam satu dashboard dengan mudah dan
            efiesien.
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1  gap-4 md:grid-cols-3 md:gap-6 xl:grid-cols-3 2xl:gap-7.5">
        <CardDataStats
          title="Total Pengajuan Data"
          total="300"
          rate="0.43%"
          levelUp
        >
          <IconUsers />
        </CardDataStats>

        <CardDataStats
          title="Total Pengajuan Bisnis"
          total="2.450"
          rate="2.59%"
          levelUp
        >
          <IconUsers />
        </CardDataStats>
        <CardDataStats
          title="Transaksi Hari Ini"
          total="Rp. 500.000.000"
          rate="0.95%"
          levelDown
        >
          <IconTransaksi />
        </CardDataStats>
      </div>

      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <ChartTwo />
        <ChartThree />
      </div>
    </>
  );
};

export default KontenDashboard;
