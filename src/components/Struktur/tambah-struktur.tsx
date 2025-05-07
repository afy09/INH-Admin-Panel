"use client";
import React, { useState } from "react";
import { ArrowBack } from "@/components/Campign/icons/icon";
import Link from "next/link";

import AlertSuccses from "../Alert/alert_sukses";

const TambahStruktur = ({ dataDivisi }: { dataDivisi: any }) => {
  const [nama, setnama] = useState("");
  const [jabatan, setjabatan] = useState("");
  const [gambar, setgambar] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [divisi_id, setDivisi_id] = useState("");

  const isValid = nama && jabatan && gambar;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append("nama", nama);
      formData.append("jabatan", jabatan);
      formData.append("divisi_id", divisi_id);
      if (gambar) {
        formData.append("gambar", gambar);
      }

      const response = await fetch(`/api/dataStruktur/create`, {
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
        <Link href="/dashboard/struktur">
          <div className="text-[22px] text-black-2 font-semibold flex gap-3 items-center mb-10">
            <ArrowBack />
            Tambah Struktur Organisasi
          </div>
        </Link>

        <form onSubmit={handleSubmit}>
          {/* Judul dan Kategori */}
          <div className="flex gap-3 w-full">
            <div className="w-full">
              <label className="block mb-2 text-black-2 font-medium">Nama</label>
              <input type="text" className="bg-gray-100 outline-none px-4 py-3 w-full text-black-2 placeholder:text-[#DEE4EE] rounded-lg" placeholder="Masukkan Nama Pengurus" value={nama} onChange={(e) => setnama(e.target.value)} />
            </div>
            <div className="w-full">
              <label className="block mb-2 text-black-2 font-medium">Jabatan</label>
              <input type="text" className="bg-gray-100 outline-none px-4 py-3 w-full text-black-2 placeholder:text-[#DEE4EE] rounded-lg" placeholder="Masukkan Jabatan" value={jabatan} onChange={(e) => setjabatan(e.target.value)} />
            </div>
          </div>

          {/* Upload Gambar & divisi */}
          <div className="flex gap-3 w-full mt-6">
            <div className="w-full">
              <label className="block mb-2 text-black-2 font-medium">Divisi</label>
              <div className="relative">
                <select value={divisi_id} onChange={(e) => setDivisi_id(e.target.value)} className="bg-gray-100 appearance-none outline-none px-4 py-3 w-full text-black-2 placeholder:text-[#DEE4EE] rounded-lg cursor-pointer">
                  <option value="" disabled>
                    Pilih Divisi
                  </option>
                  {dataDivisi.map((item: any) => (
                    <option key={item.id} value={item.id}>
                      {item.divisi}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="w-full">
              <label className="block mb-2 text-black-2 font-medium">Upload Foto</label>
              <div className="bg-gray-100 px-4 py-3 w-full text-black-2 rounded-lg flex items-center gap-2">
                <input type="file" accept=".jpg,.jpeg,.png" onChange={(e) => setgambar(e.target.files ? e.target.files[0] : null)} />
              </div>
            </div>
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

export default TambahStruktur;
