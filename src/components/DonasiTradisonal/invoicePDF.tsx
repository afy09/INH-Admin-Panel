import React, { forwardRef } from "react";

const toTerbilang = (angka: number): string => {
  const satuan = ["", "satu", "dua", "tiga", "empat", "lima", "enam", "tujuh", "delapan", "sembilan", "sepuluh", "sebelas"];
  if (angka < 12) return satuan[angka];
  if (angka < 20) return `${toTerbilang(angka - 10)} belas`;
  if (angka < 100) return `${toTerbilang(Math.floor(angka / 10))} puluh ${toTerbilang(angka % 10)}`;
  if (angka < 200) return `seratus ${toTerbilang(angka - 100)}`;
  if (angka < 1000) return `${toTerbilang(Math.floor(angka / 100))} ratus ${toTerbilang(angka % 100)}`;
  if (angka < 2000) return `seribu ${toTerbilang(angka - 1000)}`;
  if (angka < 1000000) return `${toTerbilang(Math.floor(angka / 1000))} ribu ${toTerbilang(angka % 1000)}`;
  return `${angka}`;
};

const InvoiceTemplate = forwardRef<HTMLDivElement, { transaksi: any }>(({ transaksi }, ref) => {
  const nama = transaksi?.nama ?? "-";
  const jumlah = transaksi?.nominal ?? 0;
  const terbilang = toTerbilang(jumlah).trim() + " rupiah";
  const tanggal = new Date(transaksi?.tanggal ?? new Date()).toLocaleDateString("id-ID");
  const program = transaksi?.tujuan_donasi ?? "-";

  return (
    <div ref={ref} className="relative w-[800px] h-[1140px]">
      {/* Background full image */}
      <img src="/images/product/kwitansi_inh.png" alt="Kwitansi Background" className="absolute top-0 left-0 w-full h-full object-cover" />

      {/* Nama Donatur */}
      <div className="absolute top-[435px] left-[150px]  text-[30px] font-bold uppercase text-blue-950">{nama}</div>

      {/* Tanggal */}
      <div className="absolute top-[510px] left-[180px] text-white z-999999">{tanggal}</div>

      {/* Nominal */}
      <div className="absolute top-[525px] left-[330px] text-white text-[50px] z-999999">{jumlah.toLocaleString("id-ID")}</div>

      {/* Terbilang */}
      <div className="absolute top-[598px] left-[300px]  text-black-2 text-[20px]  italic">{terbilang}</div>

      {/* Program Donasi */}
      <div className="absolute top-[630px] left-[375px]  text-black-2 text-[20px]">{program}</div>
    </div>
  );
});

InvoiceTemplate.displayName = "InvoiceTemplate";
export default InvoiceTemplate;
