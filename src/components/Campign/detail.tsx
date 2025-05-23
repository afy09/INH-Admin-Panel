"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowBack, Close, LoadingSpiner } from "./icons/icon";
import AlertDeleteProduk from "../Alert/alert_delete_campagin";
import AlertUpdate from "../Alert/alert_update";

const DetailCampaign = ({ detailCampaign }: { detailCampaign: any }) => {
  const { id } = useParams();
  const [isPopupOpenImage, setIsPopupOpenImage] = useState(false);
  const handleOpenPopupImage = () => setIsPopupOpenImage(true);
  const handleClosePopupImage = () => setIsPopupOpenImage(false);
  const [isPopupOpenDelete, setIsPopupOpenDelete] = useState(false);
  const handleOpenPopupDelete = () => setIsPopupOpenDelete(true);
  const handleClosePopupDelete = () => setIsPopupOpenDelete(false);
  const [showPopupDelete, setShowPopupDelete] = useState(false);
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);

  // EDIT
  const [editData, setEditData] = useState({
    title: detailCampaign?.title || "",
    kategori: detailCampaign?.kategori || "",
    total: detailCampaign?.total || "",
    link: detailCampaign?.link || "",
    deskripsi: detailCampaign?.deskripsi || "",
    image: null as File | null,
  });
  const [method, setMethod] = useState("put");
  const [isPopupOpenEdit, setIsPopupOpenEdit] = useState(false);
  const handleOpenPopupEdit = () => setIsPopupOpenEdit(true);
  const handleClosePopupEdit = () => setIsPopupOpenEdit(false);
  const [showPopupEdit, setShowPopupEdit] = useState(false);
  const [isLoadingEdit, setIsLoadingEdit] = useState(false);

  const handleDelete = async () => {
    setIsLoadingDelete(true);
    try {
      const response = await fetch(`/api/campign/delete?id=${id}`, {
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

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditData({ ...editData, [name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setEditData({ ...editData, image: e.target.files[0] });
    }
  };

  const handleEditSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoadingEdit(true);
    const formData = new FormData();
    formData.append("_method", method);
    formData.append("title", editData.title);
    formData.append("kategori", editData.kategori);
    formData.append("total", editData.total.toString());
    formData.append("link", editData.link);
    formData.append("deskripsi", editData.deskripsi);
    if (editData.image) {
      formData.append("image", editData.image);
    }

    try {
      const response = await fetch(`/api/campign/update?id=${id}`, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        handleClosePopupEdit();
        setShowPopupEdit(true);
      } else {
        console.error("Gagal update");
      }
    } catch (error) {
      console.error("Error update:", error);
    } finally {
      setIsLoadingEdit(false);
    }
  };

  return (
    <div className="border rounded-2xl px-7 py-7">
      <Link
        href="/dashboard/campign
      ">
        <div className="text-[24px] text-black-2 font-semibold flex gap-3 items-center mb-10">
          <ArrowBack />
          Detail Campaign
        </div>
      </Link>

      <div className=" px-4 py-4 flex flex-col gap-4 text-black-2">
        <div className="flex gap-7">
          <div className="w-50 font-semibold">Judul</div>
          <div className="text-[#4A4D4F] uppercase">{detailCampaign?.title}</div>
        </div>

        <div className="flex gap-7">
          <div className="w-50 font-semibold">Banner</div>
          <div onClick={handleOpenPopupImage} className="text-primary2 font-semibold cursor-pointer">
            Lihat Banner
          </div>
        </div>

        <div className="flex gap-7">
          <div className="w-50 font-semibold">Kategori</div>
          <div className="text-[#4A4D4F] capitalize">{detailCampaign?.kategori}</div>
        </div>

        <div className="flex gap-7">
          <div className="w-50 font-semibold">Target Pengumpulan</div>
          <div className="text-[#4A4D4F]"> {new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(detailCampaign?.total)}</div>
        </div>

        <div className="flex gap-7">
          <div className="w-50 font-semibold">Tanggal Dibuat</div>
          <div className="text-[#4A4D4F]">{new Date(detailCampaign?.created_at).toLocaleDateString()}</div>
        </div>

        <div className="flex gap-7">
          <div className="w-50 font-semibold">Link Mayar</div>
          <div className="text-[#4A4D4F]">{detailCampaign?.link}</div>
        </div>

        <div className="flex gap-7">
          <div className="w-50 font-semibold">Deskripsi</div>
          <div className="text-[#4A4D4F]">{detailCampaign?.deskripsi}</div>
        </div>
      </div>

      <div className="flex justify-end gap-3 mt-7">
        <button onClick={handleOpenPopupEdit} className="bg-primary px-6 py-2 rounded-lg text-white">
          Edit
        </button>

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
              <img src={detailCampaign?.image} alt="Banner" width={300} height={200} className="rounded-lg" />
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
              Apakah anda yakin <br /> ingin menghapus campaign ini ?
            </h1>

            <div className="mt-6 flex justify-center gap-2">
              <button className="px-12 py-2 bg-red-600 text-white rounded-lg" onClick={handleDelete}>
                {isLoadingDelete ? `Menghapus` : `Ya, Hapus`}
              </button>
              <button className="px-12 py-2 border border-amber-400 text-amber-400 rounded-lg" onClick={handleClosePopupDelete}>
                Tidak
              </button>
            </div>
          </div>
        </div>
      )}

      {isPopupOpenEdit && (
        <div className="fixed inset-0 flex items-center justify-center bg-black-2 bg-opacity-70 z-999999">
          <div className="bg-white p-8 rounded-2xl shadow-lg w-[500px] max-h-[90vh] overflow-auto xl:ms-60">
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-xl font-semibold text-black-2">Edit Campaign</h2>
              <div onClick={handleClosePopupEdit} className="cursor-pointer">
                <Close />
              </div>
            </div>

            <form onSubmit={handleEditSubmit} className="flex flex-col gap-4 text-black-2 max-h-[350px] overflow-y-scroll">
              <div className="flex flex-col gap-1">
                <label className="font-medium">Judul</label>
                <input name="title" value={editData.title} onChange={handleEditChange} placeholder="Judul" className="border px-3 py-2 rounded" />
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-medium">Kategori</label>

                <input name="kategori" value={editData.kategori} onChange={handleEditChange} placeholder="Kategori" className="border px-3 py-2 rounded" />
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-medium">Total Pengumpulan</label>
                <input name="total" type="number" value={editData.total} onChange={handleEditChange} placeholder="Target" className="border px-3 py-2 rounded" />
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-medium">Link Mayar</label>
                <input name="link" value={editData.link} onChange={handleEditChange} placeholder="Link Mayar" className="border px-3 py-2 rounded" />
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-medium">Deskripsi</label>
                <textarea rows={4} name="deskripsi" value={editData.deskripsi} onChange={handleEditChange} placeholder="Deskripsi" className="border px-3 py-2 rounded h-[100px]" />
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-medium">Gambar</label>
                <input type="file" onChange={handleFileChange} className="border px-3 py-2 rounded" />
              </div>

              <div className="flex justify-end mt-4 gap-2">
                <button type="submit" className="bg-primary text-white px-4 py-2 rounded">
                  {isLoadingEdit ? `Loading...` : `Simpan`}
                </button>
                <button className="border border-red-500 text-red-500 px-4 py-2 rounded" onClick={handleClosePopupEdit}>
                  Batal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showPopupDelete && <AlertDeleteProduk />}
      {showPopupEdit && <AlertUpdate />}
    </div>
  );
};

export default DetailCampaign;
