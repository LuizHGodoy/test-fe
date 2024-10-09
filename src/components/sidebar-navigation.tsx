"use client";

import { useAuthStore } from "@/store/authStore";
import {
  FileText,
  HelpCircle,
  Home,
  LogOut,
  Search,
  Users,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function SidebarNavigation() {
  const [profileImage, setProfileImage] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const router = useRouter();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  console.log("penes:++++++++++++++++", isAuthenticated);
  // if (!isAuthenticated) {
  //   redirect("/auth/sign-in");
  // }

  const fetchUserImage = async () => {
    const response = await fetch("https://randomuser.me/api/");
    const data = await response.json();
    const imageUrl = data.results[0].picture.large;
    localStorage.setItem("userImage", imageUrl);

    return imageUrl;
  };

  const getImage = async () => {
    const storedImage = localStorage.getItem("userImage");
    if (storedImage) {
      setProfileImage(storedImage);
    }

    const image = await fetchUserImage();
    setProfileImage(image);
  };

  useEffect(() => {
    if (!profileImage) {
      getImage();
    }
  }, [profileImage]);

  return (
    <nav className="w-64 bg-white shadow-md h-full flex flex-col">
      <div className="p-4">
        <div className="flex items-center mb-4">
          <input
            type="text"
            placeholder="Search"
            className="w-full bg-gray-100 text-gray-900 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Search className="w-5 h-5 ml-2 text-gray-400" />
        </div>

        <div className="space-y-2">
          <NavItem
            icon={<Home />}
            label="Dashboard"
            onClick={() => router.push("/")}
          />
          <NavItem
            icon={<Users />}
            label="Customers"
            onClick={() => router.push("/clientes")}
          />
          <NavItem
            icon={<FileText />}
            label="Services"
            onClick={() => router.push("/services")}
          />
        </div>
      </div>

      <div className="mt-auto p-4">
        <NavItem icon={<HelpCircle />} label="Help & Support" />
        <div className="mt-4 relative">
          <button
            type="button"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center w-full p-2 rounded-md hover:bg-gray-100"
          >
            <img
              src={profileImage}
              alt="Profile"
              className="w-8 h-8 rounded-full mr-2"
            />
            <span className="text-sm font-medium text-gray-700">Profile</span>
          </button>
          {isDropdownOpen && (
            <div className="absolute bottom-full left-0 w-full mb-2 bg-white shadow-lg rounded-md">
              <button
                type="button"
                onClick={() => {
                  router.push("/profile");
                  setIsDropdownOpen(false);
                }}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Profile
              </button>
              <button
                type="button"
                onClick={() => {
                  router.push("/settings");
                  setIsDropdownOpen(false);
                }}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Settings
              </button>
              <button
                type="button"
                onClick={() => {
                  useAuthStore.getState().logout();
                }}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                <div className="flex items-center">
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </div>
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

function NavItem({ icon, label, onClick }: any) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex items-center w-full px-3 py-2 text-gray-700 rounded-md hover:bg-gray-100"
    >
      {icon}
      <span className="ml-3">{label}</span>
    </button>
  );
}
