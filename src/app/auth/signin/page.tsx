"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { IconPatternLogin, IconPatternLogin2, IconEye, IconEyeOff } from "../icons";
import { setCookie } from "cookies-next";
import { useRouter } from "next/navigation";

const validateEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const SignIn: React.FC = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [emailBorderColor, setEmailBorderColor] = useState("border-gray-300");

  useEffect(() => {
    if (email && !validateEmail(email)) {
      setEmailBorderColor("border-primary");
    } else {
      setEmailBorderColor("border-gray-300");
    }
  }, [email]);

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEmailError("");
    setPasswordError("");
    setError("");

    if (!email) {
      setEmailError("Email tidak boleh kosong.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Login gagal.");
      }

      const data = await response.json();
      console.log("Response data:", data.token);
      console.log("data", data);

      if (data && data.token) {
        setCookie("token", data.token, { path: "/" });
        router.push("/dashboard");
        window.location.reload();
      } else {
        setError("Token tidak ditemukan.");
      }
    } catch (err: any) {
      setError(err.message || "Login gagal.");
    } finally {
      setLoading(false);
    }
  };

  const isButtonDisabled = !email || !validateEmail(email) || !password || loading;

  return (
    <>
      <section className="bg-white text-primarydark ">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen h-screen lg:py-0 ">
          <div className="w-full  z-50 bg-white rounded-xl shadow md:mt-0 sm:max-w-md xl:p-0">
            <div className="p-6 sm:p-8">
              <Link href="#" className="flex justify-center items-center mb-6 text-2xl font-semibold">
                <Image className="mr-2" src="/images/logo/logo.png" alt="logo" width={112} height={32} />
              </Link>
              <h1 className="text-lg text-center mb-2 font-bold leading-tight tracking-tight md:text-2xl">Admin Panel INH</h1>

              {error && <p className="text-red-500 mb-4">{error}</p>}
              <form className="space-y-4 mb-6 md:space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="email" className="block mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`bg-gray-50 border  rounded-xl  block w-full p-3 ${emailBorderColor}`}
                    placeholder="email@gmail.com"
                    required
                  />
                  {emailError && <p className="text-red-500 phone:text-[9px] text-sm mt-1">{emailError}</p>}
                </div>
                <div>
                  <label htmlFor="password" className="block mb-2 dark:text-white">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className={`bg-gray-50 border rounded-xl focus:ring-primary focus:border-primary block w-full p-3 ${passwordError ? "border-primary" : ""}`}
                      required
                    />
                    <button type="button" onClick={handleTogglePasswordVisibility} className="absolute inset-y-0 right-3 flex items-center">
                      {showPassword ? <IconEyeOff /> : <IconEye />}
                    </button>
                  </div>
                  {passwordError && <p className="text-red-500 text-sm mt-1">{passwordError}</p>}
                </div>

                <button
                  type="submit"
                  className={`w-full text-white bg-primary hover:opacity-90 focus:ring-4 focus:outline-none focus:ring-primary font-medium rounded-3xl text-sm px-5 py-3 text-center ${
                    isButtonDisabled ? "opacity-50 cursor-not-allowed" : ""
                  } disabled:bg-[#F3F4F8] disabled:text-gray-400`}>
                  {loading ? "Loading" : "Masuk"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SignIn;
