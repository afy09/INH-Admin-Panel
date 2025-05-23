"use client";
import React, { useState } from "react";
import { ArrowBack } from "@/components/Campign/icons/icon";
import Link from "next/link";
import ReactQuill from "react-quill";
import "quill/dist/quill.snow.css";
import AlertSuccses from "../Alert/alert_sukses";
import { useMemo } from "react";

const TambahProgram = ({ dataKategori, dataUserAdmin }: { dataKategori: any; dataUserAdmin: any }) => {
  const [title, settitle] = useState("");
  const [author, setauthor] = useState("");
  const [deskripsi, setdeskripsi] = useState("");
  const [kategori, setkategori] = useState("");
  const [caption, setcaption] = useState("");
  const [image, setimage] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const isValid = title && author && deskripsi && kategori && caption && image;
  7;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("user_id", author);
      formData.append("category_id", kategori);
      formData.append("caption", caption);
      formData.append("deskripsi", deskripsi);

      if (image) {
        formData.append("image", image);
      }

      const response = await fetch(`/api/dataProgram/create`, {
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

  function uploadToLaravel(file: File): Promise<string> {
    const formData = new FormData();
    formData.append("upload", file); // ✅ sesuai API yang kamu tunjukkan

    return fetch("https://inhforhumanity.org/api/distribusi-program/upload-deskripsi-image", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.url) return data.url;
        throw new Error("Upload gagal: URL tidak ditemukan di respons.");
      });
  }

  function imageHandler(this: any) {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = async () => {
      const file = input.files?.[0];
      if (!file) return;

      if (file.size > 1 * 1024 * 1024) {
        alert("Ukuran gambar maksimal 1MB");
        return;
      }

      try {
        const url = await uploadToLaravel(file);
        const quill = this.quill;
        const range = quill.getSelection(true);
        quill.insertEmbed(range.index, "image", url); // ✅ Gambar langsung muncul di editor
        quill.setSelection(range.index + 1);
      } catch (error) {
        console.error(error);
        alert("Gagal mengunggah gambar");
      }
    };
  }

  function videoHandler(this: any) {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "video/*");
    input.click();

    input.onchange = async () => {
      const file = input.files?.[0];
      if (!file) return;

      try {
        const url = await uploadToLaravel(file);
        const quill = this.quill;
        const range = quill.getSelection(true);
        quill.insertEmbed(range.index, "video", url); // ✅ Video langsung muncul di editor
        quill.setSelection(range.index + 1);
      } catch (error) {
        console.error(error);
        alert("Gagal mengunggah video");
      }
    };
  }

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [[{ header: [1, 2, false] }], ["bold", "italic", "underline", "link"], [{ list: "ordered" }, { list: "bullet" }], ["image", "video"], ["clean"]],
        handlers: {
          image: imageHandler,
          video: videoHandler,
        },
      },
    }),
    []
  );

  return (
    <>
      <div className="border rounded-2xl px-7 py-7">
        <Link href="/dashboard/distribusi-program">
          <div className="text-[22px] text-black-2 font-semibold flex gap-3 items-center mb-10">
            <ArrowBack />
            Tambah Distribusi Program
          </div>
        </Link>

        <form onSubmit={handleSubmit}>
          {/* Judul dan Kategori */}
          <div className="flex gap-3 w-full">
            <div className="w-full">
              <label className="block mb-2 text-black-2 font-medium">Judul Distribusi Program</label>
              <input type="text" className="bg-gray-100 outline-none px-4 py-3 w-full text-black-2 placeholder:text-[#DEE4EE] rounded-lg" placeholder="Masukkan Nama Judul" value={title} onChange={(e) => settitle(e.target.value)} />
            </div>
            <div className="w-full">
              <label className="block mb-2 text-black-2 font-medium">Caption</label>
              <input type="text" className="bg-gray-100 outline-none px-4 py-3 w-full text-black-2 placeholder:text-[#DEE4EE] rounded-lg" placeholder="Masukkan Caption" value={caption} onChange={(e) => setcaption(e.target.value)} />
            </div>
          </div>

          {/* Upload Gambar dan kategori */}
          <div className="flex gap-3 w-full mt-6">
            <div className="w-full">
              <label className="block mb-2 text-black-2 font-medium">Kategori</label>
              <select name="kategori" value={kategori} onChange={(e) => setkategori(e.target.value)} className="bg-gray-100 outline-none px-4 py-3 w-full text-black-2 placeholder:text-[#DEE4EE] rounded-lg">
                <option value="">Pilih Kategori</option>
                {dataKategori.map((kategori: any) => (
                  <option key={kategori.id} value={kategori.id}>
                    {kategori.nama}
                  </option>
                ))}
              </select>
            </div>

            <div className="w-full">
              <label className="block mb-2 text-black-2 font-medium">Author</label>
              <select name="author" value={author} onChange={(e) => setauthor(e.target.value)} className="bg-gray-100 outline-none px-4 py-3 w-full text-black-2 placeholder:text-[#DEE4EE] rounded-lg">
                <option value="">Pilih Author</option>
                {dataUserAdmin.map((user: any) => (
                  <option key={user.id} value={user.id}>
                    {user.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="w-full mt-6">
            <label className="block mb-2 text-black-2 font-medium">Upload Gambar</label>
            <div className="bg-gray-100 px-4 py-3 w-full text-black-2 rounded-lg flex items-center gap-2">
              <input type="file" accept=".jpg,.jpeg,.png" onChange={(e) => setimage(e.target.files ? e.target.files[0] : null)} />
            </div>
          </div>

          {/* Deskripsi */}

          <div className="mt-6">
            <label className="block mb-2 text-black-2 font-medium">Deskripsi</label>
            <ReactQuill theme="snow" value={deskripsi} modules={modules} onChange={setdeskripsi} className="  outline-none  w-full text-black-2 placeholder:text-[#DEE4EE] rounded-lg" placeholder="Masukkan Deskripsi Berita" />
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

export default TambahProgram;
