"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const PageKerjaSama = () => {
  const tabs = [
    { label: "Mitra Media & Publikasi", path: "/dashboard/kerja-sama", id: 1 },
    { label: "Mitra Lembaga", path: "/dashboard/kerja-sama/lembaga", id: 2 },
  ];
  const currentPath = usePathname();
  const [isClicked, setIsClicked] = useState(false);
  const handleTabClick = (id: number) => {
    setIsClicked(true);
  };

  const addButtonConfig = {
    "/dashboard/kerja-sama": { text: "Tambah Mitra Media", href: "/dashboard/kerja-sama/media/tambah-media" },
    "/dashboard/kerja-sama/lembaga": { text: "Tambah Mitra Lembaga", href: "/dashboard/kerja-sama/lembaga/tambah-lembaga" },
  } as const;

  const addButtonText = addButtonConfig[currentPath as keyof typeof addButtonConfig]?.text ?? "Tambah";
  const addButtonHref = addButtonConfig[currentPath as keyof typeof addButtonConfig]?.href ?? "#";

  return (
    <>
      <div className="flex justify-between px-4 py-4 ">
        {/* Tabs Navigation */}
        <div className="flex items-center gap-4">
          {tabs.map((tab) => (
            <Link
              key={tab.label}
              href={tab.path}
              onClick={() => handleTabClick(tab.id)}
              className={`px-4 py-2 border-b capitalize transition-all  ${currentPath === tab.path ? "text-primary border-primary" : " text-[#828282] border-[#828282]"} ${isClicked ? "animate-pulse" : ""}`}>
              {tab.label}
            </Link>
          ))}
        </div>

        <Link href={addButtonHref}>
          <div className="border border-primary px-6 py-2 rounded-lg text-primary cursor-pointer">{addButtonText}</div>
        </Link>
      </div>
    </>
  );
};

export default PageKerjaSama;
