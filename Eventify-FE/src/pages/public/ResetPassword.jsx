import { useState } from "react";
import { useParams } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react"; 
import { useGlobalUI } from "../../components/Global/GlobalUIContext";
import { requestResetPassword } from "../../redux/services/forgotPassword";

const ResetPassword = () => {

  const { showSnackbar } = useGlobalUI();
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); 
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    setLoading(true);

    try {
      const result = await requestResetPassword(token, password);

      if (result.success) {
        showSnackbar(result.message, "success");
        setMessage(result.message);
      }
      else if (!result.success) {
        showSnackbar(result.message, "error");
        setError(result.message);
      }
    } catch (e) {
      console.log("Error", e.message);
      showSnackbar(e.message, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="p-6 bg-white shadow-lg rounded-md w-96">
        <h2 className="text-xl font-bold mb-4 text-center">Reset Password</h2>

        {message && <p className="text-green-500 text-center">{message}</p>}
        {error && <p className="text-red-500 text-center">{error}</p>}

        <div className="relative">
          <input
            type={showPassword ? "text" : "password"} 
            placeholder="Enter new password"
            className="border p-2 w-full rounded-md pr-10"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-3 text-gray-600"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        <button
          type="submit"
          className="mt-4 bg-blue-500 text-white p-2 w-full rounded-md flex justify-center items-center"
          disabled={loading}
        >
          {loading ? (
            <svg className="animate-spin h-5 w-5 mr-2 border-white border-2 border-t-transparent rounded-full" viewBox="0 0 24 24"></svg>
          ) : (
            "Reset Password"
          )}
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
