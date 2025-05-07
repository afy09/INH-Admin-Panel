"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { FaPlus } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import NoDataImage from "../NoData/NoDataImage";

const TableDonatur = ({ dataBerita, currentPage, lastPage }: { dataBerita: any; currentPage: number; lastPage: number }) => {
  const router = useRouter();
  const handlePageChange = (newPage: number) => {
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("page", newPage.toString());
    router.push(`?${urlParams.toString()}`);
  };
  return (
    <div className="border rounded-t-2xl">
      <div className="flex justify-between mt-3">
        <h1 className="text-black-2 px-4 py-3 font-semibold text-xl">Donatur</h1>
      </div>
      <div className="w-full">
        {dataBerita && dataBerita.length > 0 ? (
          <table className="w-full">
            <thead className="bg-amber-50 text-[#252525] font-light text-[14px] rounded-lg">
              <tr>
                <th className="font-normal p-3">No</th>
                <th className="font-normal p-3">Nama</th>
                <th className="font-normal p-3">Email</th>
                <th className="font-normal p-3">No Telepon</th>
                <th className="font-normal p-3">Tanggal Transaksi</th>
              </tr>
            </thead>
            <tbody>
              {dataBerita.map((member: any, index: number) => (
                <tr key={member.id} className="text-center text-black-2 text-[13px] border">
                  <td className="p-3">{index + 1}</td>
                  <td className="p-3 max-w-30 truncate cursor-pointer">{member.name}</td>
                  <td className="p-3 capitalize">{member.email}</td>
                  <td className="p-3 capitalize">{member.mobile}</td>
                  <td className="p-3">{new Date(member.createdAt).toLocaleDateString()}</td>
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
    </div>
  );
};

export default TableDonatur;
