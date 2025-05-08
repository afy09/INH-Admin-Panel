import React from "react";

export default function page() {
  return (
    <div className="relative w-[800px] h-[1150px]">
      {/* Background image */}
      <img src="/images/product/kwitansi_inh.png" alt="Kwitansi Background" className="absolute top-0 left-0 w-full h-full object-cover" />

      {/* Data absolute positioned */}
      <div className="absolute top-[445px]  left-[150px] text-[30px] font-bold uppercase text-blue-950">Bayu Gema Satria</div>

      <div className="absolute top-[510px] left-[180px]  text-black-2  rounded z-999999">02/04/2025</div>

      <div className="absolute top-[525px] left-[330px]  text-black text-[50px] rounded z-999999">100000</div>

      <div className="absolute top-[595px] left-[300px]  text-black text-[20px]  italic">Satu Juta Rupiah</div>

      <div className="absolute top-[620px] left-[375px]  text-black text-[20px]  ">Bantuan Untuk Gaza</div>
    </div>
  );
}
