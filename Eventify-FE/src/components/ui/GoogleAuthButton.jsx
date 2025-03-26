import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { googleLoginUser } from "../../redux/slices/userSlice"; 
import { useGlobalUI } from "../Global/GlobalUIContext";

const GoogleAuthButton = ({ setLoading }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { showSnackbar } = useGlobalUI();

  const handleGoogleSuccess = async (response) => {
    try {
      const decoded = jwtDecode(response.credential);
      const { email, name, sub } = decoded;
      
      setLoading(true);
      // Dispatch the Google login action with extracted data
      const res = await dispatch(googleLoginUser({ email, name, googleId: sub }));

      if (res.payload.success) {
        showSnackbar("Google Login Successful", "success");
        navigate("/");
      } else {
        showSnackbar(res.payload.message, "error");
      }
    } catch (error) {
      console.error("Google Login Error:", error);
      showSnackbar("Google Login Failed", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleFailure = (error) => {
    console.error("Google Login Failed:", error);
    showSnackbar("Google Login Failed", "error");
  };

  return (
    <div>
      <GoogleLogin
        onSuccess={handleGoogleSuccess}
        onError={handleGoogleFailure}
        theme="filled_blue"
        shape="circle"
        text="continue_with"
      />
    </div>
  );
};

export default GoogleAuthButton;
