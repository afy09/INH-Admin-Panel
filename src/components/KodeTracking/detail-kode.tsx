"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowBack, Close, LoadingSpiner } from "@/components/Campign/icons/icon";
import AlertDeleteProduk from "../Alert/alert_delete_program";

const DetailKode = ({ detailKode }: { detailKode: any }) => {
  const { id } = useParams();
  const [isPopupOpenImage, setIsPopupOpenImage] = useState(false);
  const [nama, setnama] = useState("");
  const [kode_tracking, setkode_tracking] = useState("");
  const handleOpenPopupImage = () => setIsPopupOpenImage(true);
  const handleClosePopupImage = () => setIsPopupOpenImage(false);
  const [isPopupOpenDelete, setIsPopupOpenDelete] = useState(false);
  const handleOpenPopupDelete = () => setIsPopupOpenDelete(true);
  const handleClosePopupDelete = () => setIsPopupOpenDelete(false);
  const [showPopupDelete, setShowPopupDelete] = useState(false);
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const isValid = nama && kode_tracking;

  const handleDelete = async () => {
    setIsLoadingDelete(true);
    try {
      const response = await fetch(`/api/dataKodeTracking/delete?id=${id}`, {
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

  return (
    <div className="border rounded-2xl px-7 py-7">
      <Link
        href="/dashboard/kode-tracking
      ">
        <div className="text-[24px] text-black-2 font-semibold flex gap-3 items-center mb-10">
          <ArrowBack />
          Edit Kode Tracking
        </div>
      </Link>

      <form>
        {/* Judul dan Kategori */}
        <div className="flex gap-3 w-full">
          <div className="w-full">
            <label className="block mb-2 text-black-2 font-medium">Nama</label>
            <input type="text" className="bg-gray-100 outline-none px-4 py-3 w-full text-black-2 placeholder:text-[#DEE4EE] rounded-lg" placeholder="Masukkan Nama" value={nama} onChange={(e) => setnama(e.target.value)} />
          </div>
          <div className="w-full">
            <label className="block mb-2 text-black-2 font-medium">Kode Tracking</label>
            <input
              type="text"
              className="bg-gray-100 outline-none px-4 py-3 w-full text-black-2 placeholder:text-[#DEE4EE] rounded-lg"
              placeholder="Masukkan Pengarang"
              value={kode_tracking}
              onChange={(e) => setkode_tracking(e.target.value)}
            />
          </div>
        </div>

        <div className="mt-5 flex gap-2 justify-end">
          <button type="submit" className={`px-12 py-2 rounded-lg ${isValid ? "bg-amber-400 text-white" : "bg-gray-300 text-gray-500 cursor-not-allowed"}`} disabled={!isValid || isLoading}>
            {isLoading ? "Mengirim..." : "Submit"}
          </button>
        </div>
      </form>

      <div className="flex justify-end gap-3 mt-7">
        {/* <button className="bg-amber-500 px-6 py-2 rounded-lg text-white">Edit</button> */}

        <button onClick={handleOpenPopupDelete} className="bg-red-700 px-6 py-2 rounded-lg text-white">
          Hapus
        </button>
      </div>

      {isPopupOpenImage && (
        <div className="fixed inset-0 flex items-center justify-center bg-black-2 bg-opacity-70 z-999999">
          <div className="bg-white text-black-2 p-4 rounded-lg shadow-lg w-[400px] xl:ms-55">
            <div className="flex justify-between items-center mb-7">
              <h2 className="text-[20px] font-medium">Foto Banner</h2>
              <div onClick={handleClosePopupImage} className="cursor-pointer">
                <Close />
              </div>
            </div>
            <div className="flex justify-center mb-3">
              <img src="" alt="Banner" width={300} height={200} className="rounded-lg" />
            </div>
          </div>
        </div>
      )}

      {isPopupOpenDelete && (
        <div className="fixed inset-0 flex items-center justify-center bg-black-2 bg-opacity-70 z-999999">
          <div className="bg-white p-8 rounded-2xl shadow-lg  ms-90 me-22">
            <div className="flex justify-end -mt-3 cursor-pointer" onClick={handleClosePopupDelete}>
              <Close />
            </div>
            <h1 className="text-black-2 font-medium text-xl text-center mt-3">
              Apakah anda yakin <br /> ingin menghapus program ini ?
            </h1>

            <div className="mt-6 flex justify-center gap-2">
              <button className="px-12 py-2 bg-red-600 text-white rounded-lg" onClick={handleDelete}>
                {isLoadingDelete ? `Menghapus.....` : `Hapus`}
              </button>
              <button className="px-12 py-2 border border-black-2 text-black-2 rounded-lg" onClick={handleClosePopupDelete}>
                Tidak
              </button>
            </div>
          </div>
        </div>
      )}

      {showPopupDelete && <AlertDeleteProduk />}
    </div>
  );
};

export default DetailKode;
