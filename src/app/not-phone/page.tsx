"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function NotPhonePage() {
  const router = useRouter();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        router.push("/dashboard");
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [router]);

  return (
    <div className="flex flex-col gap-3 items-center mx-auto h-screen justify-center text-center px-4 overflow-hidden transition-all -mt-10">
      <div>
        <Image className="mr-2" src="/images/logo/logo.png" alt="logo" width={80} height={80} />
      </div>
      <div className="text-red-600 text-xl font-semibold">PERINGATAN !</div>
      <div className="text-black-2 text-sm mx-4 max-w-96">Maaf, website ini tidak tersedia untuk perangkat dengan layar kecil. Silakan akses menggunakan tablet, laptop atau perangkat dengan layar lebih besar.</div>
    </div>
  );
}
