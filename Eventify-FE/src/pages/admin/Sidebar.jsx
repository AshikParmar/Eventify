import React from "react";
import { NavLink } from "react-router-dom";
import { Home, Calendar, Settings } from "lucide-react";

const Sidebar = () => {
  return (
    <div className="bg-gray-800 text-white w-64 h-screen p-5 space-y-4">
      <h1 className="text-2xl font-bold mb-6">Admin Panel</h1>
      <nav className="space-y-2">
        <NavLink
            to="/admin/dashboard"
          className={({ isActive }) =>
            `flex items-center p-2 w-full rounded-md hover:bg-gray-700 ${
              isActive ? "bg-gray-700" : ""
            }`
          }
        >
          <Home className="mr-2" /> Dashboard
        </NavLink>
        <NavLink
          to="/admin/manage-events"
          className={({ isActive }) =>
            `flex items-center p-2 w-full rounded-md hover:bg-gray-700 ${
              isActive ? "bg-gray-700" : ""
            }`
          }
        >
          <Calendar className="mr-2" /> Manage Events
        </NavLink>
        <NavLink
          to="/admin/settings"
          className={({ isActive }) =>
            `flex items-center p-2 w-full rounded-md hover:bg-gray-700 ${
              isActive ? "bg-gray-700" : ""
            }`
          }
        >
          <Settings className="mr-2" /> Settings
        </NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;
