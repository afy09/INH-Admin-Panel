"use client";
import React, { useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import NoDataImage from "../NoData/NoDataImage";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { FaPlus } from "react-icons/fa";
import InvoiceTemplate from "./invoicePDF";
import { IoEyeOutline } from "react-icons/io5";
import { FaRegEdit } from "react-icons/fa";
import { FaRegTrashAlt } from "react-icons/fa";
import { Close } from "../Campign/icons/icon";
import AlertDelete from "../Alert/alert_delete";
import AlertUpdate from "../Alert/alert_update";

const TableTransaksi = ({ dataTransaksi, currentPage, lastPage }: { dataTransaksi: any; currentPage: number; lastPage: number }) => {
  const [isPopupOpenDelete, setIsPopupOpenDelete] = useState(false);
  const [selectedDeleteId, setSelectedDeleteId] = useState<string | null>(null);
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);
  const [showPopupDelete, setShowPopupDelete] = useState(false);
  //   EDIT
  const [isPopupOpenEdit, setIsPopupOpenEdit] = useState(false);
  const [selectedEditData, setSelectedEditData] = useState<any>(null);
  const [isLoadingEdit, setIsLoadingEdit] = useState(false);
  const [showPopupEdit, setShowPopupEdit] = useState(false);

  const handleOpenPopupEdit = (data: any) => {
    setSelectedEditData(data);
    setIsPopupOpenEdit(true);
  };

  const handleClosePopupEdit = () => {
    setIsPopupOpenEdit(false);
    setSelectedEditData(null);
  };
  const router = useRouter();
  const [selectedTransaksi, setSelectedTransaksi] = useState<any | null>(null);
  const handlePageChange = (newPage: number) => {
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("page", newPage.toString());
    router.push(`?${urlParams.toString()}`);
  };

  const closeModal = () => setSelectedTransaksi(null);
  const invoiceRef = useRef<HTMLDivElement>(null);
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

  const handleOpenPopupDelete = (id: string) => {
    setSelectedDeleteId(id);
    setIsPopupOpenDelete(true);
  };

  const handleClosePopupDelete = () => {
    setIsPopupOpenDelete(false);
    setSelectedDeleteId(null);
  };

  const handleDelete = async () => {
    if (!selectedDeleteId) return;
    setIsLoadingDelete(true);
    try {
      const response = await fetch(`/api/datadonasitradisonal/delete?id=${selectedDeleteId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setIsPopupOpenDelete(false);
        setShowPopupDelete(true);
      } else {
        console.error("Error:", await response.json());
      }
    } catch (error) {
      console.error("Error delete event:", error);
    } finally {
      setIsLoadingDelete(false);
    }
  };

  const handleEditSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoadingEdit(true);

    try {
      const dataToSend: Record<string, string> = {};
      if (selectedEditData?.nama) dataToSend.nama = selectedEditData.nama;
      if (selectedEditData?.nominal) dataToSend.nominal = selectedEditData.nominal;
      if (selectedEditData?.no_hp) dataToSend.no_hp = selectedEditData.no_hp;
      if (selectedEditData?.tujuan_donasi) dataToSend.tujuan_donasi = selectedEditData.tujuan_donasi;
      if (selectedEditData?.tanggal) dataToSend.tanggal = selectedEditData.tanggal;

      const response = await fetch(`/api/datadonasitradisonal/update?id=${selectedEditData.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });

      if (response.ok) {
        setIsPopupOpenEdit(false);
        setShowPopupEdit(true);
      } else {
        console.error("Error:", await response.json());
      }
    } catch (error) {
      console.error("Error submitting edit:", error);
    } finally {
      setIsLoadingEdit(false);
    }
  };

  return (
    <>
      <div className="">
        <div className="flex justify-between mt-3">
          <h1 className="text-black-2 px-4 py-3 font-semibold text-xl">Donasi Tradisional</h1>

          <div className="flex ">
            <Link href="/dashboard/donasi-tradisional/tambah">
              <div className="px-4 py-3">
                <button className="bg-amber-400 px-6 py-2 text-white rounded-lg flex justify-center gap-2 items-center">
                  <FaPlus />
                  Tambah
                </button>
              </div>
            </Link>
          </div>
        </div>
        <div className="w-full">
          {dataTransaksi && dataTransaksi.length > 0 ? (
            <table className="w-full">
              <thead className="bg-amber-50 text-[#252525] font-light text-[14px] rounded-lg">
                <tr>
                  <th className="font-normal p-3">No</th>
                  <th className="font-normal p-3">Nama</th>
                  <th className="font-normal p-3">Nominal</th>
                  <th className="font-normal p-3">No Telepon</th>
                  <th className="font-normal p-3">Tujuan Donasi</th>
                  <th className="font-normal p-3">Tanggal Transaksi</th>
                  <th className="font-normal p-3">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {dataTransaksi.map((member: any, index: number) => (
                  <tr key={member.id} className="text-center text-black-2 text-[13px] border">
                    <td className="p-3">{index + 1}</td>
                    <td className="p-3 max-w-30 truncate cursor-pointer" title={member?.nama}>
                      {member?.nama}
                    </td>
                    <td className="p-3 capitalize">{member.nominal?.toLocaleString("id-ID", { style: "currency", currency: "IDR" })}</td>
                    <td className="p-3 max-w-30 truncate cursor-pointer">{member?.no_hp}</td>
                    <td className="p-3 max-w-30 truncate cursor-pointer" title={member?.tujuan_donasi}>
                      {member?.tujuan_donasi}
                    </td>
                    {/* <td className="p-3">{new Date(member.tanggal).toLocaleDateString()}</td> */}
                    <td className="p-3">{new Date(member?.tanggal).toLocaleString()}</td>
                    <td className="p-3  flex gap-2 justify-center items-center">
                      <button className="text-primary" onClick={() => setSelectedTransaksi(member)}>
                        <IoEyeOutline size={20} />
                      </button>
                      <button className="text-green-800" onClick={() => handleOpenPopupEdit(member)}>
                        <FaRegEdit size={15} />
                      </button>

                      <button className="text-red-800" onClick={() => handleOpenPopupDelete(member.id)}>
                        <FaRegTrashAlt size={15} />
                      </button>
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
                  <strong>Nama :</strong> {selectedTransaksi?.nama}
                </p>

                <p className="flex justify-between">
                  <strong>No Telepon :</strong> {selectedTransaksi?.no_hp}
                </p>
                <p className="flex justify-between">
                  <strong>Nomial :</strong> {selectedTransaksi?.nominal?.toLocaleString("id-ID", { style: "currency", currency: "IDR" })}
                </p>

                <p className="flex justify-between">
                  <strong>Tanggal Transaksi :</strong> {new Date(selectedTransaksi?.tanggal).toLocaleString()}
                </p>

                <p className="flex justify-between">
                  <strong>Program :</strong> {selectedTransaksi?.tujuan_donasi}
                </p>
                <hr className="my-2" />
                <div className="flex justify-end mt-2 gap-2">
                  <button onClick={handleCetakPDF} className="px-3 py-2 bg-primary text-white rounded-lg">
                    Cetak Invoice
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        <div style={{ position: "absolute", left: "-9999px", top: "-9999px" }}>
          <InvoiceTemplate ref={invoiceRef} transaksi={selectedTransaksi} />
        </div>
      </div>

      {isPopupOpenDelete && (
        <div className="fixed inset-0 flex items-center justify-center bg-black-2 bg-opacity-70 z-999999">
          <div className="bg-white p-8 rounded-2xl shadow-lg ms-90 me-22">
            <div className="flex justify-end -mt-3 cursor-pointer" onClick={handleClosePopupDelete}>
              <Close />
            </div>
            <h1 className="text-black-2 font-medium text-xl text-center mt-3">
              Apakah anda yakin <br /> ingin menghapus Donasi ini ?
            </h1>

            <div className="mt-6 flex justify-center gap-2">
              <button className="px-12 py-2 bg-red-600 text-white rounded-lg" onClick={handleDelete}>
                {isLoadingDelete ? "Menghapus....." : "Hapus"}
              </button>
              <button className="px-12 py-2 border border-black-2 text-black-2 rounded-lg" onClick={handleClosePopupDelete}>
                Tidak
              </button>
            </div>
          </div>
        </div>
      )}

      {isPopupOpenEdit && (
        <div className="fixed inset-0 flex items-center justify-center bg-black-2 bg-opacity-70 z-999999">
          <div className="bg-white p-8 rounded-2xl shadow-lg ms-90 me-22">
            <div className="flex justify-end -mt-3 cursor-pointer" onClick={handleClosePopupEdit}>
              <Close />
            </div>
            <h1 className="text-black-2 font-medium text-xl text-center mt-3">Edit Donasi</h1>
            <form onSubmit={handleEditSubmit}>
              <div className="max-h-80 overflow-y-auto">
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700">Nama</label>
                  <input type="text" value={selectedEditData?.nama || ""} onChange={(e) => setSelectedEditData({ ...selectedEditData, nama: e.target.value })} className="w-full border rounded-lg p-2 mt-1" />
                </div>
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700">Nominal (Rp)</label>
                  <input type="text" value={selectedEditData?.nominal || 0} onChange={(e) => setSelectedEditData({ ...selectedEditData, nominal: e.target.value })} className="w-full border rounded-lg p-2 mt-1" />
                </div>

                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700">No Telepon</label>
                  <input type="text" value={selectedEditData?.no_hp || ""} onChange={(e) => setSelectedEditData({ ...selectedEditData, no_hp: e.target.value })} className="w-full border rounded-lg p-2 mt-1" />
                </div>

                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700">Tujuaan Donasi</label>
                  <input type="text" value={selectedEditData?.tujuan_donasi || ""} onChange={(e) => setSelectedEditData({ ...selectedEditData, tujuan_donasi: e.target.value })} className="w-full border rounded-lg p-2 mt-1" />
                </div>

                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700">Tanggal</label>
                  <input type="date" value={selectedEditData?.tanggal || ""} onChange={(e) => setSelectedEditData({ ...selectedEditData, tanggal: e.target.value })} className="w-full border rounded-lg p-2 mt-1" />
                </div>
              </div>
              <div className="mt-6 flex justify-center gap-2">
                <button type="submit" className="px-12 py-2 bg-primary text-white rounded-lg">
                  {isLoadingEdit ? "Menyimpan..." : "Simpan"}
                </button>
                <button type="button" className="px-12 py-2 border border-black-2 text-black-2 rounded-lg" onClick={handleClosePopupEdit}>
                  Batal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showPopupDelete && <AlertDelete />}
      {showPopupEdit && <AlertUpdate />}
    </>
  );
};

export default TableTransaksi;
