"use client";
import React, { useState } from "react";
import { IoEyeOutline } from "react-icons/io5";
import { FaRegTrashAlt } from "react-icons/fa";
import { useParams } from "next/navigation";
import { Close } from "@/components/Campign/icons/icon";
import AlertDelete from "@/components/Alert/alert_delete";
import Link from "next/link";

const Struktur = ({ dataStruktur }: { dataStruktur: any }) => {
  const [isPopupOpenImage, setIsPopupOpenImage] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("Dewan & Direksi");
  const tabs = ["Dewan & Direksi", "Divisi Program", "Divisi Media Center", "Divisi Keuangan", "Divisi Digital Fundraising & IT", "Divisi Logistik"];
  const filterTeam = () => {
    return dataStruktur.filter((media: any) => {
      if (activeTab === "Dewan & Direksi") {
        return ["Dewan Pembina", "Dewan Pengawas", "Founder", "Presiden Direktur", "Sekretaris"].includes(media.jabatan);
      } else if (activeTab === "Divisi Program") {
        return ["Manager Program", "Staff Program"].includes(media.jabatan);
      } else if (activeTab === "Divisi Media Center") {
        return media.jabatan.toLowerCase().includes("media");
      } else if (activeTab === "Divisi Keuangan") {
        return media.jabatan.toLowerCase().includes("finance");
      } else if (activeTab === "Divisi Digital Fundraising & IT") {
        return media.jabatan.toLowerCase().includes("fundraising") || media.jabatan.toLowerCase().includes("it") || media.jabatan.toLowerCase().includes("customer service") || media.jabatan.toLowerCase().includes("fundraiser");
      } else if (activeTab === "Divisi Logistik") {
        return media.jabatan.toLowerCase().includes("logistik");
      }
      return false;
    });
  };

  const handleOpenPopupImage = (image: string) => {
    setSelectedImage(image);
    setIsPopupOpenImage(true);
  };
  const handleClosePopupImage = () => {
    setSelectedImage(null);
    setIsPopupOpenImage(false);
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

  const handleDelete = async () => {
    if (!selectedDeleteId) return;
    setIsLoadingDelete(true);
    try {
      const response = await fetch(`/api/dataStruktur/delete?id=${selectedDeleteId}`, {
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
      setSelectedDeleteId(null);
    }
  };

  return (
    <>
      <div className="m-3 w-full">
        <div className="mt-4 flex justify-end ps-1 pe-6">
          <Link href={"/dashboard/struktur/tambah-struktur"}>
            <button className="border border-primary rounded-md px-6 py-2 text-sm font-medium text-primary">Tambah Struktur</button>
          </Link>
        </div>
        <div className="mt-7 grid grid-cols-3 gap-3 ps-1 pe-6">
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`px-6 py-2 text-sm font-medium rounded-md  transition-colors duration-300 ms-2 ${activeTab === tab ? "bg-amber-400 text-white" : "bg-gray-300 text-gray-700 dark:bg-gray-700 dark:text-gray-200"}`}
              onClick={() => setActiveTab(tab)}>
              {tab}
            </button>
          ))}
        </div>

        <div className="mt-5 grid grid-cols-3 gap-3 ps-1 pe-6">
          {filterTeam().map((media: any) => (
            <div key={media.id} className="border rounded-lg p-4 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <img src={media.gambar} alt={media.nama} className="h-50 w-full object-cover rounded-t-lg" />

              <div className="mt-3">
                <p className="text-black-2 font-semibold">{media.nama}</p>
                <p className="text-black-2 text-sm">{media.jabatan}</p>
              </div>

              <div className="mt-2 w-full flex justify-center gap-1">
                <div className="bg-primary rounded-lg py-2 w-full flex justify-center cursor-pointer" onClick={() => handleOpenPopupImage(media.gambar)}>
                  <IoEyeOutline className="text-white" />
                </div>
                <div className="bg-red-700 rounded-lg py-2 w-full flex justify-center cursor-pointer" onClick={() => handleOpenPopupDelete(media.id)}>
                  <FaRegTrashAlt className="text-white" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {isPopupOpenImage && selectedImage && (
        <div className="fixed inset-0 flex items-center justify-center bg-black-2 bg-opacity-70 z-999999">
          <div className="bg-white text-black-2 p-4 rounded-lg shadow-lg w-[400px] xl:ms-55">
            <div className="flex justify-end items-center mb-7">
              <div onClick={handleClosePopupImage} className="cursor-pointer">
                <Close />
              </div>
            </div>
            <div className="flex justify-center mb-3">
              <img src={selectedImage} alt="Banner" width={300} height={200} className="rounded-lg" />
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
              Apakah anda yakin <br /> ingin menghapus data ini ?
            </h1>

            <div className="mt-6 flex justify-center gap-2">
              <button className="px-12 py-2 bg-red-600 text-white rounded-lg" onClick={handleDelete}>
                {isLoadingDelete ? `Menghapus` : `Hapus`}
              </button>
              <button className="px-12 py-2 border border-black-2 text-black-2 rounded-lg" onClick={handleClosePopupDelete}>
                Tidak
              </button>
            </div>
          </div>
        </div>
      )}

      {showPopupDelete && <AlertDelete />}
    </>
  );
};

export default Struktur;
