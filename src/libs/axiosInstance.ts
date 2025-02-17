"use server";
import axios, { InternalAxiosRequestConfig } from "axios";
import { getCookie } from "cookies-next";
import { cookies } from "next/headers";

const axiosInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_BASE_URL}`,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const cookieStore = cookies();
    const token = cookieStore.get("token")?.value;
    config.headers = config.headers || {};
    if (typeof window === "undefined") {
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
    } else {
      const clientToken = getCookie("token");
      if (clientToken) {
        config.headers["Authorization"] = clientToken;
      }
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const removeToken = () => {
  if (typeof window === "undefined") {
    cookies().delete("token");
  }
};
export default axiosInstance;
