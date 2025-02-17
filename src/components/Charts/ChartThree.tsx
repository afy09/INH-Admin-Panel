"use client";
import { ApexOptions } from "apexcharts";
import React from "react";
import ReactApexChart from "react-apexcharts";

const options: ApexOptions = {
  chart: {
    fontFamily: "Satoshi, sans-serif",
    type: "donut",
  },
  colors: ["#464646", "#FAC0BB", "#F03524", "#991C1C"],
  legend: {
    show: false,
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

const ChartWithLegend: React.FC = () => {
  const series = [30, 40, 20, 10]; // Data sesuai dengan nilai persentase

  return (
    <div className="col-span-12 rounded-xl border border-stroke bg-white p-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:p-8 xl:col-span-5">
      <h5 className="text-base md:text-xl font-semibold text-black dark:text-white mb-4 text-center">Rata-Rata Metode Transaksi Mitra</h5>

      <div className="relative flex flex-col items-center justify-center">
        {/* Border abu-abu yang disesuaikan ukurannya agar tepat di dalam donut */}
        <div className="absolute rounded-full border-[4px] border-gray-200 bg-transparent w-[112px] h-[112px]"></div>
        <div className="absolute text-center text-2xl font-bold text-black dark:text-white">100%</div>
        {/* Chart */}
        <ReactApexChart options={options} series={series} type="donut" width={250} />

        {/* Legend di bawah chart */}
      </div>
      <div className="flex justify-between flex-col gap-2 mt-4 text-sm">
        <div className="flex items-center ">
          <span className="w-3 h-3 bg-[#464646] rounded-full mr-2"></span>
          <span className="text-black dark:text-white md:text-lg">Payment</span>
          <span className=" border-gray-100 border-[3px] rounded-full w-[40%] mx-auto"></span>
          <span className="font-semibold ml-2 ms-auto md:text-lg">30%</span>
        </div>
        <div className="flex items-center ">
          <span className="w-3 h-3 bg-[#FAC0BB] rounded-full mr-2"></span>
          <span className="text-black dark:text-white md:text-lg">Transfer</span>
          <span className=" border-gray-100 border-[3px] rounded-full w-[40%] mx-auto"></span>
          <span className="font-semibold ml-2 ms-auto md:text-lg">40%</span>
        </div>
        <div className="flex items-center">
          <span className="w-3 h-3 bg-[#F03524] rounded-full mr-2"></span>
          <span className="text-black dark:text-white md:text-lg">Top up</span>
          <span className=" border-gray-100 border-[3px] rounded-full w-[40%] mx-auto"></span>
          <span className="font-semibold ml-2 ms-auto md:text-lg">20%</span>
        </div>
        <div className="flex  items-center">
          <span className="w-3 h-3 bg-[#991C1C] rounded-full mr-2"></span>
          <span className="text-black dark:text-white md:text-lg">Scan QRIS</span>
          <span className=" border-gray-100 border-[3px] rounded-full w-[40%] mx-auto"></span>
          <span className="font-semibold ml-2 ms-auto md:text-lg">10%</span>
        </div>
      </div>
    </div>
  );
};

export default ChartWithLegend;
