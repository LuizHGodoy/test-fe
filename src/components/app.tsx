"use client";

import { Toaster } from "@/components/ui/toaster";
import { useAuthStore } from "@/store/authStore";
import { useEffect, useState } from "react";
import CustomerForm from "./customer-form";
import { Dashboard } from "./dashboard";
import ServiceCart from "./service-cart";
import SidebarNavigation from "./sidebar-navigation";

export default function App() {
  const [view, setView] = useState("dashboard");
  const [userImage, setUserImage] = useState("");

  useEffect(() => {
    const fetchUserImage = async () => {
      const response = await fetch("https://randomuser.me/api/");
      const data = await response.json();
      const imageUrl = data.results[0].picture.large;
      setUserImage(imageUrl);
      localStorage.setItem("userImage", imageUrl);
    };

    if (!userImage) {
      const storedImage = localStorage.getItem("userImage");
      if (storedImage) {
        setUserImage(storedImage);
      } else {
        fetchUserImage();
      }
    }
  }, [userImage]);

  return (
    <div className="flex h-screen bg-gray-100">
      <SidebarNavigation
        setView={setView}
        userImage={userImage}
        onLogout={() => useAuthStore.getState().logout()}
      />
      <main className="flex-1 overflow-y-auto p-8">
        {view === "dashboard" && <Dashboard />}
        {view === "customers" && <CustomerForm />}
        {view === "services" && <ServiceCart />}
      </main>
      <Toaster />
    </div>
  );
}
