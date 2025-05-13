"use client";
import React, { useState } from "react";
import { IoEyeOutline } from "react-icons/io5";
import { useParams } from "next/navigation";
import { Close } from "@/components/Campign/icons/icon";
import { FaRegEdit } from "react-icons/fa";
import AlertUpdate from "../Alert/alert_update";

const TableAktivitas = ({ dataAktivitas }: { dataAktivitas: any }) => {
  const [isPopupOpenVideo, setIsPopupOpenVideo] = useState(false);
  const [selectedVideoId, setSelectedVideoId] = useState<string | null>(null);
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

  const handleOpenPopupVideo = (url: string) => {
    const videoId = url.split("v=")[1]?.split("&")[0]; // Ekstrak ID YouTube
    setSelectedVideoId(videoId);
    setIsPopupOpenVideo(true);
  };

  const handleClosePopupVideo = () => {
    setSelectedVideoId(null);
    setIsPopupOpenVideo(false);
  };

  const handleEditSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoadingEdit(true);

    try {
      const dataToSend: Record<string, string> = {};
      if (selectedEditData?.nama) dataToSend.nama = selectedEditData.nama;
      if (selectedEditData?.url) dataToSend.url = selectedEditData.url;

      const response = await fetch(`/api/dataPengumuman/aktivitas/update?id=${selectedEditData.id}`, {
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
      <div className="m-3 w-full">
        <div className="mt-5 grid grid-cols-4 gap-3 ps-1 pe-6">
          {dataAktivitas?.map((media: any) => {
            const videoId = new URL(media.url).searchParams.get("v");

            return (
              <div key={media.id} className="border rounded-lg p-4 shadow-lg hover:shadow-xl transition-shadow duration-300">
                {videoId ? <img src={`https://img.youtube.com/vi/${videoId}/0.jpg`} alt="Thumbnail YouTube" className="h-30 w-full object-cover rounded-t-lg" /> : <p className="text-red-500">Invalid URL</p>}

                <div className="mt-3">
                  <span className="text-black-2 font-semibold">{media.name}</span>
                </div>

                <div className="mt-2 w-full flex justify-center gap-1">
                  <div className="bg-primary rounded-lg py-2 w-full flex justify-center cursor-pointer" onClick={() => handleOpenPopupVideo(media.url)}>
                    <IoEyeOutline className="text-white" />
                  </div>
                  <div className="bg-green-900 rounded-lg py-2 w-full flex justify-center cursor-pointer" onClick={() => handleOpenPopupEdit(media)}>
                    <FaRegEdit className="text-white" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {isPopupOpenVideo && selectedVideoId && (
        <div className="fixed inset-0 flex items-center justify-center bg-black-2 bg-opacity-70 z-999999">
          <div className="bg-white text-black-2 p-4 rounded-lg shadow-lg w-[600px] xl:ms-55">
            <div className="flex justify-end items-center mb-7">
              <div onClick={handleClosePopupVideo} className="cursor-pointer">
                <Close />
              </div>
            </div>
            <div className="flex justify-center mb-3">
              <iframe width="560" height="315" src={`https://www.youtube.com/embed/${selectedVideoId}`} allowFullScreen className="rounded-lg"></iframe>
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
            <h1 className="text-black-2 font-medium text-xl text-center mt-3">Perbarui Aktivitas Terbaru</h1>
            <form onSubmit={handleEditSubmit}>
              <div className="max-h-80 overflow-y-auto">
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700">Judul</label>
                  <input type="text" value={selectedEditData?.nama || ""} onChange={(e) => setSelectedEditData({ ...selectedEditData, nama: e.target.value })} className="w-full border rounded-lg p-2 mt-1" />
                </div>
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700">Link Youtube</label>
                  <input type="text" value={selectedEditData?.url || ""} onChange={(e) => setSelectedEditData({ ...selectedEditData, url: e.target.value })} className="w-full border rounded-lg p-2 mt-1" />
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

      {showPopupEdit && <AlertUpdate />}
    </>
  );
};

export default TableAktivitas;
