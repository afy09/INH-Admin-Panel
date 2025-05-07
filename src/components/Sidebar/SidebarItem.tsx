import React from "react";
import Link from "next/link";
import SidebarDropdown from "@/components/Sidebar/SidebarDropdown";
import { usePathname } from "next/navigation";

const SidebarItem = ({ item, pageName, setPageName }: any) => {
  const handleClick = () => {
    const updatedPageName = pageName !== item.label.toLowerCase() ? item.label.toLowerCase() : "";
    return setPageName(updatedPageName);
  };

  const pathname = usePathname();

  const isActive = (item: any) => {
    if (item.route === pathname) return true;
    if (pathname.includes("campign") && item.route && item.route.includes("campign")) {
      return true;
    }
    if (pathname.includes("berita") && item.route && item.route.includes("berita")) {
      return true;
    }
    if (pathname.includes("distribusi-program") && item.route && item.route.includes("distribusi-program")) {
      return true;
    }
    if (pathname.includes("kerja-sama") && item.route && item.route.includes("kerja-sama")) {
      return true;
    }
    if (pathname.includes("pengumuman") && item.route && item.route.includes("pengumuman")) {
      return true;
    }
    if (pathname.includes("struktur") && item.route && item.route.includes("struktur")) {
      return true;
    }
    if (pathname.includes("akun") && item.route && item.route.includes("akun")) {
      return true;
    }
    if (pathname.includes("transaksi") && item.route && item.route.includes("transaksi")) {
      return true;
    }
    if (item.children) {
      return item.children.some((child: any) => isActive(child));
    }
    return false;
  };

  const isItemActive = isActive(item);

  return (
    <>
      <Link
        href={item.route}
        onClick={handleClick}
        className={`${isItemActive ? "bg-[#F035240D] text-primary font-semibold  dark:bg-meta-4" : ""} group relative flex items-center gap-2.5 rounded-sm px-4 py-2  text-bodydark1 duration-300 ease-in-out hover:bg-[#e162530d] dark:hover:bg-meta-4`}>
        {item.icon}
        {item.label}
      </Link>

      {item.children && (
        <div className={`translate transform overflow-hidden ${pageName !== item.label.toLowerCase() && "hidden"}`}>
          <SidebarDropdown item={item.children} />
        </div>
      )}
    </>
  );
};

export default SidebarItem;
