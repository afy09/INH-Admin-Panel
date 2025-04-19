"use client";
import React, { useState } from "react";
import { ArrowBack } from "@/components/Campign/icons/icon";
import Link from "next/link";
import AlertSuccses from "../Alert/alert_sukses";

const TambahPamplet = () => {
  const [link_banner, setlink_banner] = useState("");
  const [valid, setvalid] = useState(false);

  const [image, setimage] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const isValid = link_banner && valid && image;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append("link_banner", link_banner);
      formData.append("valid", valid.toString());

      if (image) {
        formData.append("image", image);
      }

      const response = await fetch(`/api/dataPamplet/post`, {
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
      alert("Gambar Tidak Boleh Lebih dari 1MB");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="border rounded-2xl px-7 py-7">
        <Link href="/dashboard/pamplet">
          <div className="text-[22px] text-black-2 font-semibold flex gap-3 items-center mb-10">
            <ArrowBack />
            Tambah Banner Utama
          </div>
        </Link>

        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-3 w-full">
            <div className="w-full">
              <label className="block mb-2 text-black-2 font-medium">Link</label>
              <input
                type="text"
                className="bg-gray-100 outline-none px-4 py-3 w-full text-black-2 placeholder:text-[#DEE4EE] rounded-lg"
                placeholder="Masukkan Nama Judul"
                value={link_banner}
                onChange={(e) => setlink_banner(e.target.value)}
              />
            </div>
            <div className="w-full">
              <label className="block mb-2 text-black-2 font-medium">Open New Tab</label>
              <div className="flex items-center gap-2">
                <input type="checkbox" checked={valid} onChange={(e) => setvalid(e.target.checked)} className="w-5 h-5" />
                <span className="text-black-2">Open New Tab</span>
              </div>
            </div>
          </div>

          {/* Upload Gambar */}
          <div className="flex gap-3 w-full mt-6">
            <div className="w-full">
              <label className="block mb-2 text-black-2 font-medium">Upload Gambar</label>
              <div className="bg-gray-100 px-4 py-3 w-full text-black-2 rounded-lg flex items-center gap-2">
                <input type="file" accept=".jpg,.jpeg,.png" onChange={(e) => setimage(e.target.files ? e.target.files[0] : null)} />
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

export default TambahPamplet;
