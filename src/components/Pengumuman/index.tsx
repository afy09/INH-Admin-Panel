"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import AlertSuccses from "../Alert/alert_sukses";
import { FaPlus } from "react-icons/fa";

const PageKerjaSama = () => {
  const tabs = [
    { label: "Pengumuman", path: "/dashboard/pengumuman", id: 1 },
    { label: "Aktivitas Terbaru", path: "/dashboard/pengumuman/aktivitas", id: 2 },
  ];
  const currentPath = usePathname();
  const [isClicked, setIsClicked] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [nama, setNama] = useState("");
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const isValid = nama && url;

  const handleTabClick = (id: number) => {
    setIsClicked(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("/api/dataPengumuman/aktivitas/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nama, url }),
      });

      const data = await response.json();
      if (response.ok) {
        setShowPopup(true);
        setShowModal(false);
      } else {
        alert(`Gagal: ${data.message}`);
      }
    } catch (error) {
      console.error(error);
      alert("Terjadi kesalahan");
    }
  };

  return (
    <>
      <div className="flex justify-between px-4 py-4 items-center">
        {/* Tabs Navigation */}
        <div className="flex items-center gap-4">
          {tabs.map((tab) => (
            <Link
              key={tab.label}
              href={tab.path}
              onClick={() => handleTabClick(tab.id)}
              className={`px-4 py-2 border-b capitalize transition-all ${currentPath === tab.path ? "text-primary border-primary" : "text-[#828282] border-[#828282]"} ${isClicked ? "animate-pulse" : ""}`}>
              {tab.label}
            </Link>
          ))}
        </div>

        {/* Tombol Tambah */}
        {currentPath === "/dashboard/pengumuman/aktivitas" && (
          <div onClick={() => setShowModal(true)} className="px-4 py-2 bg-primary text-white rounded-lg cursor-pointer flex gap-2 items-center">
            <FaPlus /> Tambah
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black-2 bg-opacity-75 flex justify-center items-center z-99999">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-md  ms-52">
            <h2 className="text-lg font-semibold mb-4 text-black-2">Tambah Aktivitas Terbaru</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input type="text" placeholder="Nama" value={nama} onChange={(e) => setNama(e.target.value)} className="border p-2 rounded" required />
              <input type="text" placeholder="URL" value={url} onChange={(e) => setUrl(e.target.value)} className="border p-2 rounded" required />
              <div className="flex justify-end gap-2">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 border rounded-lg">
                  Batal
                </button>
                <button type="submit" className={`px-10 py-2 rounded-lg ${isValid ? "bg-amber-400 text-white" : "bg-gray-300 text-gray-500 cursor-not-allowed"}`} disabled={!isValid || loading}>
                  {loading ? "Loading..." : "Simpan"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showPopup && <AlertSuccses />}
    </>
  );
};

export default PageKerjaSama;
