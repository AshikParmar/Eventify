import React from "react";
import { NavLink, Routes, Route, Navigate } from "react-router-dom";
import ProfileSection from "./ProfileSection";


const ProfileSidebar = () => {
  return (
    <aside className="md:w-1/4 bg-white shadow-lg md:p-6 p-2">
      <h2 className="md:block hidden text-2xl font-semibold mb-4">Navigation</h2>
      <ul className="flex md:flex-col gap-2">
        <li>
          <NavLink
            to="/user/profile"
            className={({ isActive }) =>
              `block p-2 text-white rounded-lg cursor-pointer ${isActive ? "bg-blue-500" : "bg-gray-400"}`
            }
          >
            Profile Section
          </NavLink>
        </li>
        <li>
        <NavLink
            to="/user/enrolled-events"
            className={({ isActive }) =>
              `block p-2 text-white rounded-lg cursor-pointer ${isActive ? "bg-blue-500" : "bg-gray-400"}`
            }
          >
            Enrolled Events
          </NavLink>
        </li>
      </ul>
    </aside>
  );
};

const UserProfile = () => {
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">

      <ProfileSidebar />
      <main className="md:w-3/4 w-full md:p-6">
        <Routes>
          <Route index element={<Navigate to="profile" />} /> 
          <Route path="profile" element={<ProfileSection />} />
          <Route path="enrolled-events" element={<ProfileSection />} />
        </Routes>
      </main>
    </div>
  );
};

export default UserProfile;
