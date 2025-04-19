import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import SidebarItem from "@/components/Sidebar/SidebarItem";
import ClickOutside from "@/components/ClickOutside";
import useLocalStorage from "@/hooks/useLocalStorage";
import { IoNewspaperOutline } from "react-icons/io5";
import { SiGooglecampaignmanager360 } from "react-icons/si";
import { MdOutlineCampaign } from "react-icons/md";
import { RiHome5Line } from "react-icons/ri";
import { IoExitOutline } from "react-icons/io5";
import { VscOrganization } from "react-icons/vsc";
import { FaHandshake } from "react-icons/fa";
import { GrProjects } from "react-icons/gr";
import { FaDiagramProject } from "react-icons/fa6";
import { FaCodePullRequest } from "react-icons/fa6";
import { removeToken } from "@/libs/axiosInstance";
import { deleteCookie } from "cookies-next";
import { usePathname, useRouter } from "next/navigation";
import { useAdmin } from "@/app/context/dataAdmin/store";

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

const menuGroups = [
  {
    name: "Menu Utama",
    menuItems: [
      {
        icon: <RiHome5Line size={20} />,
        label: "Beranda",
        route: "/dashboard",
      },
      {
        icon: <GrProjects size={20} />,
        label: "Banner Utama",
        route: "/dashboard/pamplet",
      },
      {
        icon: <SiGooglecampaignmanager360 size={20} />,
        label: "Campaign",
        route: "/dashboard/campign",
      },
      {
        icon: <IoNewspaperOutline size={20} />,
        label: "Berita",
        route: "/dashboard/berita",
      },
      {
        icon: <FaDiagramProject size={20} />,
        label: "Distribusi Program",
        route: "/dashboard/distribusi-program",
      },
      {
        icon: <FaCodePullRequest size={20} />,
        label: "Kode Tracking",
        route: "/dashboard/kode-tracking",
      },
      {
        icon: <FaHandshake size={20} />,
        label: "Kerja Sama",
        route: "/dashboard/kerja-sama",
      },
      {
        icon: <MdOutlineCampaign size={25} />,
        label: "Pengumuman",
        route: "/dashboard/pengumuman",
      },
      {
        icon: <VscOrganization size={20} />,
        label: "Struktur Organisasi",
        route: "/dashboard/struktur",
      },

      {
        icon: <IoExitOutline size={25} />,
        label: "Logout",
        route: "/", // Tambahkan rute default
        action: "logout", // Tambahkan aksi logout
      },
    ],
  },
];

const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const [isChecking, setIsChecking] = useState(true);
  const [pageName, setPageName] = useLocalStorage("selectedMenu", "dashboard");
  const { dataAdmin } = useAdmin();

  const handleLogout = () => {
    removeToken();
    deleteCookie("token", { path: "/" });
    router.push("/");
    window.location.reload(); // Refresh halaman
  };

  const filteredMenuGroups = menuGroups
    .map((group) => ({
      ...group,
      menuItems: group.menuItems.filter((item) => {
        if (!dataAdmin) return false;
        if (dataAdmin.role === "super-admin") return true;
        if (dataAdmin.role === "Media") return ["Beranda", "Berita", "Logout"].includes(item.label);
        if (dataAdmin.role === "Fundraising") return ["Beranda", "Campaign", "Daftar Program", "Pengumuman", "Pengumuman", "Logout"].includes(item.label);
        return false;
      }),
    }))
    .filter((group) => group.menuItems.length > 0);

  useEffect(() => {
    const allowedRoutes = filteredMenuGroups.flatMap((group) => group.menuItems.map((item) => item.route));

    // Ambil parent route (hanya sampai level pertama setelah "/dashboard")
    const pathSegments = pathname.split("/").filter(Boolean);
    const parentRoute = pathSegments.length > 1 ? `/dashboard/${pathSegments[1]}` : pathname;

    if (!allowedRoutes.includes(parentRoute)) {
      setTimeout(() => {
        router.push("/dashboard"); // Redirect ke dashboard setelah 1 detik
      }, 1000);
    } else {
      setIsChecking(false);
    }
  }, [pathname, filteredMenuGroups]);

  if (isChecking) {
    return <div className="flex justify-center items-center h-screen text-lg font-semibold">Loading...</div>;
  }

  return (
    <ClickOutside onClick={() => setSidebarOpen(false)}>
      <aside className={`fixed left-0 top-0 z-9999 flex h-screen w-70 flex-col overflow-y-hidden bg-boxdark duration-300 ease-linear dark:bg-boxdark lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
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
            {filteredMenuGroups.map((group, groupIndex) => (
              <div key={groupIndex}>
                <h3 className="mb-4 ml-4 text-[15px] text-gray-400">{group.name}</h3>

                <ul className="mb-6 flex flex-col gap-1.5">
                  {group.menuItems.map((menuItem, menuIndex) => (
                    <li key={menuIndex}>
                      {menuItem.action === "logout" ? (
                        <button onClick={handleLogout} className="flex items-center text-bodydark1 px-4 py-2 gap-2  text-left w-full">
                          <span className="text-xl">{menuItem.icon}</span>
                          <span className="text-base"> {menuItem.label}</span>
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
