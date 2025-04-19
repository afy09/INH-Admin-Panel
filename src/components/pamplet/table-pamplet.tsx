"use client";
import React, { useEffect, useState } from "react";
import { IoEyeOutline } from "react-icons/io5";
import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
import { Close } from "@/components/Campign/icons/icon";
import AlertUpdate from "../Alert/alert_update";
import { useRouter } from "next/navigation";
import AlertDelete from "../Alert/alert_delete";

const TablePamplet = ({ dataPamplet, currentPage, lastPage }: { dataPamplet: any; currentPage: number; lastPage: number }) => {
  const [isPopupOpenImage, setIsPopupOpenImage] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [method, setMethod] = useState("put");
  const [image, setimage] = useState<File | null>(null);
  const [link_banner, setlink_banner] = useState<string>("");
  const [openInNewTab, setOpenInNewTab] = useState(false);
  const router = useRouter();

  // DELETE
  const [selectedDeleteId, setSelectedDeleteId] = useState<string | null>(null);
  const [isPopupOpenDelete, setIsPopupOpenDelete] = useState(false);
  const handleOpenPopupDelete = (id: string) => {
    setSelectedDeleteId(id);
    setIsPopupOpenDelete(true);
  };
  const handleClosePopupDelete = () => setIsPopupOpenDelete(false);
  const [showPopupDelete, setShowPopupDelete] = useState(false);
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);

  const handleOpenPopupImage = (image: string) => {
    setSelectedImage(image);
    setIsPopupOpenImage(true);
  };
  const handleClosePopupImage = () => {
    setSelectedImage(null);
    setIsPopupOpenImage(false);
  };

  const [selectedEditId, setSelectedEditId] = useState<string | null>(null);
  const [isPopupOpenEdit, setIsPopupOpenEdit] = useState(false);
  const handleOpenPopupEdit = (id: string) => {
    const selected = dataPamplet.find((item: any) => item.id === id);
    if (selected) {
      setlink_banner(selected.link_banner || "");
      setOpenInNewTab(!!selected.open_in_new_tab); // Cast ke boolean
    }
    setSelectedEditId(id);
    setIsPopupOpenEdit(true);
  };

  const handleClosePopupEdit = () => setIsPopupOpenEdit(false);
  const [showPopupEdit, setShowPopupEdit] = useState(false);
  const [isLoadingEdit, setIsLoadingEdit] = useState(false);

  const handlePageChange = (newPage: number) => {
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("page", newPage.toString());
    router.push(`?${urlParams.toString()}`);
  };

  const handleEdit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedEditId) return;
    setIsLoadingEdit(true);
    try {
      const formData = new FormData();
      formData.append("_method", method);
      formData.append("valid", openInNewTab.toString());
      if (link_banner) {
        formData.append("link_banner", link_banner);
      }

      if (image) {
        formData.append("image", image);
      }
      const response = await fetch(`/api/dataPamplet/update?id=${selectedEditId}`, {
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

  const handleDelete = async () => {
    if (!selectedDeleteId) return;
    setIsLoadingDelete(true);
    try {
      const response = await fetch(`/api/dataPamplet/delete?id=${selectedDeleteId}`, {
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

  useEffect(() => {
    const selectedData = dataPamplet.find((item: any) => item.id === selectedEditId);
    if (selectedData) {
      setOpenInNewTab(selectedData.valid === "true");
    }
  }, [selectedEditId, dataPamplet]);

  return (
    <>
      <div className="m-3 w-full">
        <div className="mt-5 grid grid-cols-3 gap-3 ps-1 pe-6">
          {dataPamplet?.map((media: any) => (
            <div key={media.id} className="border rounded-lg p-4 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <img src={media.image} alt={media.name} className="w-full h-40 object-cover rounded-t-lg" />

              <div className="mt-2 w-full flex justify-center gap-1">
                <div className="bg-primary rounded-lg py-2 w-full flex justify-center cursor-pointer" onClick={() => handleOpenPopupImage(media.image)}>
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

      {dataPamplet && dataPamplet.length > 0 && (
        <div className="flex justify-end items-center mt-6 mb-3 me-2 text-[12px]">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage <= 1}
            className={`px-4 py-2 mx-1 rounded ${currentPage <= 1 ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-primary text-white cursor-pointer"}`}>
            Prev
          </button>
          <span className="px-4 py-2 mx-1 text-primary border border-primary rounded">{`Page ${currentPage} of ${lastPage}`}</span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage >= lastPage}
            className={`px-4 py-2 mx-1 rounded  ${currentPage >= lastPage ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-primary text-white cursor-pointer"}`}>
            Next
          </button>
        </div>
      )}

      {isPopupOpenImage && selectedImage && (
        <div className="fixed inset-0 flex items-center justify-center bg-black-2 bg-opacity-70 z-999999">
          <div className="bg-white text-black-2 p-4 rounded-lg shadow-lg w-[600px] xl:ms-55">
            <div className="flex justify-end items-center mb-7">
              <div onClick={handleClosePopupImage} className="cursor-pointer">
                <Close />
              </div>
            </div>
            <div className="flex justify-center mb-3">
              <img src={selectedImage} alt="Banner" width={500} height={400} className="rounded-lg" />
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
                <label className="block mb-2 text-black-2 font-medium">Upload Gambar</label>
                <div className="bg-gray-100 px-4 py-3 w-full text-black-2 rounded-lg flex items-center gap-2">
                  <input type="file" accept=".jpg,.jpeg,.png" onChange={(e) => setimage(e.target.files ? e.target.files[0] : null)} />
                </div>

                <label className="block mt-3 mb-2 text-black-2 font-medium">link</label>
                <div className="bg-gray-100 px-4 py-3 w-full text-black-2 rounded-lg flex items-center gap-2">
                  <input
                    className="bg-gray-100 outline-none w-full"
                    type="text"
                    value={link_banner}
                    onChange={(e) => setlink_banner(e.target.value)}
                    placeholder={dataPamplet.find((item: any) => item.id === selectedEditId)?.link_banner ?? ""}
                  />
                </div>

                <div className="mt-3 flex items-center gap-2">
                  <input type="checkbox" id="openInNewTab" checked={openInNewTab} onChange={(e) => setOpenInNewTab(e.target.checked)} />
                  <label htmlFor="openInNewTab" className="text-black-2 font-medium">
                    Open link in new tab
                  </label>
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

      {isPopupOpenDelete && (
        <div className="fixed inset-0 flex items-center justify-center bg-black-2 bg-opacity-70 z-999999">
          <div className="bg-white p-8 rounded-2xl shadow-lg  ms-90 me-22">
            <div className="flex justify-end -mt-3 cursor-pointer" onClick={handleClosePopupDelete}>
              <Close />
            </div>
            <h1 className="text-black-2 font-medium text-xl text-center mt-3">
              Apakah anda yakin <br /> ingin menghapus Pamplet ini ?
            </h1>

            <div className="mt-6 flex justify-center gap-2">
              <button className="px-12 py-2 bg-red-600 text-white rounded-lg" onClick={handleDelete}>
                {isLoadingDelete ? `Menghapus....` : `Hapus`}
              </button>
              <button className="px-12 py-2 border border-black-2 text-black-2 rounded-lg" onClick={handleClosePopupDelete}>
                Tidak
              </button>
            </div>
          </div>
        </div>
      )}

      {showPopupDelete && <AlertDelete />}

      {showPopupEdit && <AlertUpdate />}
    </>
  );
};

export default TablePamplet;
