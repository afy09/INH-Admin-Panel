"use client";
import React, { useState } from "react";
import { ArrowBack } from "@/components/Campign/icons/icon";
import Link from "next/link";
import "react-quill/dist/quill.snow.css";
import AlertSuccses from "../Alert/alert_sukses";

const TambahKode = () => {
  const [nama, setnama] = useState("");
  const [kode_tracking, setkode_tracking] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const isValid = nama && kode_tracking;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const dataToSend = {
        nama,
        kode_tracking,
      };

      const response = await fetch(`/api/dataKodeTracking/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
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
        <Link href="/dashboard/kode-tracking">
          <div className="text-[22px] text-black-2 font-semibold flex gap-3 items-center mb-10">
            <ArrowBack />
            Tambah Kode Tracking
          </div>
        </Link>

        <form onSubmit={handleSubmit}>
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

export default TambahKode;
