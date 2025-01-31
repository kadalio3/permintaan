"use client";
import { FiLogOut, FiUser, FiChevronDown } from "react-icons/fi";
import { signOut } from "next-auth/react";
import { useState, useRef, useEffect } from "react";
import { Session } from "next-auth";

interface NavbarProps {
  session: Session | null;
}

const Navbar = ({ session }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Menutup dropdown ketika klik di luar
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="h-16 fixed z-50 top-4 right-6 left-72 bg-white shadow-sm rounded-md">
      <div className="flex items-center justify-end h-full px-6">
        {/* Username and Avatar Dropdown */}
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-gray-700">
            {session?.user?.username}
          </span>
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-center gap-2 p-1 hover:bg-gray-100 rounded-full transition"
            >
              <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
                <span className="text-sm font-medium">
                  {session?.user?.username?.[0]?.toUpperCase() || "U"}
                </span>
              </div>
              <FiChevronDown className={`h-4 w-4 text-gray-600 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 border">
                <button
                  className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                  onClick={() => {/* Handle Profile Click */}}
                >
                  <FiUser className="h-4 w-4" />
                  Profile
                </button>
                <button
                  className="w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100 flex items-center gap-2"
                  onClick={() => signOut()}
                >
                  <FiLogOut className="h-4 w-4" />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 