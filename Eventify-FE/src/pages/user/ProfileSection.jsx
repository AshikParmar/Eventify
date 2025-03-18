import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useGlobalUI } from "../../components/Global/GlobalUIContext";
import { changePassword, updateUser } from "../../redux/slices/userSlice";
import Loading from "../../components/ui/Loading";
// import { updateUser } from "../redux/userSlice"; // Ensure you have this action in your Redux slice

const ProfileSection = () => {
  const { showSnackbar } = useGlobalUI();
  const { user, loading, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const formattedDate = new Date(user?.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });

  const [editMode, setEditMode] = useState(false);
  const [editPassword, SetEditPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: user?.username || "",
    email: user?.email || ""
  });

  const [passDetails, setPassDetails] = useState({
    oldPassword: "",
    newPassword: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setPassDetails({ ...passDetails, [e.target.name]: e.target.value });
  };


  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await dispatch(updateUser({ ...formData }));
      const success = response?.payload?.success;
      if (success) {
        showSnackbar(response?.payload?.message, "success");
      } else {
        showSnackbar(response?.payload?.message, "error");
      }

    } catch (error) {
      console.error("Error:", error.response?.message || error.message);
      // return { success: false, message: error.response?.message || "Something went wrong" };
    }
    finally {
      setEditMode(false);
      setPassDetails({
        username: "",
        email:  ""
      });
    }

  }

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    try {
      const response = await dispatch(changePassword({ ...passDetails }));
      const success = response?.payload?.success;
      if (success) {
        showSnackbar(response?.payload?.message, "success");
      } else {
        showSnackbar(response?.payload?.message, "error");
      }

    } catch (error) {
      console.error("Error changing password:", error.response?.message || error.message);
      // return { success: false, message: error.response?.message || "Something went wrong" };
    }
    finally {
      SetEditPassword(false);
      setPassDetails({
        oldPassword: "",
        newPassword: ""
      });
    }

  }


  return (
    <div>
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Profile Information</h2>
        {editMode ? (
          loading ? 
          (
            <Loading title="Updating..."/>
          ) 
          :
          (<form onSubmit={handleFormSubmit} className="space-y-4">
            <label className="text-gray-700 font-medium">Name</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
            <label className="text-gray-700 font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
            <button type="submit" className="bg-blue-500 text-white p-2 rounded">
              Save Changes
            </button>
            <button onClick={() => setEditMode(false)} className="bg-gray-600 text-white p-2 rounded ml-4">
              Cancel
            </button>
          </form>)
        ) : (
          <div>
            <p><strong>Name:</strong> {user?.username || "N/A"}</p>
            <p><strong>Email:</strong> {user?.email || "N/A"}</p>
            <p><strong>Joined:</strong> {formattedDate || "N/A"}</p>
            <button onClick={() => setEditMode(true)} className="bg-gray-600 text-white p-2 rounded mt-4 mr-4">
              Edit Profile
            </button>
            <button onClick={() => SetEditPassword(!editPassword)} className="bg-gray-600 text-white p-2 rounded mt-4">
              Change Password
            </button>
          </div>
        )}

      </section>


      {editPassword && (
        loading ? (
          <div className="min-h-60 flex items-center justify-center bg-white bg-opacity-10">
            <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
              <p className="text-lg font-semibold">Updating...</p>
              <div className="w-10 h-10 border-4 border-blue-500 border-dotted rounded-full animate-spin mt-3"></div>
            </div>
          </div>
        ) : (
          <section className="bg-white p-6 rounded-lg shadow-lg md:mb-6 md:m-0 m-4">
            <form onSubmit={handlePasswordChange} className="space-y-4">
              <div className="flex flex-col gap-1">
                <label className="text-gray-700 font-medium">Old Password</label>
                <input
                  type="password"
                  name="oldPassword"
                  value={passDetails.oldPassword}
                  onChange={handleChange}
                  className="md:w-96 p-2 border rounded"
                  required
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-gray-700 font-medium">New Password</label>
                <input
                  type="password"
                  name="newPassword"
                  value={passDetails.newPassword}
                  onChange={handleChange}
                  className="md:w-96 p-2 border rounded"
                  required
                />
              </div>

              <button type="submit" className="bg-blue-500 text-white p-2 rounded">
                Change Passsword
              </button>
              <button onClick={() => SetEditPassword(false)} className="bg-gray-600 text-white p-2 rounded ml-4">
              Cancel
            </button>
            </form>
          </section>
        )
      )}


    </div>

  );
};

export default ProfileSection;
