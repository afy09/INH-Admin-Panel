"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { IconEye, IconEyeOff } from "../icons";
import { setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
// @ts-ignore — fallback kalau definisi tipe belum sinkron
import ReCAPTCHA from "react-google-recaptcha";

const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const LoginCaptcha: React.FC = () => {
  const router = useRouter();
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [emailBorderColor, setEmailBorderColor] = useState("border-gray-300");
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);

  // 🔍 Validasi email dinamis
  useEffect(() => {
    if (email && !validateEmail(email)) setEmailBorderColor("border-primary");
    else setEmailBorderColor("border-gray-300");
  }, [email]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setEmailError("");
    setPasswordError("");

    if (!email) {
      setEmailError("Email tidak boleh kosong.");
      return;
    }

    if (!password) {
      setPasswordError("Password tidak boleh kosong.");
      return;
    }

    if (!captchaToken) {
      setError("Silakan verifikasi captcha terlebih dahulu.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/login-captcha`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, captcha: captchaToken }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login gagal.");
      }

      if (data && data.token) {
        setCookie("token", data.token, { path: "/" });
        router.push("/dashboard");
        window.location.reload();
      } else {
        setError("Token tidak ditemukan di respons server.");
      }
    } catch (err: any) {
      console.error("Login error:", err);
      setError(err.message || "Terjadi kesalahan pada login.");
      recaptchaRef.current?.reset(); // 🔄 reset captcha jika gagal
      setCaptchaToken(null);
    } finally {
      setLoading(false);
    }
  };

  const isButtonDisabled = !email || !validateEmail(email) || !password || !captchaToken || loading;

  return (
    <section className="bg-white text-primarydark">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen h-screen lg:py-0">
        <div className="w-full z-50 bg-white rounded-xl shadow md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 sm:p-8">
            <Link href="#" className="flex justify-center items-center mb-6 text-2xl font-semibold">
              <Image src="/images/logo/logo.png" alt="logo" width={112} height={32} />
            </Link>

            <h1 className="text-lg text-center mb-2 font-bold leading-tight tracking-tight md:text-2xl">Admin Panel INH</h1>

            {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

            <form onSubmit={handleSubmit} className="space-y-4 mb-6 md:space-y-6">
              {/* Email */}
              <div>
                <label htmlFor="email" className="block mb-2">
                  Email
                </label>
                <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className={`bg-gray-50 border rounded-xl block w-full p-3 ${emailBorderColor}`} placeholder="email@gmail.com" />
                {emailError && <p className="text-red-500 text-sm mt-1">{emailError}</p>}
              </div>

              {/* Password */}
              <div>
                <label htmlFor="password" className="block mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`bg-gray-50 border rounded-xl block w-full p-3 ${passwordError ? "border-primary" : ""}`}
                    placeholder="••••••••"
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-3 flex items-center">
                    {showPassword ? <IconEyeOff /> : <IconEye />}
                  </button>
                </div>
                {passwordError && <p className="text-red-500 text-sm mt-1">{passwordError}</p>}
              </div>

              {/* 🧩 Google reCAPTCHA */}
              <div className="flex justify-center mt-4">
                <ReCAPTCHA ref={recaptchaRef} sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!} onChange={(token: React.SetStateAction<string | null>) => setCaptchaToken(token)} onExpired={() => setCaptchaToken(null)} />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isButtonDisabled}
                className={`w-full text-white bg-primary hover:opacity-90 focus:ring-4 focus:outline-none font-medium rounded-3xl text-sm px-5 py-3 text-center ${isButtonDisabled ? "opacity-50 cursor-not-allowed" : ""}`}>
                {loading ? "Loading..." : "Masuk"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginCaptcha;
