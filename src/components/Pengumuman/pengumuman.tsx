"use client";
import React, { useEffect, useState } from "react";
import { IoEyeOutline } from "react-icons/io5";
import { FaRegEdit } from "react-icons/fa";
import { Close } from "@/components/Campign/icons/icon";
import AlertUpdate from "../Alert/alert_update";

const TablePengumuman = ({ dataPengumuman }: { dataPengumuman: any }) => {
  const [isPopupOpenImage, setIsPopupOpenImage] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [image, setimage] = useState<File | null>(null);
  const [link_pengumuman, setlink_pengumuman] = useState<string>("");
  const [openInNewTab, setOpenInNewTab] = useState(false);
  const [method, setMethod] = useState("put");

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

  const handleEdit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedDeleteId) return;
    setIsLoadingDelete(true);
    try {
      const formData = new FormData();
      formData.append("_method", method);
      formData.append("valid", openInNewTab.toString());
      if (link_pengumuman) {
        formData.append("link_pengumuman", link_pengumuman);
      }

      if (image) {
        formData.append("image", image);
      }
      const response = await fetch(`/api/dataPengumuman/pengumuman/update?id=${selectedDeleteId}`, {
        method: "POST",
        body: formData,
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
    const selectedData = dataPengumuman.find((item: any) => item.id === selectedDeleteId);
    if (selectedData) {
      setOpenInNewTab(selectedData.valid === "true");
    }
  }, [selectedDeleteId, dataPengumuman]);

  return (
    <>
      <div className="m-3 w-full">
        <div className="mt-5 grid grid-cols-2 gap-3 ps-1 pe-6">
          {dataPengumuman?.map((media: any) => (
            <div key={media.id} className="border rounded-lg p-4 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <img src={media.image} alt={media.name} className="w-full h-60 object-cover rounded-t-lg" />

              <div className="mt-2 w-full flex justify-center gap-1">
                <div className="bg-primary rounded-lg py-2 w-full flex justify-center cursor-pointer" onClick={() => handleOpenPopupImage(media.image)}>
                  <IoEyeOutline className="text-white" />
                </div>
                <div className="bg-green-900 rounded-lg py-2 w-full flex justify-center cursor-pointer" onClick={() => handleOpenPopupDelete(media.id)}>
                  <FaRegEdit className="text-white" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {isPopupOpenImage && selectedImage && (
        <div className="fixed inset-0 flex items-center justify-center bg-black-2 bg-opacity-70 z-999999">
          <div className="bg-white text-black-2 p-4 rounded-lg shadow-lg w-[600px] xl:ms-55">
            <div className="flex justify-end items-center mb-7">
              <div onClick={handleClosePopupImage} className="cursor-pointer">
                <Close />
              </div>
            </div>
            <div className="flex justify-center mb-3">
              <img src={selectedImage} alt="Banner" width={600} height={500} className="rounded-lg" />
            </div>
          </div>
        </div>
      )}

      {isPopupOpenDelete && (
        <div className="fixed inset-0 flex items-center justify-center bg-black-2 bg-opacity-70 z-999999">
          <div className="bg-white p-8 rounded-2xl shadow-lg ms-90 me-22">
            <div className="flex justify-end -mt-3 cursor-pointer" onClick={handleClosePopupDelete}>
              <Close />
            </div>
            <form onSubmit={handleEdit} className="mt-2">
              <div className="flex flex-col">
                <label className="block mb-2 text-black-2 font-medium">Upload Gambar</label>
                <div className="bg-gray-100 px-4 py-3 w-full text-black-2 rounded-lg flex items-center gap-2">
                  <input type="file" accept=".jpg,.jpeg,.png" onChange={(e) => setimage(e.target.files ? e.target.files[0] : null)} />
                </div>
              </div>

              <label className="block mt-3 mb-2 text-black-2 font-medium">link</label>
              <div className="bg-gray-100 px-4 py-3 w-full text-black-2 rounded-lg flex items-center gap-2">
                <input
                  className="bg-gray-100 outline-none w-full placeholder:text-black-2"
                  type="text"
                  value={link_pengumuman}
                  onChange={(e) => setlink_pengumuman(e.target.value)}
                  placeholder={dataPengumuman.find((item: any) => item.id === selectedDeleteId)?.link_pengumuman ?? ""}
                />
              </div>

              <div className="mt-3 flex items-center gap-2">
                <input type="checkbox" id="openInNewTab" checked={openInNewTab} onChange={(e) => setOpenInNewTab(e.target.checked)} />
                <label htmlFor="openInNewTab" className="text-black-2 font-medium">
                  Open link in new tab
                </label>
              </div>
              <div className="mt-6 flex justify-center gap-2">
                <button className="px-12 py-2 border border-black-2 text-black-2 rounded-lg" onClick={handleClosePopupDelete}>
                  Tidak
                </button>

                <button type="submit" className="px-12 py-2 bg-primary text-white rounded-lg">
                  {isLoadingDelete ? `Loading...` : `Simpan`}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showPopupDelete && <AlertUpdate />}
    </>
  );
};

export default TablePengumuman;
