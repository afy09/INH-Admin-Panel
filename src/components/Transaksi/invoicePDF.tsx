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
  const nama = transaksi?.customer?.name ?? "-";
  const jumlah = transaksi?.credit ?? 0;
  const terbilang = toTerbilang(jumlah).trim() + " rupiah";
  const tanggal = new Date(transaksi?.createdAt).toLocaleDateString("id-ID");
  const program = transaksi?.paymentLink?.name ?? "-";

  return (
    <div ref={ref} className="w-[700px] h-[400px] border border-black p-8 font-serif text-black bg-white text-[16px] leading-relaxed">
      <div className="text-center text-[20px] font-bold mb-6">KWITANSI</div>

      <div className="mb-4">
        <div>
          Nama: <strong className="uppercase">{nama}</strong>
        </div>
        <div>
          Tanggal: <strong>{tanggal}</strong>
        </div>
        <div>
          Jumlah: <strong>Rp {jumlah.toLocaleString("id-ID")}</strong>
        </div>
      </div>

      <div className="mb-4">
        Terbilang: <em className="capitalize">{terbilang}</em>
      </div>

      <div className="mb-8">
        Program Donasi: <strong className="capitalize">{program}</strong>
      </div>

      <div className="text-right mt-12">
        <div>Hormat Kami,</div>
        <div className="mt-16">Admin</div>
      </div>
    </div>
  );
});

InvoiceTemplate.displayName = "InvoiceTemplate";
export default InvoiceTemplate;
