"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { FaPlus } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import NoDataImage from "../NoData/NoDataImage";

const TableDistribusi = ({ dataProgram, currentPage, lastPage }: { dataProgram: any; currentPage: number; lastPage: number }) => {
  const router = useRouter();
  const handlePageChange = (newPage: number) => {
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("page", newPage.toString());
    router.push(`?${urlParams.toString()}`);
  };
  return (
    <div className="border rounded-t-2xl">
      <div className="flex justify-between mt-3">
        <h1 className="text-black-2 px-4 py-3 font-semibold text-xl">Distribusi Program</h1>

        <div className="flex ">
          <Link href="/dashboard/distribusi-program/tambah-kategori-program">
            <div className="px-4 py-3">
              <button className="border border-primary px-6 py-2 text-primary rounded-lg flex justify-center gap-2 items-center">
                <FaPlus />
                Tambah Kategori
              </button>
            </div>
          </Link>

          <Link href="/dashboard/distribusi-program/tambah-program">
            <div className="px-4 py-3">
              <button className="bg-amber-400 px-6 py-2 text-white rounded-lg flex justify-center gap-2 items-center">
                <FaPlus />
                Tambah Distribusi
              </button>
            </div>
          </Link>
        </div>
      </div>
      <div className="w-full">
        {dataProgram && dataProgram.length > 0 ? (
          <table className="w-full">
            <thead className="bg-amber-50 text-[#252525] font-light text-[14px] rounded-lg">
              <tr>
                <th className="font-normal p-3">No</th>
                <th className="font-normal p-3">Judul</th>
                <th className="font-normal p-3">Banner</th>
                <th className="font-normal p-3">Kategori</th>
                <th className="font-normal p-3">Tanggal Dibuat</th>
                <th className="font-normal p-3">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {dataProgram.map((member: any, index: number) => (
                <tr key={member.id} className="text-center text-black-2 text-[13px] border">
                  <td className="p-3">{index + 1}</td>
                  <td className="p-3 max-w-30 truncate cursor-pointer" title={member?.title}>
                    {member.title}
                  </td>
                  <td className="p-3 flex justify-center">
                    <img src={member.image} alt="distribusi" className="w-20 h-auto" />
                  </td>
                  <td className="p-3 capitalize">{member.category?.nama}</td>
                  <td className="p-3">{new Date(member.created_at).toLocaleDateString()}</td>
                  <td className="p-3 text-amber-700 ">
                    <Link href={`/dashboard/distribusi-program/detail/${member?.id}`}>Detail</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <NoDataImage />
        )}
      </div>

      {dataProgram && dataProgram.length > 0 && (
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
    </div>
  );
};

export default TableDistribusi;
