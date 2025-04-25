"use client";
import React, { useState } from "react";
import { IoEyeOutline } from "react-icons/io5";
import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
import { useParams } from "next/navigation";
import { Close } from "@/components/Campign/icons/icon";
import AlertDelete from "@/components/Alert/alert_delete";
import Link from "next/link";
import AlertUpdate from "../Alert/alert_update";

const Struktur = ({ dataStruktur, dataDivisi }: { dataStruktur: any; dataDivisi: any }) => {
  const [isPopupOpenImage, setIsPopupOpenImage] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("Dewan & Direksi");
  const [method, setMethod] = useState("put");
  const [gambar, setgambar] = useState<File | null>(null);
  const [nama, setnama] = useState<string>("");
  const [jabatan, setjabatan] = useState<string>("");
  const divisiList = ["Dewan dan Direksi", "Divisi Program", "Divisi Media Center", "Divisi Keuangan", "Divisi Digital Fundraising & IT", "Divisi Logistik"];
  const [divisi_id, setDivisi_id] = useState("");

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

  const [selectedEditId, setSelectedEditId] = useState<string | null>(null);
  const [isPopupOpenEdit, setIsPopupOpenEdit] = useState(false);
  const handleClosePopupEdit = () => setIsPopupOpenEdit(false);
  const [showPopupEdit, setShowPopupEdit] = useState(false);
  const [isLoadingEdit, setIsLoadingEdit] = useState(false);
  const handleOpenPopupEdit = (id: string) => {
    const selected = dataStruktur.find((item: any) => item.id === id);
    if (selected) {
      setnama(selected.nama || "");
      setjabatan(selected.jabatan || "");
    }
    setSelectedEditId(id);
    setIsPopupOpenEdit(true);
  };

  const handleEdit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedEditId) return;
    setIsLoadingEdit(true);
    try {
      const formData = new FormData();
      formData.append("_method", method);

      if (nama) {
        formData.append("nama", nama);
      }

      if (jabatan) {
        formData.append("jabatan", jabatan);
      }
      if (divisi_id) {
        formData.append("divisi_id", divisi_id);
      }

      if (gambar) {
        formData.append("gambar", gambar);
      }
      const response = await fetch(`/api/dataStruktur/update?id=${selectedEditId}`, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        setIsPopupOpenEdit(false);
        setShowPopupEdit(true);
      } else {
        console.error("Error:", await response.json());
      }
    } catch (error) {
      console.error("Error delete event:", error);
    } finally {
      setIsLoadingEdit(false);
    }
  };

  return (
    <>
      <div className="m-3 w-full">
        <div className="flex justify-end items-center">
          <div className="mt-4 flex justify-end ps-1 pe-6">
            <Link href={"/dashboard/struktur/tambah-divisi"}>
              <button className="border border-primary rounded-md px-6 py-2 text-sm font-medium text-primary">Tambah Divisi</button>
            </Link>
          </div>
          <div className="mt-4 flex justify-end ps-1 pe-6">
            <Link href={"/dashboard/struktur/tambah-struktur"}>
              <button className="border border-primary rounded-md px-6 py-2 text-sm font-medium text-primary">Tambah Struktur</button>
            </Link>
          </div>
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

                <div className="bg-green-900 rounded-lg py-2 w-full flex justify-center cursor-pointer" onClick={() => handleOpenPopupEdit(media.id)}>
                  <FaRegEdit className="text-white" />
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

      {isPopupOpenEdit && (
        <div className="fixed inset-0 flex items-center justify-center bg-black-2 bg-opacity-70 z-999999">
          <div className="bg-white p-8 rounded-2xl shadow-lg ms-90 me-22">
            <div className="flex justify-end -mt-3 cursor-pointer" onClick={handleClosePopupEdit}>
              <Close />
            </div>
            <form onSubmit={handleEdit} className="mt-2">
              <div className="flex flex-col">
                <label className="block  mb-2 text-black-2 font-medium">Nama</label>
                <div className="bg-gray-100 px-4 py-3 w-full text-black-2 rounded-lg flex items-center gap-2">
                  <input className="bg-gray-100 outline-none w-full" type="text" value={nama} onChange={(e) => setnama(e.target.value)} placeholder={dataStruktur.find((item: any) => item.id === selectedEditId)?.nama ?? ""} />
                </div>

                <label className="block mt-3 mb-2 text-black-2 font-medium">Jabatan</label>
                <div className="bg-gray-100 px-4 py-3 w-full text-black-2 rounded-lg flex items-center gap-2">
                  <input className="bg-gray-100 outline-none w-full" type="text" value={jabatan} onChange={(e) => setjabatan(e.target.value)} placeholder={dataStruktur.find((item: any) => item.id === selectedEditId)?.jabatan ?? ""} />
                </div>

                <label className="block mt-3 mb-2 text-black-2 font-medium">Divisi</label>

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

                <label className="block  mt-3 mb-2 text-black-2 font-medium">Upload Gambar</label>
                <div className="bg-gray-100 px-4 py-3 w-full text-black-2 rounded-lg flex items-center gap-2">
                  <input type="file" accept=".jpg,.jpeg,.png" onChange={(e) => setgambar(e.target.files ? e.target.files[0] : null)} />
                </div>
              </div>
              <div className="mt-6 flex justify-center gap-2">
                <button className="px-12 py-2 border border-black-2 text-black-2 rounded-lg" onClick={handleClosePopupEdit}>
                  Tidak
                </button>

                <button type="submit" className="px-12 py-2 bg-primary text-white rounded-lg">
                  {isLoadingEdit ? `Loading...` : `Simpan`}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showPopupEdit && <AlertUpdate />}
      {showPopupDelete && <AlertDelete />}
    </>
  );
};

export default Struktur;
