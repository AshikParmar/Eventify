import React from "react";
import { Link } from "react-router-dom";
import ProfileSection from "./ProfileSection";


const Sidebar = () => {
  return (
    <aside className="w-1/4 bg-white shadow-lg p-6">
      <h2 className="text-2xl font-semibold mb-4">Navigation</h2>
      <ul className="space-y-2">
        <li>
          <Link to="/user/profile" className="block p-2 bg-blue-500 text-white rounded-lg cursor-pointer">Profile Section</Link>
        </li>
        <li>
          <Link to="/user/enrolled-events" className="block p-2 bg-gray-200 rounded-lg cursor-pointer">Enrolled Events</Link>
        </li>
      </ul>
    </aside>
  );
};

const UserProfile = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      {/* Main Content */}
      <main className="w-3/4 p-6">
        <ProfileSection />
        {/* <EnrolledEvents /> */}
      </main>
    </div>
  );
};

export default UserProfile;
