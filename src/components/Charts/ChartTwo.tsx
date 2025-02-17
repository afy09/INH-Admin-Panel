import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

const ChartTwo: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const salesData = [44, 55, 41, 67, 22, 43, 65, 200, 41, 67, 22, 43];

  const options: ApexOptions = {
    chart: {
      fontFamily: "Poppins",
      type: "bar",
      height: 335,
      stacked: true,
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
      events: {
        dataPointSelection: (config) => {
          setActiveIndex(config.dataPointIndex);
        },
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        borderRadius: 7,
        columnWidth: "40%",
        dataLabels: {
          position: "top",
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "Mei",
        "Jun",
        "Jul",
        "Agu",
        "Sep",
        "Okt",
        "Nov",
        "Des",
      ],
      labels: {
        style: {
          fontSize: "14px",
          colors: salesData.map((_, index) =>
            index === activeIndex ? "#AFAFAF" : "#F03524"
          ),
        },
      },
    },
    yaxis: {
      show: false,
    },
    fill: {
      opacity: 1,
      colors: salesData.map((_, index) =>
        index === activeIndex ? "#FEEBE9" : "#F03524"
      ),
    },
    tooltip: {
      enabled: true,
      y: {
        formatter: function (val) {
          return val + " jt";
        },
      },
      marker: {
        show: false,
      },
    },
    legend: {
      show: false,
    },
    states: {
      normal: {
        filter: {
          type: "none",
        },
      },
      hover: {
        filter: {
          type: "none",
        },
      },
      active: {
        allowMultipleDataPointsSelection: false,
        filter: {
          type: "none",
        },
      },
    },
  };

  return (
    <div className="col-span-12 rounded-xl border border-stroke bg-white p-7.5 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-7">
      <div className="mb-4 justify-between gap-4 sm:flex">
        <div>
          <h4 className="text-xl font-semibold text-black dark:text-white">
            Total Transaksi
          </h4>
          <p className="text-base text-gray-500 dark:text-white flex items-center gap-4">
            Rp. 200.000.000
            <span className="text-red-500 bg-red-100 px-2 py-1 rounded-full">
              +12%
            </span>
          </p>
        </div>
      </div>

      <div>
        <div id="chartTwo" className="-mb-9 -ml-5">
          <ReactApexChart
            options={options}
            series={[{ name: "Transaksi", data: salesData }]}
            type="bar"
            height={350}
            width={"100%"}
          />
        </div>
      </div>
    </div>
  );
};

export default ChartTwo;
