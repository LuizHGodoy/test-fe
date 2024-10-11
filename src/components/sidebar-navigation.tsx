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
import { redirect, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function SidebarNavigation() {
  const [profileImage, setProfileImage] = useState(
    localStorage.getItem("userImage"),
  );
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const router = useRouter();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const hasToken = localStorage.getItem("authToken");

  if (isAuthenticated && !hasToken) {
    redirect("/auth/sign-in");
  }

  const fetchUserImage = async () => {
    const response = await fetch("https://randomuser.me/api/");
    const data = await response.json();
    const imageUrl = data.results[0].picture.large;
    localStorage.setItem("userImage", imageUrl);

    return imageUrl;
  };

  const getImage = async () => {
    if (profileImage) return;

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
            placeholder="Pesquisar"
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
            label="Clientes"
            onClick={() => router.push("/clientes")}
          />
          {/* <NavItem
            icon={<FileText />}
            label="Serviços"
            onClick={() => router.push("/servicos")}
          /> */}
          <NavItem
            icon={<FileText />}
            label="Planos"
            onClick={() => router.push("/planos")}
          />
          <NavItem
            icon={<Users />}
            label="Serviços Adicionais"
            onClick={() => router.push("/servicos-adicionais")}
          />
        </div>
      </div>

      <div className="mt-auto p-4">
        <NavItem icon={<HelpCircle />} label="Ajuda e Suporte" />
        <div className="mt-4 relative">
          <button
            type="button"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center w-full p-2 rounded-md hover:bg-gray-100"
          >
            <img
              src={profileImage || "#"}
              alt="Perfil"
              className="w-8 h-8 rounded-full mr-2"
            />
            <span className="text-sm font-medium text-gray-700">Perfil</span>
          </button>
          {isDropdownOpen && (
            <div className="absolute bottom-full left-0 w-full mb-2 bg-white shadow-lg rounded-md">
              <button
                type="button"
                onClick={() => {
                  router.push("/perfil");
                  setIsDropdownOpen(false);
                }}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Perfil
              </button>

              <button
                type="button"
                onClick={() => {
                  useAuthStore.getState().logout();
                  redirect("/auth/sign-in");
                }}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                <div className="flex items-center">
                  <LogOut className="w-4 h-4 mr-2" />
                  Sair
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
