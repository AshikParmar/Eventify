import React from "react";
import ProfileSection from "../user/ProfileSection";

const Settings = () => {
  return (
    <div className="p-6 space-y-6">
      
      <h2 className="text-2xl font-bold mb-4">Admin Settings</h2>
      <div className="bg-white rounded-lg p-4 shadow-lg">
      <ProfileSection/>
      </div>
    </div>
  );
};

export default Settings;
