"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { FaPlus } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import NoDataImage from "../NoData/NoDataImage";
import { TbFileExport } from "react-icons/tb";
import * as XLSX from "xlsx";

const TableBerita = ({ dataBerita, currentPage, lastPage, total_news, dataAllBerita }: { dataBerita: any; currentPage: number; lastPage: number; total_news: number; dataAllBerita: any }) => {
  const router = useRouter();
  const [showExportModal, setShowExportModal] = useState(false);
  const [exportLimit, setExportLimit] = useState<number>(dataAllBerita?.length || 0);
  const handlePageChange = (newPage: number) => {
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("page", newPage.toString());
    router.push(`?${urlParams.toString()}`);
  };

  const handleExport = () => {
    const exportData = dataAllBerita.slice(0, exportLimit).map((item: any, index: number) => ({
      No: index + 1,
      Judul: item.title,
      Kategori: item.category?.nama || "-",
      "Tanggal Dibuat": new Date(item.created_at).toLocaleDateString(),
    }));

    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Berita");
    XLSX.writeFile(wb, "data-berita.xlsx");

    setShowExportModal(false);
  };
  return (
    <div className="border rounded-t-2xl">
      <div className="flex justify-between mt-3">
        <h1 className="text-black-2 px-4 py-3 font-semibold text-xl">Berita</h1>

        <div className="flex ">
          <Link href="/dashboard/berita/tambah-kategori-berita">
            <div className="px-4 py-3">
              <button className="border border-primary px-6 py-2 text-primary rounded-lg flex justify-center gap-2 items-center">
                <FaPlus />
                Tambah Kategori
              </button>
            </div>
          </Link>

          <Link href="/dashboard/berita/tambah-berita">
            <div className="px-4 py-3">
              <button className="bg-amber-400 px-6 py-2 text-white rounded-lg flex justify-center gap-2 items-center">
                <FaPlus />
                Tambah Berita
              </button>
            </div>
          </Link>

          <div className="px-4 py-3">
            <button onClick={() => setShowExportModal(true)} className="bg-amber-400 px-6 py-2 text-white rounded-lg flex justify-center gap-2 items-center">
              <TbFileExport />
              Ekspor
            </button>
          </div>
        </div>
      </div>
      <div className="w-full">
        {dataBerita && dataBerita.length > 0 ? (
          <table className="w-full">
            <thead className="bg-amber-50 text-[#252525] font-light text-[14px] rounded-lg">
              <tr>
                <th className="font-normal p-3">No</th>
                <th className="font-normal p-3">Judul</th>
                <th className="font-normal p-3">Banner</th>
                <th className="font-normal p-3">Kategori</th>
                <th className="font-normal p-3">Dilihat</th>
                <th className="font-normal p-3">Tanggal Dibuat</th>
                <th className="font-normal p-3">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {dataBerita.map((member: any, index: number) => (
                <tr key={member.id} className="text-center text-black-2 text-[13px] border">
                  <td className="p-3">{index + 1}</td>
                  <td className="p-3 max-w-30 truncate cursor-pointer" title={member?.title}>
                    {member.title}
                  </td>
                  <td className="p-3 flex justify-center">
                    <img src={member.image} alt="inh-news" className="w-20 h-auto" />
                  </td>
                  <td className="p-3 capitalize">{member.category?.nama}</td>
                  <td className="p-3 capitalize">{member.views_count}</td>
                  <td className="p-3">{new Date(member.created_at).toLocaleDateString()}</td>
                  <td className="p-3 text-amber-700 ">
                    <Link href={`/dashboard/berita/detail/${member?.id}`}>Detail</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <NoDataImage />
        )}
      </div>

      {dataBerita && dataBerita.length > 0 && (
        <div className="flex justify-end items-center mt-6 mb-3 me-2 text-[12px]">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage <= 1}
            className={`px-4 py-2 mx-1 rounded ${currentPage <= 1 ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-primary text-white cursor-pointer"}`}>
            Prev
          </button>
          <span className="px-4 py-2 mx-1 text-primary border border-primary rounded">{`Page ${currentPage} of ${lastPage}`}</span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage >= lastPage}
            className={`px-4 py-2 mx-1 rounded  ${currentPage >= lastPage ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-primary text-white cursor-pointer"}`}>
            Next
          </button>
        </div>
      )}

      {showExportModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-999999">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <h2 className="text-lg font-semibold mb-4">Ekspor Data Berita</h2>
            <label className="block text-sm mb-2">Jumlah data yang ingin diekspor:</label>
            <input type="number" value={exportLimit} onChange={(e) => setExportLimit(Number(e.target.value))} className="border border-gray-300 rounded p-2 w-full mb-4" placeholder="Masukkan jumlah data" />
            <div className="mb-2">Jumlah data yang tersedia : {total_news}</div>
            <div className="flex justify-end gap-2">
              <button onClick={() => setShowExportModal(false)} className="px-4 py-2 rounded bg-gray-300 text-black">
                Batal
              </button>
              <button onClick={handleExport} className="px-4 py-2 rounded bg-amber-400 text-white">
                Ekspor
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TableBerita;
