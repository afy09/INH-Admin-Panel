"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import ClickOutside from "@/components/ClickOutside";
import { useAdmin } from "@/app/context/dataAdmin/store";

const DropdownUser = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { dataAdmin } = useAdmin();
  return (
    <ClickOutside onClick={() => setDropdownOpen(false)} className="relative">
      <Link onClick={() => setDropdownOpen(!dropdownOpen)} className="flex items-center gap-4" href="#">
        <span className="h-12 w-12 rounded-full">
          <Image
            width={112}
            height={116}
            src={"/images/logo/logo.png"}
            style={{
              width: "auto",
              height: "auto",
            }}
            alt="User"
          />
        </span>
        <span className="hidden text-left lg:block">
          <span className="block  font-medium text-black-2 dark:text-white">{dataAdmin?.name}</span>
          <span className="block text-sm  text-black dark:text-white">{dataAdmin?.role === "super-admin" ? "Super Admin" : dataAdmin?.role}</span>
        </span>
      </Link>
    </ClickOutside>
  );
};

export default DropdownUser;
