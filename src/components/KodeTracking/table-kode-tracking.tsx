"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { FaPlus } from "react-icons/fa6";
import NoDataImage from "../NoData/NoDataImage";
import AlertDelete from "../Alert/alert_delete";
import { Close } from "../Campign/icons/icon";
import AlertUpdate from "../Alert/alert_update";

const TableKode = ({ dataKode }: { dataKode: any }) => {
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
      const response = await fetch(`/api/dataKodeTracking/delete?id=${selectedDeleteId}`, {
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
      if (selectedEditData?.kode_tracking) dataToSend.kode_tracking = selectedEditData.kode_tracking;

      const response = await fetch(`/api/dataKodeTracking/update?id=${selectedEditData.id}`, {
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
      <div className="border rounded-t-2xl">
        <div className="flex justify-between mt-3">
          <h1 className="text-black-2 px-4 py-3 font-semibold text-xl">Kode Tracking</h1>

          <Link href="/dashboard/kode-tracking/tambah">
            <div className="px-4 py-3">
              <button className="bg-amber-400 px-6 py-2 text-white rounded-lg flex justify-center gap-2 items-center">
                <FaPlus />
                Tambah
              </button>
            </div>
          </Link>
        </div>
        <div className="w-full">
          {dataKode && dataKode.length > 0 ? (
            <table className="w-full">
              <thead className="bg-amber-50 text-[#252525] font-light text-[14px] rounded-lg">
                <tr>
                  <th className="font-normal p-3">No</th>
                  <th className="font-normal p-3">Nama</th>
                  <th className="font-normal p-3">Kode Tracking</th>
                  <th className="font-normal p-3">Tanggal Dibuat</th>
                  <th className="font-normal p-3">Edit</th>
                </tr>
              </thead>
              <tbody>
                {dataKode.map((member: any, index: number) => (
                  <tr key={member.id} className="text-center text-black-2 text-[13px] border">
                    <td className="p-3">{index + 1}</td>
                    <td className="p-3">{member.nama}</td>
                    <td className="p-3 capitalize">{member.kode_tracking}</td>
                    <td className="p-3">{new Date(member.created_at).toLocaleDateString()}</td>

                    <div className="p-3 flex justify-center items-center gap-2  ">
                      <td className="cursor-pointer text-primary" onClick={() => handleOpenPopupEdit(member)}>
                        Edit
                      </td>
                      <td>|</td>
                      <td className="cursor-pointer text-red-600" onClick={() => handleOpenPopupDelete(member.id)}>
                        Hapus
                      </td>
                    </div>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <NoDataImage />
          )}
        </div>
      </div>

      {isPopupOpenDelete && (
        <div className="fixed inset-0 flex items-center justify-center bg-black-2 bg-opacity-70 z-999999">
          <div className="bg-white p-8 rounded-2xl shadow-lg ms-90 me-22">
            <div className="flex justify-end -mt-3 cursor-pointer" onClick={handleClosePopupDelete}>
              <Close />
            </div>
            <h1 className="text-black-2 font-medium text-xl text-center mt-3">
              Apakah anda yakin <br /> ingin menghapus Kode ini ?
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
            <h1 className="text-black-2 font-medium text-xl text-center mt-3">Edit Kode Tracking</h1>
            <form onSubmit={handleEditSubmit}>
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700">Nama</label>
                <input type="text" value={selectedEditData?.nama || ""} onChange={(e) => setSelectedEditData({ ...selectedEditData, nama: e.target.value })} className="w-full border rounded-lg p-2 mt-1" />
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700">Kode Tracking</label>
                <input type="text" value={selectedEditData?.kode_tracking || ""} onChange={(e) => setSelectedEditData({ ...selectedEditData, kode_tracking: e.target.value })} className="w-full border rounded-lg p-2 mt-1" />
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

export default TableKode;
