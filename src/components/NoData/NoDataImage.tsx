import React from "react";
import Image from "next/image";

const NoDataImage = () => {
  return (
    <div className="flex flex-col my-6">
      <div className="flex justify-center">
        <Image width={350} height={350} src={"/images/logo/logo-nodataimage.svg"} alt="kosong" className="flex justify-center content-center" />
      </div>
      <div>
        <p className="text=[#404040] text-[20px] font-medium text-center">Belum Ada Ringkasan Data Terbaru</p>
        <p className="text=[#9B9B9B] text-[14px] text-center">Data terbaru belum tersedia saat ini</p>
      </div>
    </div>
  );
};

export default NoDataImage;
