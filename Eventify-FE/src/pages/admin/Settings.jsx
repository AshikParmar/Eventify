import React from "react";

const Settings = () => {
  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold mb-4">Admin Settings</h2>
      <div className="bg-white p-6 shadow-md rounded-lg">
        <label className="block mb-2 font-semibold">Admin Email:</label>
        <input
          type="email"
          className="w-full border p-2 rounded-md"
          placeholder="admin@example.com"
        />
        <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md">
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default Settings;
