"use client";
import React, { useRef, useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import InvoiceTemplate from "./invoicePDFuser";
import NoDataImage from "../NoData/NoDataImage";
import { FiFilter, FiX, FiRefreshCcw } from "react-icons/fi";
import { syncDataAction } from "@/app/actions/syncData";

const TableTransaksiUser = ({ dataTransaksi, currentPage, lastPage }: { dataTransaksi: any[]; currentPage: number; lastPage: number }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedTransaksi, setSelectedTransaksi] = useState<any | null>(null);
  const invoiceRef = useRef<HTMLDivElement>(null);
  const [showFilter, setShowFilter] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleSync = () => {
    startTransition(async () => {
      const result = await syncDataAction();
      if (!result.success) {
        alert(result.message);
      } else {
        alert("✅ Sinkronisasi berhasil!");
        console.log(result.data); // lihat hasil kalau mau
      }
    });
  };

  // 🔢 Pagination
  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage.toString());
    router.push(`?${params.toString()}`);
  };

  // 🔍 Search
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("search", e.target.value);
    params.set("page", "1");
    router.push(`?${params.toString()}`);
  };

  // 📅 Filter tanggal
  const handleDateChange = (field: "start_date" | "end_date", value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set(field, value);
    else params.delete(field);
    params.set("page", "1");
    router.push(`?${params.toString()}`);
  };

  // 💰 Urutkan nominal
  const handleSort = (order: "asc" | "desc") => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("sort_credit", order);
    router.push(`?${params.toString()}`);
  };

  // ❌ Clear All Filter
  const handleClearAll = () => {
    router.push("?page=1&limit=10"); // reset ke default
  };

  // 🧾 Cetak PDF
  const handleCetakPDF = async () => {
    if (!invoiceRef.current) return;
    const canvas = await html2canvas(invoiceRef.current);
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save(`invoice-${selectedTransaksi.id}.pdf`);
  };

  return (
    <div className="relative">
      {/* 🔍 Search, Filter & Sync Bar */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        {/* 🔍 Search Input */}
        <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 w-full sm:w-80 shadow-sm">
          <input type="text" placeholder="Cari nama atau email..." onChange={handleSearch} defaultValue={searchParams.get("search") || ""} className="w-full outline-none bg-transparent text-sm" />
        </div>

        {/* 🧭 Filter Button */}
        <button onClick={() => setShowFilter((prev) => !prev)} className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/80 transition">
          <FiFilter />
          <span className="text-sm font-medium">Filter</span>
        </button>

        {/* 🔁 Sync Button */}
        <button onClick={handleSync} disabled={isPending} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50">
          {isPending ? "Sinkronisasi..." : "Sinkronkan Data"}
        </button>
      </div>

      {/* 🌟 Dropdown Filter Popover */}
      {showFilter && (
        <div className="absolute z-20 bg-white border rounded-lg shadow-lg p-5 top-14 left-0 w-full sm:w-[400px] animate-fadeIn">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-semibold text-gray-700 text-sm">Filter Transaksi</h3>
            <button onClick={() => setShowFilter(false)} className="text-gray-500 hover:text-gray-700">
              <FiX />
            </button>
          </div>

          <div className="space-y-4">
            {/* 📅 Filter Tanggal */}
            <div className="flex flex-col sm:flex-row gap-3">
              <input type="date" onChange={(e) => handleDateChange("start_date", e.target.value)} defaultValue={searchParams.get("start_date") || ""} className="border px-3 py-2 rounded-lg w-full text-sm" />
              <input type="date" onChange={(e) => handleDateChange("end_date", e.target.value)} defaultValue={searchParams.get("end_date") || ""} className="border px-3 py-2 rounded-lg w-full text-sm" />
            </div>

            {/* 💰 Sort Nominal */}
            <div className="flex gap-3">
              <button
                onClick={() => handleSort("asc")}
                className={`flex-1 px-3 py-2 rounded-lg border text-sm ${searchParams.get("sort_credit") === "asc" ? "bg-primary text-white border-primary" : "bg-gray-50 text-gray-700 hover:bg-gray-100"}`}>
                Nominal Terkecil
              </button>
              <button
                onClick={() => handleSort("desc")}
                className={`flex-1 px-3 py-2 rounded-lg border text-sm ${searchParams.get("sort_credit") === "desc" ? "bg-primary text-white border-primary" : "bg-gray-50 text-gray-700 hover:bg-gray-100"}`}>
                Nominal Terbesar
              </button>
            </div>

            {/* ❌ Clear All */}
            <button onClick={handleClearAll} className="w-full bg-red-500 text-white px-3 py-2 rounded-lg hover:bg-red-600 text-sm mt-2">
              Hapus Semua Filter
            </button>
          </div>
        </div>
      )}

      {/* 📋 Table */}
      <div className="w-full mt-3">
        {dataTransaksi?.length ? (
          <div className="max-w-full overflow-x-auto rounded-lg border shadow-sm">
            <table className="w-full text-sm">
              <thead className="bg-amber-50 text-[#252525]">
                <tr>
                  <th className="font-normal p-3">No</th>
                  <th className="font-normal p-3">Nama</th>
                  <th className="font-normal p-3">Email</th>
                  <th className="font-normal p-3">No Telepon</th>
                  <th className="font-normal p-3">Jumlah</th>
                  <th className="font-normal p-3">Program</th>
                  <th className="font-normal p-3">Tanggal</th>
                  <th className="font-normal p-3">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {dataTransaksi.map((member: any, index: number) => (
                  <tr key={member.id} className="text-center border-t hover:bg-gray-50">
                    <td className="p-3">{index + 1}</td>
                    <td className="p-3">{member.customer_name?.length > 12 ? member.customer_name.slice(0, 12) + "..." : member.customer_name}</td>
                    <td className="p-3">{member.customer_email?.length > 12 ? member.customer_email.slice(0, 12) + "..." : member.customer_email}</td>
                    <td className="p-3 truncate">{member.customer_mobile}</td>
                    <td className="p-3 text-green-700 font-medium">
                      {member.credit.toLocaleString("id-ID", {
                        style: "currency",
                        currency: "IDR",
                      })}
                    </td>
                    <td className="p-3">{member.payment_link_name?.length > 12 ? member.payment_link_name.slice(0, 12) + "..." : member.payment_link_name}</td>
                    <td className="p-3">
                      {new Date(member.created_at).toLocaleDateString("id-ID", {
                        timeZone: "Asia/Jakarta",
                      })}
                    </td>

                    <td className="p-3 text-primary font-semibold cursor-pointer">
                      <button onClick={() => setSelectedTransaksi(member)}>Detail</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <NoDataImage />
        )}
      </div>

      {/* 🔢 Pagination */}
      {dataTransaksi?.length > 0 && (
        <div className="flex justify-end mt-4 text-sm">
          <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage <= 1} className={`px-3 py-1 rounded ${currentPage <= 1 ? "bg-gray-300 cursor-not-allowed" : "bg-primary text-white hover:bg-primary/80"}`}>
            Prev
          </button>
          <span className="px-4 py-2">{`Page ${currentPage}`}</span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage >= lastPage}
            className={`px-3 py-1 rounded ${currentPage >= lastPage ? "bg-gray-300 cursor-not-allowed" : "bg-primary text-white hover:bg-primary/80"}`}>
            Next
          </button>
        </div>
      )}

      {/* 🧾 Modal Invoice */}
      {selectedTransaksi && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-99999">
          <div className="bg-white rounded-lg p-6 relative w-[90%] max-w-md shadow-lg">
            <button className="absolute top-2 right-3 text-gray-500 hover:text-gray-700" onClick={() => setSelectedTransaksi(null)}>
              ×
            </button>
            <h2 className="text-lg font-semibold mb-4">Detail Transaksi</h2>
            <div className="text-sm space-y-2">
              <div className="flex justify-between">
                <strong>Nama</strong> {selectedTransaksi.customer_name}
              </div>
              <div className="flex justify-between">
                <strong>No Telepon</strong> {selectedTransaksi.customer_mobile}
              </div>
              <div className="flex justify-between">
                <strong>Email</strong> {selectedTransaksi.customer_email}
              </div>
              <div className="flex justify-between">
                <strong>Program</strong> {selectedTransaksi.payment_link_name}
              </div>
              <div className="flex justify-between">
                <strong>Jumlah</strong>{" "}
                {selectedTransaksi.credit.toLocaleString("id-ID", {
                  style: "currency",
                  currency: "IDR",
                })}
              </div>
              <div className="flex justify-end">
                <button onClick={handleCetakPDF} className="bg-primary text-white px-3 py-2 rounded-lg mt-3 hover:bg-primary/80">
                  Cetak PDF
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div style={{ position: "absolute", left: "-9999px" }}>
        <InvoiceTemplate ref={invoiceRef} transaksi={selectedTransaksi} />
      </div>
    </div>
  );
};

export default TableTransaksiUser;
