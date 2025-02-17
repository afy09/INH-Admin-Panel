import "jsvectormap/dist/jsvectormap.css";
import "flatpickr/dist/flatpickr.min.css";
import { Poppins } from "next/font/google";
import "@/css/style.css";
import React from "react";

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <div
          className={`${poppins.className} dark:bg-boxdark-2 dark:text-bodydark`}
        >
          {children}
        </div>
      </body>
    </html>
  );
}
