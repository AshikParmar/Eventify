import { useState } from "react";
import { Link } from "react-router-dom";
import { requestForgotPassword } from "../../redux/services/forgotPassword";
import { useGlobalUI } from "../../components/Global/GlobalUIContext";

const ForgotPassword = () => {

  const { showSnackbar } = useGlobalUI();

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    setLoading(true); 

    try{
      const result = await requestForgotPassword(email);

      if(result.success){
        showSnackbar(result.message, "success");
        setMessage(result.message);
      } 
      else if(!result.success){
        showSnackbar(result.message, "error");
        setError(result.message);
      }
    }
    catch(e){
      console.log("Error", e.message);
      showSnackbar(e.message, "error");
    }finally{
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit} className="p-6 bg-white shadow-lg rounded-md w-96">
        <h2 className="text-xl font-bold mb-4 text-center">Forgot Password</h2>

        {message && <p className="text-green-500 text-center">{message}</p>}
        {error && <p className="text-red-500 text-center">{error}</p>}

        <input
          type="email"
          placeholder="Enter your email"
          className="border p-2 w-full rounded-md"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <button
          type="submit"
          className="mt-4 bg-blue-500 text-white p-2 w-full rounded-md flex justify-center items-center"
          disabled={loading} // ✅ Disable button when loading
        >
          {loading ? (
            <svg className="animate-spin h-5 w-5 mr-2 border-white border-2 border-t-transparent rounded-full" viewBox="0 0 24 24"></svg>
          ) : (
            "Send Reset Link"
          )}
        </button>

        {/* 🔹 Back to Login Link */}
        <div className="text-center mt-4">
          <Link to="/login" className="text-blue-600 hover:underline">
            Back to Login
          </Link>
        </div>
      </form>
    </div>
  );
};

export default ForgotPassword;
