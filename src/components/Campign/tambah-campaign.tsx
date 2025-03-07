"use client";
import React, { useState } from "react";
import { ArrowBack } from "./icons/icon";
import Link from "next/link";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { FaPaperPlane } from "react-icons/fa";
import AlertSuccses from "../Alert/alert_sukses";

const TambahCampagn = () => {
  const [title, settitle] = useState("");
  const [kategori, setkategori] = useState("");
  const [total, settotal] = useState("");
  const [deskripsi, setdeskripsi] = useState("");
  const [image, setimage] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  // AI SUPPORT
  const [showInputAI, setShowInputAI] = useState(false);
  const [aiPrompt, setAiPrompt] = useState("");
  const [loadingAI, setLoadingAI] = useState(false);

  const isValid = title && kategori && total && deskripsi && image;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("kategori", kategori);
      formData.append("total", total);
      formData.append("deskripsi", deskripsi);

      if (image) {
        formData.append("image", image);
      }

      const response = await fetch(`/api/campign/create`, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        setShowPopup(true);
      } else {
        const errorData = await response.json();
        console.error("Error:", errorData);
        alert("Gagal mengirim data!");
      }
    } catch (error) {
      console.error("Error submitting data:", error);
      alert("Terjadi kesalahan!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="border rounded-2xl px-7 py-7">
        <Link href="/dashboard/campign">
          <div className="text-[22px] text-black-2 font-semibold flex gap-3 items-center mb-10">
            <ArrowBack />
            Tambah Campaign
          </div>
        </Link>

        <form onSubmit={handleSubmit}>
          {/* Judul dan Kategori */}
          <div className="flex gap-3 w-full">
            <div className="w-full">
              <label className="block mb-2 text-black-2 font-medium">Judul</label>
              <input type="text" className="bg-gray-100 outline-none px-4 py-3 w-full text-black-2 placeholder:text-[#DEE4EE] rounded-lg" placeholder="Masukkan Nama Judul" value={title} onChange={(e) => settitle(e.target.value)} />
            </div>
            <div className="w-full">
              <label className="block mb-2 text-black-2 font-medium">Kategori</label>
              <select className="bg-gray-100 outline-none px-4 py-3 w-full text-black-2 placeholder:text-[#DEE4EE] rounded-lg" value={kategori} onChange={(e) => setkategori(e.target.value)}>
                <option value="" disabled>
                  Pilih Kategori
                </option>
                <option value="nasional">Nasional</option>
                <option value="internasional">International</option>
                <option value="sedekah umum">Sedekah Umum</option>
                <option value="palestina">Palestina</option>
              </select>
            </div>
          </div>

          {/* Target */}
          <div className="flex gap-3 w-full mt-6">
            <div className="w-full">
              <label className="block mb-2 text-black-2 font-medium">Target Pengumpulan</label>
              <input
                type="number"
                className="bg-gray-100 outline-none px-4 py-3 w-full text-black-2 placeholder:text-[#DEE4EE] rounded-lg"
                placeholder="Masukkan Target Pengumpulan Dana"
                value={total}
                onChange={(e) => settotal(e.target.value)}
              />
            </div>
          </div>

          {/* Upload Gambar */}
          <div className="mt-6">
            <label className="block mb-2 text-black-2 font-medium">Upload Gambar</label>
            <div className="bg-gray-100 px-4 py-3 w-full text-black-2 rounded-lg flex items-center gap-2">
              <input type="file" accept=".jpg,.jpeg,.png" onChange={(e) => setimage(e.target.files ? e.target.files[0] : null)} />
            </div>
          </div>
          {/* Deskripsi */}

          <div className="mt-6">
            <label className="block mb-2 text-black-2 font-medium">Deskripsi</label>
            <textarea value={deskripsi} onChange={(e) => setdeskripsi(e.target.value)} rows={4} className="bg-gray-100 outline-none px-4 py-3 w-full text-black-2 placeholder:text-[#DEE4EE] rounded-lg"></textarea>
          </div>

          {/* Button */}
          <div className="mt-5 flex gap-2 justify-end">
            <button type="submit" className={`px-12 py-2 rounded-lg ${isValid ? "bg-amber-400 text-white" : "bg-gray-300 text-gray-500 cursor-not-allowed"}`} disabled={!isValid || isLoading}>
              {isLoading ? "Mengirim..." : "Submit"}
            </button>
          </div>
        </form>
      </div>

      {showPopup && <AlertSuccses />}
    </>
  );
};

export default TambahCampagn;
