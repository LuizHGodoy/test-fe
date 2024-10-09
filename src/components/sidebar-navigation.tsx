import {
  FileText,
  HelpCircle,
  Home,
  LogOut,
  Search,
  Users,
} from "lucide-react";
import { useState } from "react";

export default function SidebarNavigation({
  setView,
  userImage,
  onLogout,
}: any) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

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
            onClick={() => setView("dashboard")}
          />
          <NavItem
            icon={<Users />}
            label="Customers"
            onClick={() => setView("customers")}
          />
          <NavItem
            icon={<FileText />}
            label="Services"
            onClick={() => setView("services")}
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
              src={userImage}
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
                  setView("profile");
                  setIsDropdownOpen(false);
                }}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Profile
              </button>
              <button
                type="button"
                onClick={() => {
                  setView("settings");
                  setIsDropdownOpen(false);
                }}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Settings
              </button>
              <button
                type="button"
                onClick={() => {
                  onLogout();
                  setIsDropdownOpen(false);
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
