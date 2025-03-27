"use client";
import React, { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowBack, Close } from "@/components/Campign/icons/icon";
import AlertDeleteProduk from "../Alert/alert_delete_berita";

const DetailBerita = ({ detailBerita }: { detailBerita: any }) => {
  const { id } = useParams();
  const [isPopupOpenImage, setIsPopupOpenImage] = useState(false);
  const handleOpenPopupImage = () => setIsPopupOpenImage(true);
  const handleClosePopupImage = () => setIsPopupOpenImage(false);
  const [isPopupOpenDelete, setIsPopupOpenDelete] = useState(false);
  const handleOpenPopupDelete = () => setIsPopupOpenDelete(true);
  const handleClosePopupDelete = () => setIsPopupOpenDelete(false);
  const [showPopupDelete, setShowPopupDelete] = useState(false);
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);

  const handleDelete = async () => {
    setIsLoadingDelete(true);
    try {
      const response = await fetch(`/api/databerita/delete?id=${id}`, {
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
        href="/dashboard/berita
      ">
        <div className="text-[24px] text-black-2 font-semibold flex gap-3 items-center mb-10">
          <ArrowBack />
          Detail Berita
        </div>
      </Link>

      <div className=" px-4 py-4 flex flex-col gap-4 text-black-2">
        <div className="flex gap-7">
          <div className="w-50 font-semibold">Judul</div>
          <div className="text-[#4A4D4F] uppercase">{detailBerita?.title}</div>
        </div>

        <div className="flex gap-7">
          <div className="w-50 font-semibold">Banner</div>
          <div onClick={handleOpenPopupImage} className="text-primary2 font-semibold cursor-pointer">
            Lihat Banner
          </div>
        </div>

        <div className="flex gap-7">
          <div className="w-50 font-semibold">Pengarang</div>
          <div className="text-[#4A4D4F] capitalize">{detailBerita?.author}</div>
        </div>

        <div className="flex gap-7">
          <div className="w-50 font-semibold">Kategori</div>
          <div className="text-[#4A4D4F] capitalize">{detailBerita?.kategori}</div>
        </div>

        <div className="flex gap-7">
          <div className="w-50 font-semibold">Tanggal Dibuat</div>
          <div className="text-[#4A4D4F]">{new Date(detailBerita?.created_at).toLocaleDateString()}</div>
        </div>

        <div className="flex flex-col gap-3">
          <div className="w-50 font-semibold">Deskripsi :</div>
          <div className="text-[#4A4D4F]">{detailBerita?.deskripsi}</div>
        </div>
      </div>

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
              <img src={detailBerita?.image} alt="Banner" width={300} height={200} className="rounded-lg" />
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
              Apakah anda yakin <br /> ingin menghapus Berita ini ?
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

export default DetailBerita;
