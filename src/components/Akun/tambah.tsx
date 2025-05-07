"use client";
import React, { useState } from "react";
import { ArrowBack } from "@/components/Campign/icons/icon";
import Link from "next/link";
import AlertSuccses from "../Alert/alert_sukses";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

const TambahAkun = () => {
  const [title, setTitle] = useState(""); // Nama akun
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const validatePassword = (value: string) => {
    const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])/;
    if (!regex.test(value)) {
      setPasswordError("Password harus mengandung huruf besar, angka, dan simbol.");
    } else {
      setPasswordError("");
    }
  };

  const isValid = title && email && role && password;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const payload = {
        name: title,
        email,
        role,
        password,
      };

      const response = await fetch("/api/dataakun/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
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
        <Link href="/dashboard/akun">
          <div className="text-[22px] text-black-2 font-semibold flex gap-3 items-center mb-10">
            <ArrowBack />
            Tambah Akun
          </div>
        </Link>

        <form onSubmit={handleSubmit}>
          {/* Nama dan Email */}
          <div className="flex gap-3 w-full">
            <div className="w-full">
              <label className="block mb-2 text-black-2 font-medium">Nama Akun</label>
              <input type="text" className="bg-gray-100 outline-none px-4 py-3 w-full text-black-2 placeholder:text-[#DEE4EE] rounded-lg" placeholder="Masukkan Nama Akun" value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div className="w-full">
              <label className="block mb-2 text-black-2 font-medium">Email</label>
              <input type="email" className="bg-gray-100 outline-none px-4 py-3 w-full text-black-2 placeholder:text-[#DEE4EE] rounded-lg" placeholder="Masukkan Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
          </div>

          {/* Role dan Password */}
          <div className="flex gap-3 w-full mt-6">
            <div className="w-full">
              <label className="block mb-2 text-black-2 font-medium">Role</label>
              <select value={role} onChange={(e) => setRole(e.target.value)} className="bg-gray-100 outline-none px-4 py-3 w-full text-black-2 rounded-lg">
                <option value="">Pilih Role</option>
                <option value="super-admin">Super Admin</option>
                <option value="Media">Media</option>
                <option value="Fundraising">Fundraising</option>
              </select>
            </div>

            <div className="w-full">
              <label className="block mb-2 text-black-2 font-medium">Password</label>
              <div className="bg-gray-100 px-4 py-3 w-full text-black-2 rounded-lg flex items-center gap-2">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    validatePassword(e.target.value);
                  }}
                  className="flex-grow outline-none bg-transparent"
                  placeholder="Masukkan Password"
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <FaEye size={18} /> : <FaEyeSlash size={18} />}
                </button>
              </div>

              {passwordError && <p className="text-red-500 text-sm mt-1">{passwordError}</p>}
            </div>
          </div>

          {/* Submit */}
          <div className="mt-5 flex gap-2 justify-end">
            <button type="submit" className={`px-12 py-2 rounded-lg ${isValid ? "bg-amber-400 text-white" : "bg-gray-300 text-gray-500 cursor-not-allowed"}`} disabled={!isValid || isLoading || !!passwordError}>
              {isLoading ? "Mengirim..." : "Submit"}
            </button>
          </div>
        </form>
      </div>

      {showPopup && <AlertSuccses />}
    </>
  );
};

export default TambahAkun;
