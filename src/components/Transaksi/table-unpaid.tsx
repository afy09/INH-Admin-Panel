"use client";
import React, { useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import NoDataImage from "../NoData/NoDataImage";

const TableTransaksiUnpaid = ({ dataTransaksi, currentPage, lastPage }: { dataTransaksi: any; currentPage: number; lastPage: number }) => {
  const router = useRouter();
  const [selectedTransaksi, setSelectedTransaksi] = useState<any | null>(null);
  const handlePageChange = (newPage: number) => {
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("page", newPage.toString());
    router.push(`?${urlParams.toString()}`);
  };

  const closeModal = () => setSelectedTransaksi(null);

  return (
    <div className="">
      <div className="w-full">
        {dataTransaksi && dataTransaksi.length > 0 ? (
          <table className="w-full">
            <thead className="bg-amber-50 text-[#252525] font-light text-[14px] rounded-lg">
              <tr>
                <th className="font-normal p-3">No</th>
                <th className="font-normal p-3">Nama</th>
                <th className="font-normal p-3">Email</th>
                <th className="font-normal p-3">No Telepon</th>
                <th className="font-normal p-3">Jumlah</th>
                <th className="font-normal p-3">Program</th>
                <th className="font-normal p-3">Tanggal Dibuat</th>
                <th className="font-normal p-3">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {dataTransaksi.map((member: any, index: number) => (
                <tr key={member.id} className="text-center text-black-2 text-[13px] border">
                  <td className="p-3">{index + 1}</td>
                  <td className="p-3 max-w-30 truncate cursor-pointer">{member.customer?.name}</td>
                  <td className="p-3 max-w-30 truncate cursor-pointer" title={member.customer?.email}>
                    {member.customer?.email}
                  </td>
                  <td className="p-3 max-w-30 truncate cursor-pointer" title={member.customer?.mobile}>
                    {member.customer?.mobile}
                  </td>
                  <td className="p-3 capitalize">{member.amount?.toLocaleString("id-ID", { style: "currency", currency: "IDR" })}</td>
                  <td className="p-3 max-w-30 truncate cursor-pointer">{member.paymentLink?.name}</td>
                  <td className="p-3">{new Date(member.createdAt).toLocaleDateString()}</td>
                  <td className="p-3 text-amber-700 ">
                    <button onClick={() => setSelectedTransaksi(member)}>Detail</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <NoDataImage />
        )}
      </div>

      {dataTransaksi && dataTransaksi.length > 0 && (
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
            className={`px-4 py-2 mx-1 rounded ${currentPage >= lastPage ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-primary text-white cursor-pointer"}`}>
            Next
          </button>
        </div>
      )}

      {/* Modal */}
      {selectedTransaksi && (
        <div className="fixed inset-0 bg-black-2 bg-opacity-75 z-999999 flex items-center justify-center text-black-2">
          <div className="bg-white rounded-lg p-6 w-[90%] max-w-md relative ms-30">
            <button className="absolute top-2 right-3 text-gray-500 text-lg" onClick={closeModal}>
              ×
            </button>
            <h2 className="text-lg font-semibold mb-4">Detail Transaksi</h2>
            <div className="text-sm space-y-2">
              <p className="flex justify-between">
                <strong>ID :</strong> {selectedTransaksi.id}
              </p>
              <p className="flex justify-between">
                <strong>Jumlah Pembayaran :</strong> {selectedTransaksi.amount.toLocaleString("id-ID", { style: "currency", currency: "IDR" })}
              </p>

              <p className="flex justify-between">
                <strong>Tanggal Transaksi :</strong> {new Date(selectedTransaksi.createdAt).toLocaleString()}
              </p>
              <hr className="my-2" />
              <p className="flex justify-between">
                <strong>Customer ID :</strong> {selectedTransaksi.customerId}
              </p>
              <p className="flex justify-between">
                <strong>Nama :</strong> {selectedTransaksi.customer?.name}
              </p>
              <p className="flex justify-between">
                <strong>Email :</strong> {selectedTransaksi.customer?.email}
              </p>
              <p className="flex justify-between">
                <strong>No Telepon :</strong> {selectedTransaksi.customer?.mobile}
              </p>
              <p className="flex justify-between">
                <strong>Program :</strong> {selectedTransaksi.paymentLink?.name}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TableTransaksiUnpaid;
