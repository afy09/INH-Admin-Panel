import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

const ChartTwo: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const salesData = [44, 55, 41, 67, 22, 43, 65, 200, 41, 67, 22, 43];

  return (
    <div className="col-span-12 rounded-xl border border-stroke bg-white p-7.5 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-7">
      <div className="mb-4 justify-between gap-4 sm:flex">
        <div>
          <h4 className="text-xl font-semibold text-black dark:text-white">Total Transaksi</h4>
          <p className="text-base text-gray-500 dark:text-white flex items-center gap-4">
            Rp. 200.000.000
            <span className="text-red-500 bg-red-100 px-2 py-1 rounded-full">+12%</span>
          </p>
        </div>
      </div>

      <div>
        <div id="chartTwo" className="-mb-9 -ml-5"></div>
      </div>
    </div>
  );
};

export default ChartTwo;
