import React from "react";
import Link from "next/link";
import Image from "next/image";
import SidebarItem from "@/components/Sidebar/SidebarItem";
import ClickOutside from "@/components/ClickOutside";
import useLocalStorage from "@/hooks/useLocalStorage";
import { IconMenuBeranda, IconMenuLogout, IconMenuPengguna, IconMenuPerusahaan, IconMenuProyek, IconMenuSaldo, IconMenuTransaksi, IconMenuUmum } from "./icons";
import { removeToken } from "@/libs/axiosInstance";
import { deleteCookie } from "cookies-next";
import { useRouter } from "next/navigation";

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

const menuGroups = [
  {
    name: "Menu Utama",
    menuItems: [
      {
        icon: <IconMenuBeranda />,
        label: "Berita",
        route: "/dashboard",
      },
      {
        icon: <IconMenuPerusahaan />,
        label: "Campaign",
        route: "/dashboard/campign",
      },
      {
        icon: <IconMenuSaldo />,
        label: "Proyek",
        route: "/dashboard/saldo",
      },
      {
        icon: <IconMenuTransaksi />,
        label: "Program",
        route: "/dashboard/transaksi",
      },
      {
        icon: <IconMenuProyek />,
        label: "Pengumuman",
        route: "//dashboard/saldo",
      },
      {
        icon: <IconMenuLogout />,
        label: "Logout",
        route: "/", // Tambahkan rute default
        action: "logout", // Tambahkan aksi logout
      },
    ],
  },
];

const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const router = useRouter();
  const [pageName, setPageName] = useLocalStorage("selectedMenu", "dashboard");

  const handleLogout = () => {
    removeToken();
    deleteCookie("token", { path: "/" });
    router.push("/");
    window.location.reload(); // Refresh halaman
  };

  return (
    <ClickOutside onClick={() => setSidebarOpen(false)}>
      <aside className={`fixed left-0 top-0 z-9999 flex h-screen w-72.5 flex-col overflow-y-hidden bg-boxdark duration-300 ease-linear dark:bg-boxdark lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
        {/* SIDEBAR HEADER */}
        <div className="flex items-center justify-between lg:mt-5 gap-2 px-6  py-5.5 lg:py-0">
          <Link href="/">
            <Image width={200} height={32} src={"/images/logo/logoinh.png"} alt="Logo" priority />
          </Link>
        </div>
        {/* SIDEBAR HEADER */}

        <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
          {/* Sidebar Menu */}
          <nav className="mt-5 px-4 py-4 lg:mt-9 lg:px-6">
            {menuGroups.map((group, groupIndex) => (
              <div key={groupIndex}>
                <h3 className="mb-4 ml-4 text-[15px] text-gray-400">{group.name}</h3>

                <ul className="mb-6 flex flex-col gap-1.5">
                  {group.menuItems.map((menuItem, menuIndex) => (
                    <li key={menuIndex}>
                      {menuItem.action === "logout" ? (
                        <button onClick={handleLogout} className="flex items-center text-bodydark1 px-4 py-2 gap-2  text-left w-full">
                          {menuItem.icon}
                          {menuItem.label}
                        </button>
                      ) : (
                        <SidebarItem item={menuItem} pageName={pageName} setPageName={setPageName} />
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
          {/* Sidebar Menu */}
        </div>
      </aside>
    </ClickOutside>
  );
};

export default Sidebar;
