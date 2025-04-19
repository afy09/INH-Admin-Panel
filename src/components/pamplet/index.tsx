"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";

const PagePamplet = () => {
  const tabs = [{ label: "Pamplet", path: "/dashboard/pamplet", id: 1 }];
  const currentPath = usePathname();
  const [isClicked, setIsClicked] = useState(false);
  const handleTabClick = (id: number) => {
    setIsClicked(true);
  };

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

        <Link href="/dashboard/pamplet/tambah">
          <div className="px-4 py-3">
            <button className="bg-amber-400 px-6 py-2 text-white rounded-lg flex justify-center gap-2 items-center">
              <FaPlus />
              Tambah
            </button>
          </div>
        </Link>
      </div>
    </>
  );
};

export default PagePamplet;
