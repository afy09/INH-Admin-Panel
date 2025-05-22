"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowBack, Close } from "@/components/Campign/icons/icon";
import AlertDeleteProduk from "../Alert/alert_delete_berita";
import AlertUpdate from "../Alert/alert_update";
import ReactQuill from "react-quill";
import "quill/dist/quill.snow.css";
import { useMemo } from "react";

const DetailBerita = ({ detailBerita, dataKategori, dataUserAdmin }: { detailBerita: any; dataKategori: any; dataUserAdmin: any }) => {
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
    title: detailBerita?.title || "",
    kategori: detailBerita?.category?.id || "",
    author: detailBerita?.user?.id || "",
    deskripsi: detailBerita?.deskripsi || "",
    caption: detailBerita?.caption || "",
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

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    setEditData({
      ...editData,
      [name]: name === "kategori" || name === "author" ? parseInt(value) : value,
    });
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
    formData.append("category_id", editData.kategori.toString());
    formData.append("user_id", editData.author.toString());
    formData.append("caption", editData.caption);
    formData.append("deskripsi", editData.deskripsi);
    if (editData.image) {
      formData.append("image", editData.image);
    }

    try {
      const response = await fetch(`/api/databerita/update?id=${id}`, {
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

  function uploadToLaravel(file: File): Promise<string> {
    const formData = new FormData();
    formData.append("upload", file); // ✅ sesuai API yang kamu tunjukkan

    return fetch("https://inhforhumanity.org/api/news/upload-media", {
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

  useEffect(() => {
    if (detailBerita) {
      setEditData((prev) => ({
        ...prev,
        deskripsi: detailBerita.deskripsi || "",
      }));
    }
  }, [detailBerita]);

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
          <div className="w-50 font-semibold">Author</div>
          <div className="text-[#4A4D4F] capitalize">{detailBerita?.user?.name}</div>
        </div>

        <div className="flex gap-7">
          <div className="w-50 font-semibold">Kategori</div>
          <div className="text-[#4A4D4F] capitalize">{detailBerita?.category?.nama}</div>
        </div>

        <div className="flex gap-7">
          <div className="w-50 font-semibold">Caption</div>
          <div className="text-[#4A4D4F] capitalize">{detailBerita?.caption}</div>
        </div>

        <div className="flex gap-7">
          <div className="w-50 font-semibold">Tanggal Dibuat</div>
          <div className="text-[#4A4D4F]">{new Date(detailBerita?.created_at).toLocaleDateString()}</div>
        </div>

        <div className="flex flex-col gap-3">
          <div className="w-50 font-semibold">Deskripsi :</div>
          <div className="text-[#4A4D4F]" dangerouslySetInnerHTML={{ __html: detailBerita?.deskripsi }} />
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

      {isPopupOpenEdit && (
        <div className="fixed inset-0 flex items-center justify-center bg-black-2 bg-opacity-70 z-999999">
          <div className="bg-white p-8 rounded-2xl shadow-lg w-[500px] max-h-[90vh] overflow-auto xl:ms-60">
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-xl font-semibold text-black-2">Edit Berita</h2>
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
                <select name="kategori" value={editData.kategori} onChange={(e) => setEditData({ ...editData, kategori: parseInt(e.target.value) })} className="border px-3 py-2 rounded">
                  <option value="">Pilih Kategori</option>
                  {dataKategori.map((kategori: any) => (
                    <option key={kategori.id} value={kategori.id}>
                      {kategori.nama}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-medium">Author</label>
                <select name="author" value={editData.author} onChange={(e) => setEditData({ ...editData, author: parseInt(e.target.value) })} className="border px-3 py-2 rounded">
                  <option value="">Pilih Author</option>
                  {dataUserAdmin.map((user: any) => (
                    <option key={user.id} value={user.id}>
                      {user.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-medium">Caption</label>
                <input name="caption" type="text" value={editData.caption} onChange={handleEditChange} placeholder="Masukan caption" className="border px-3 py-2 rounded" />
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-medium">Deskripsi</label>
                <ReactQuill theme="snow" modules={modules} value={editData.deskripsi} onChange={(value: any) => setEditData({ ...editData, deskripsi: value })} className="bg-white" />
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

export default DetailBerita;
