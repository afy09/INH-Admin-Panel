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
  const [url, seturl] = useState("");

  const handleOpenPopupVideo = (url: string) => {
    const videoId = url.split("v=")[1]?.split("&")[0]; // Ekstrak ID YouTube
    setSelectedVideoId(videoId);
    setIsPopupOpenVideo(true);
  };

  const handleClosePopupVideo = () => {
    setSelectedVideoId(null);
    setIsPopupOpenVideo(false);
  };

  const [selectedDeleteId, setSelectedDeleteId] = useState<string | null>(null);
  const [isPopupOpenDelete, setIsPopupOpenDelete] = useState(false);
  const handleOpenPopupDelete = (id: string) => {
    setSelectedDeleteId(id);
    setIsPopupOpenDelete(true);
  };
  const handleClosePopupDelete = () => setIsPopupOpenDelete(false);
  const [showPopupDelete, setShowPopupDelete] = useState(false);
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);

  const handleEdit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedDeleteId || !url) return;

    setIsLoadingDelete(true);

    try {
      const response = await fetch(`/api/dataPengumuman/aktivitas/update?id=${selectedDeleteId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }), // Kirim data dalam format raw JSON
      });

      if (response.ok) {
        setIsPopupOpenDelete(false);
        setShowPopupDelete(true);
      } else {
        const errorData = await response.json();
        console.error("Error:", errorData);
      }
    } catch (error) {
      console.error("Error update event:", error);
    } finally {
      setIsLoadingDelete(false);
    }
  };

  return (
    <>
      <div className="m-3 w-full">
        <div className="mt-5 grid grid-cols-3 gap-3 ps-1 pe-6">
          {dataAktivitas?.map((media: any) => {
            const videoId = new URL(media.url).searchParams.get("v");

            return (
              <div key={media.id} className="border rounded-lg p-4 shadow-lg hover:shadow-xl transition-shadow duration-300">
                {videoId ? <img src={`https://img.youtube.com/vi/${videoId}/0.jpg`} alt="Thumbnail YouTube" className="h-40 w-full object-cover rounded-t-lg" /> : <p className="text-red-500">Invalid URL</p>}

                <div className="mt-3">
                  <span className="text-black-2 font-semibold">{media.name}</span>
                </div>

                <div className="mt-2 w-full flex justify-center gap-1">
                  <div className="bg-primary rounded-lg py-2 w-full flex justify-center cursor-pointer" onClick={() => handleOpenPopupVideo(media.url)}>
                    <IoEyeOutline className="text-white" />
                  </div>
                  <div className="bg-green-900 rounded-lg py-2 w-full flex justify-center cursor-pointer" onClick={() => handleOpenPopupDelete(media.id)}>
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

      {isPopupOpenDelete && (
        <div className="fixed inset-0 flex items-center justify-center bg-black-2 bg-opacity-70 z-999999">
          <div className="bg-white p-8 rounded-2xl shadow-lg ms-90 me-22">
            <div className="flex justify-end -mt-3 cursor-pointer" onClick={handleClosePopupDelete}>
              <Close />
            </div>
            <form onSubmit={handleEdit} className="mt-2">
              <div className="flex flex-col">
                <label className="text-black-2 mb-1"> Link Youtube Terbaru</label>
                <input type="text" className="rounded-lg outline-none px-4 py-3 border" placeholder="Masukkan Link Youtube Terbaru" value={url} onChange={(e) => seturl(e.target.value)} />
              </div>
              <div className="mt-6 flex justify-center gap-2">
                <button className="px-12 py-2 border border-black-2 text-black-2 rounded-lg" onClick={handleClosePopupDelete}>
                  Tidak
                </button>

                <button type="submit" className="px-12 py-2 bg-primary text-white rounded-lg">
                  {isLoadingDelete ? `Loading...` : `Simpan`}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showPopupDelete && <AlertUpdate />}
    </>
  );
};

export default TableAktivitas;
