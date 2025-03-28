"use client";
import { ApexOptions } from "apexcharts";
import React from "react";
import ReactApexChart from "react-apexcharts";

const options: ApexOptions = {
  chart: {
    fontFamily: "Satoshi, sans-serif",
    type: "donut",
  },
  colors: ["#700e01", "#ffd22b", "#feb204"],
  legend: {
    show: false,
  },
  labels: ["Campaign", "Berita", "Daftar Program"],
  tooltip: {
    y: {
      formatter: function (val) {
        return val.toString();
      },
    },
  },

  plotOptions: {
    pie: {
      donut: {
        size: "65%",
        labels: {
          show: false,
        },
      },
    },
  },
  dataLabels: {
    enabled: false,
  },
};

const ChartWithLegend = ({ berandaCampaign, berandaBerita, berandaProgram }: { berandaCampaign: any; berandaBerita: any; berandaProgram: any }) => {
  const total = (berandaCampaign?.total_campaigns || 0) + (berandaBerita?.total_news || 0) + (berandaProgram?.total_programs || 0);

  const series = total > 0 ? [Math.round(((berandaCampaign?.total_campaigns || 0) / total) * 100), Math.round(((berandaBerita?.total_news || 0) / total) * 100), Math.round(((berandaProgram?.total_programs || 0) / total) * 100)] : [0, 0, 0];
  return (
    <div className="col-span-12 rounded-xl border border-stroke bg-white p-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:p-8 xl:col-span-5 w-full">
      <h5 className="text-base md:text-xl font-semibold text-black dark:text-white mb-4 text-center">Persentase Keseluruhan</h5>

      <div className="relative flex flex-col items-center justify-center">
        {/* Border abu-abu yang disesuaikan ukurannya agar tepat di dalam donut */}
        <div className="absolute rounded-full border-[4px] border-gray-200 bg-transparent w-[112px] h-[112px]"></div>
        <div className="absolute text-center text-2xl font-bold text-black dark:text-white">100%</div>
        {/* Chart */}
        <ReactApexChart options={options} series={series} type="donut" width={250} />

        {/* Legend di bawah chart */}
      </div>
      <div className="flex justify-between flex-col gap-3 mt-4 text-sm">
        <div className="flex items-center ">
          <span className="w-3 h-3 bg-[#700e01] rounded-full mr-2"></span>
          <span className="text-black dark:text-white md:text-lg">Campaign</span>
          <span className=" border-gray-100 border-[3px] rounded-full w-[40%] mx-auto"></span>
          <span className="font-semibold ml-2 ms-auto md:text-lg">{series[0]} %</span>
        </div>
        <div className="flex items-center ">
          <span className="w-3 h-3 bg-[#ffd22b] rounded-full mr-2"></span>
          <span className="text-black dark:text-white md:text-lg">Berita</span>
          <span className=" border-gray-100 border-[3px] rounded-full w-[40%] mx-auto"></span>
          <span className="font-semibold ml-2 ms-auto md:text-lg">{series[1]} %</span>
        </div>
        <div className="flex items-center">
          <span className="w-3 h-3 bg-[#feb204] rounded-full mr-2"></span>
          <span className="text-black dark:text-white md:text-lg">Daftar Program</span>
          <span className=" border-gray-100 border-[3px] rounded-full w-[40%] mx-auto"></span>
          <span className="font-semibold ml-2 ms-auto md:text-lg">{series[2]} %</span>
        </div>
      </div>
    </div>
  );
};

export default ChartWithLegend;
