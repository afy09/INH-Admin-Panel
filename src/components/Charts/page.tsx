"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import ChartTwo from "@/components/Charts/ChartTwo";
import React from "react";
import ChartThree from "./ChartThree";

const Chart: React.FC = () => {
  return (
    <>
      <Breadcrumb pageName="Chart" />

      <div className="grid grid-cols-12 gap-4 md:gap-6 2xl:gap-7.5">
        <ChartTwo />
        <ChartThree />
      </div>
    </>
  );
};

export default Chart;
