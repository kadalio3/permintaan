"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiGrid, FiChevronDown, FiChevronRight } from "react-icons/fi";
import { TfiAgenda, TfiFolder, TfiUser } from "react-icons/tfi";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";


interface SidebarProps {
  userRole?: string | null;
}

const Sidebar = ({ userRole }: SidebarProps) => {
  const pathname = usePathname();
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const menuItems = [
    {
      path: "/",
      icon: FiGrid,
      label: "Dashboard",
      visible: true,
    },
    {
      path: "/user",
      icon: TfiUser,
      label: "User",
      visible: userRole === "admin",
    },
    {
      path: "/surat",
      icon: TfiFolder,
      label: "Surat",
      visible: true,
      subItems: [
        {
          path: "/surat/keluar",
          icon: FaArrowUp,
          label: "Surat Keluar",
          visible: true,
        },
        {
          path: "/surat/masuk",
          icon: FaArrowDown,
          label: "Surat Masuk",
          visible: true,
        },
      ],
    },
    {
      path: "/laporan",
      icon: TfiAgenda,
      label: "Laporan",
      visible: true,
    },
  ];

  const toggleMenu = (menuPath: string) => {
    setOpenMenu(openMenu === menuPath ? null : menuPath);
  };

  return (
    <aside className="fixed left-0 h-full w-64 bg-white shadow-sm">
      {/* Logo */}
      <div className="h-16 flex items-center gap-2 px-4 border-b">
        <div className="text-2xl font-bold text-orange-500">Permintaan Data</div>
      </div>

      {/* Menu */}
      <div className="p-4">
        <nav className="space-y-1">
          {menuItems.map((item) => {
            if (!item.visible) return null;

            const Icon = item.icon;
            const hasSubItems = item.subItems && item.subItems.length > 0;
            const isMenuOpen = openMenu === item.path;
            const isActive = pathname === item.path || 
              (hasSubItems && item.subItems?.some(sub => sub.path === pathname));

            return (
              <div key={item.path}>
                {hasSubItems ? (
                  // Menu dengan sub-items (button)
                  <button
                    onClick={() => toggleMenu(item.path)}
                    className={`w-full flex items-center justify-between gap-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isActive || isMenuOpen
                        ? "bg-orange-500 text-white"
                        : "text-gray-700 hover:bg-orange-50"
                    }`}
                  >
                    <div className="flex items-center gap-x-2">
                      <Icon className="h-5 w-5" />
                      {item.label}
                    </div>
                    <span>
                      {isMenuOpen ? (
                        <FiChevronDown className="h-4 w-4" />
                      ) : (
                        <FiChevronRight className="h-4 w-4" />
                      )}
                    </span>
                  </button>
                ) : (
                  // Menu biasa (link)
                  <Link
                    href={item.path}
                    className={`flex items-center gap-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      pathname === item.path
                        ? "bg-orange-500 text-white"
                        : "text-gray-700 hover:bg-orange-50"
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    {item.label}
                  </Link>
                )}

                {hasSubItems && isMenuOpen && (
                  <div className="ml-6 mt-1 space-y-1">
                    {item.subItems?.map((subItem) => {
                      if (!subItem.visible) return null;
                      const SubIcon = subItem.icon;
                      const isSubActive = pathname === subItem.path;

                      return (
                        <Link
                          key={subItem.path}
                          href={subItem.path}
                          className={`flex items-center gap-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                            isSubActive
                              ? "bg-orange-100 text-orange-700"
                              : "text-gray-600 hover:bg-orange-50"
                          }`}
                        >
                          <SubIcon className="h-4 w-4" />
                          {subItem.label}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;