"use client";
import "jsvectormap/dist/jsvectormap.css";
import "flatpickr/dist/flatpickr.min.css";
import { Poppins } from "next/font/google";
import "@/css/style.css";
import React, { useEffect } from "react";
import NProgress from "nprogress";
import { usePathname } from "next/navigation";

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

const NProgressLoader = () => {
  const pathname = usePathname();

  useEffect(() => {
    NProgress.configure({ showSpinner: false });
    const style = document.createElement("style");
    style.innerHTML = `
    #nprogress .bar {
      background-color: #F6DC43; 
      height: 2px;
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      z-index: 99999;
    }
    
     `;
    document.head.appendChild(style);

    const handleStart = () => NProgress.start();
    const handleStop = () => NProgress.done();

    document.addEventListener("click", (event) => {
      const target = event.target as HTMLElement;
      const link = target.closest("a");
      if (link && link.href !== window.location.href) {
        handleStart();
      }
    });

    handleStop();

    return () => {
      handleStop();
    };
  }, [pathname]);

  return null;
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <NProgressLoader />
        <div className={`${poppins.className} dark:bg-boxdark-2 dark:text-bodydark`}>{children}</div>
      </body>
    </html>
  );
}
