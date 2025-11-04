"use client";
import Link from "next/link";
import React, { useState } from "react";
import { FaEye, FaEyeSlash, FaPlus } from "react-icons/fa";
import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
import { Close } from "../Campign/icons/icon";
import AlertDelete from "../Alert/alert_delete";
import AlertUpdate from "../Alert/alert_update";

const Akun = ({ dataUserAdmin }: { dataUserAdmin: any }) => {
  const [selectedDeleteId, setSelectedDeleteId] = useState<string | null>(null);
  const [isPopupOpenDelete, setIsPopupOpenDelete] = useState(false);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [passwordError, setPasswordError] = useState("");
  const validatePassword = (value: string) => {
    const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])/;
    if (!regex.test(value)) {
      setPasswordError("Password harus mengandung huruf besar, angka, dan simbol.");
    } else {
      setPasswordError("");
    }
  };
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
      const response = await fetch(`/api/dataakun/delete?id=${selectedDeleteId}`, {
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

  //   EDIT
  const [isPopupOpenEdit, setIsPopupOpenEdit] = useState(false);
  const [selectedEditData, setSelectedEditData] = useState<any>(null);
  const [isLoadingEdit, setIsLoadingEdit] = useState(false);
  const [showPopupEdit, setShowPopupEdit] = useState(false);

  const handleOpenPopupEdit = (data: any) => {
    setSelectedEditData(data);
    setIsPopupOpenEdit(true);
  };

  const handleClosePopupEdit = () => {
    setIsPopupOpenEdit(false);
    setSelectedEditData(null);
  };

  const handleEditSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoadingEdit(true);

    try {
      const dataToSend: Record<string, string> = {};
      if (selectedEditData?.name) dataToSend.name = selectedEditData.name;
      if (selectedEditData?.email) dataToSend.email = selectedEditData.email;
      if (selectedEditData?.role) dataToSend.role = selectedEditData.role;
      if (password) dataToSend.password = password;

      const response = await fetch(`/api/dataakun/update?id=${selectedEditData.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });

      if (response.ok) {
        setIsPopupOpenEdit(false);
        setShowPopupEdit(true);
      } else {
        console.error("Error:", await response.json());
      }
    } catch (error) {
      console.error("Error submitting edit:", error);
    } finally {
      setIsLoadingEdit(false);
    }
  };

  return (
    <>
      <div className="border rounded-lg px-6 py-4">
        <div className="flex justify-between mt-3">
          <h1 className="text-black-2  font-semibold text-xl">Akun</h1>

          <Link href="/dashboard/akun/tambah">
            <div className="">
              <button className="bg-amber-400 px-6 py-2 text-white rounded-lg flex justify-center gap-2 items-center">
                <FaPlus />
                Tambah
              </button>
            </div>
          </Link>
        </div>

        {dataUserAdmin?.map((admin: any) => (
          <div key={admin.id} className="border rounded-lg p-3 mt-4 flex justify-between items-center">
            <div className="flex items-center gap-4">
              <img src="/images/icon/akuninh.svg" alt="" />

              <div className="text-black-2 ">
                <p className="font-semibold">{admin?.name}</p>
                <p className="text-gray-700 text-xs capitalize">{admin?.role}</p>
              </div>
            </div>

            <div className=" flex gap-4">
              <div onClick={() => handleOpenPopupEdit(admin)} className="p-2 bg-green-700 text-white rounded-lg cursor-pointer">
                <FaRegEdit />
              </div>

              <div onClick={() => handleOpenPopupDelete(admin.id)} className="p-2 bg-red-700 text-white rounded-lg cursor-pointer">
                <FaRegTrashAlt />
              </div>
            </div>
          </div>
        ))}
      </div>

      {isPopupOpenDelete && (
        <div className="fixed inset-0 flex items-center justify-center bg-black-2 bg-opacity-70 z-999999">
          <div className="bg-white p-8 rounded-2xl shadow-lg  ms-90 me-22">
            <div className="flex justify-end -mt-3 cursor-pointer" onClick={handleClosePopupDelete}>
              <Close />
            </div>
            <h1 className="text-black-2 font-medium text-xl text-center mt-3">
              Apakah anda yakin <br /> ingin menghapus Akun ini ?
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
          <div className="bg-white p-8 rounded-2xl shadow-lg ms-90 me-22 w-[400px]">
            <div className="flex justify-end -mt-3 cursor-pointer" onClick={handleClosePopupEdit}>
              <Close />
            </div>
            <h1 className="text-black-2 font-medium text-xl text-center mt-3 mb-4">Edit Akun</h1>

            <form onSubmit={handleEditSubmit}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Nama</label>
                  <input
                    type="text"
                    value={selectedEditData.name}
                    onChange={(e) => setSelectedEditData({ ...selectedEditData, name: e.target.value })}
                    className="bg-gray-100 outline-none px-4 py-2 w-full text-black-2 placeholder:text-[#DEE4EE] rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    value={selectedEditData.email}
                    onChange={(e) => setSelectedEditData({ ...selectedEditData, email: e.target.value })}
                    className="bg-gray-100 outline-none px-4 py-2 w-full text-black-2 placeholder:text-[#DEE4EE] rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Role</label>

                  <select value={selectedEditData.role} onChange={(e) => setSelectedEditData({ ...selectedEditData, role: e.target.value })} className="bg-gray-100 outline-none px-4 py-2 w-full text-black-2 rounded-lg">
                    <option value="">-- Pilih Role --</option>
                    <option value="super-admin">Super Admin</option>
                    <option value="super-admin-dev">Super Admin (DEV)</option>
                    <option value="Media">Media</option>
                    <option value="Fundraising">Fundraising</option>
                  </select>
                </div>

                <div className="w-full">
                  <label className="block text-sm font-medium text-gray-700">Password</label>
                  <div className="bg-gray-100 px-4 py-2 w-full text-black-2 rounded-lg flex items-center gap-2">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        validatePassword(e.target.value);
                      }}
                      className="flex-grow outline-none bg-transparent items-center"
                      placeholder="Masukkan Password"
                    />
                    <button type="button" onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? <FaEye size={18} /> : <FaEyeSlash size={18} />}
                    </button>
                  </div>

                  {passwordError && <p className="text-red-500 text-xs mt-1">{passwordError}</p>}
                </div>
              </div>

              <div className="mt-6 flex justify-center gap-2">
                <button className="px-12 py-2 bg-primary text-white rounded-lg" type="submit">
                  {isLoadingEdit ? `Loading ....` : `Simpan`}
                </button>
                <button className="px-12 py-2 border border-black-2 text-black-2 rounded-lg" onClick={handleClosePopupEdit}>
                  Batal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showPopupDelete && <AlertDelete />}
      {showPopupEdit && <AlertUpdate />}
    </>
  );
};

export default Akun;
