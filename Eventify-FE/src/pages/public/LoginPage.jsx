import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from '../../redux/slices/userSlice';
import { useGlobalUI } from "../../components/Global/GlobalUIContext";
import Loading from "../../components/ui/Loading";
import GoogleAuthButton from "../../components/ui/GoogleAuthButton";


const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const { showSnackbar } = useGlobalUI();

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    const { name, value } = e.target;

    if (name === "email") {
      if (value !== value.toLowerCase()) {
        setEmailError("Email must be in lowercase!");
      } else {
        setEmailError("");
      }
    }

    if (name === "password") {
      setPasswordError("");
    }

    setInput({ ...input, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!input.email || !input.password) {
      showSnackbar("All fields are required!", "error");
      return;
    }

    if (emailError) {
      showSnackbar("Invalid Email!", "error");
      return;
    }

    if (input.password.length < 4) {
      setPasswordError("Password must be at least 4 characters long.");
      showSnackbar("Invalid Password!", "error");
      return;
    }

    try {
      setLoading(true);
      const res = await dispatch(loginUser(input));

      if (!res.payload) {
        console.error("No payload returned. Full response:", res);
        showSnackbar(res.payload.message, "error");
        return;
      }
;
      if (res.payload.success) {
        showSnackbar(res.payload.message, "success");
        setInput({
          username: "",
          email: "",
          password: "",
        });

        navigate("/");
      } else {
        console.log(res.payload.message);
        showSnackbar(res.payload.message, "error");
      }
    }
    catch (e) {
      console.error("internal error ", e.message);
    }
    finally {
      setLoading(false);
    }

  };

  if (loading) {
    return <div className="h-screen flex items-center justify-center">
      <Loading title="Loging..." />
    </div>
  }

  return (
    <div className="flex items-center min-h-screen p-4 bg-gray-100 justify-center">
      <div className="flex flex-col-reverse overflow-hidden bg-white rounded-md shadow-lg md:flex-row md:flex-1 lg:max-w-screen-md">
        <div className="p-4 py-6 text-white bg-blue-light md:w-80 md:flex-shrink-0 md:flex md:flex-col md:items-center md:justify-evenly">
          <div className="my-3 text-4xl font-bold tracking-wider text-center">
            <a href="#">Eventify</a>
          </div>
          <p className="mt-6 font-normal text-center text-gray-300 md:mt-0">
            Welcome to MyApp! Securely manage your digital experience with us.
          </p>
          <p className="flex gap-2 items-center justify-center mt-10 text-center">
            <span>New Here?</span>
            <Link to='/signup' className="underline hover:text-blue">Sign Up</Link>
          </p>
          <p className="text-center"><Link to="/forgot-password?" className="underline hover:text-blue">forgot-password?</Link></p>
          <p className="mt-6 text-sm text-center text-gray-300">
            Read our <a href="#" className="underline">terms</a> and <a href="#" className="underline">conditions</a>
          </p>
        </div>
        <div className="p-5 bg-white md:flex-1">
          <h3 className="my-4 text-2xl font-semibold text-gray-700">Login to Your Account</h3>
          <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
            <div className="flex flex-col space-y-2">
              <label htmlFor="email" className="text-sm font-semibold text-gray-700">Email Address</label>
              <div className="bg-gray-300 w-full rounded-md flex items-center">
                <input
                  id="email"
                  type="email"
                  name="email"
                  className="w-full p-2 rounded-md outline-none"
                  placeholder="Enter your email"
                  value={input.email}
                  onChange={changeEventHandler}
                  required
                />
                <i className="bx bx-envelope text-gray-700 text-xl mr-3"></i>
              </div>
              {emailError && <p className="text-red-500 text-xs">*{emailError}</p>}
            </div>
            <div className="flex flex-col space-y-2">
              <label htmlFor="password" className="text-sm font-semibold text-gray-700">Password</label>
              <div className="bg-gray-300 w-full rounded-md flex items-center">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  name='password'
                  className="w-full p-2 outline-none rounded-md"
                  placeholder="Enter your password"
                  value={input.password}
                  onChange={changeEventHandler}
                  required
                />

                <button
                  type="button"
                  className="mr-3 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >

                  {showPassword ? (<i className="bx bx-lock-open-alt text-gray-700 text-xl"></i>)
                    : (<i className="bx bx-lock text-gray-700 text-xl"></i>)}
                </button>
              </div>
              {passwordError && <p className="text-red-500 text-xs">* {passwordError}</p>}
            </div>
            <div className="">
              <button type="submit" className="w-full px-4 py-2 text-lg font-semibold text-white bg-blue-500 rounded hover:bg-blue-600 cursor-pointer">
                Log in
              </button>
            </div>
          </form>
          <div className="mt-5 flex flex-col space-y-5">
            <div className="flex items-center justify-center space-x-2">
              <span className="h-px bg-gray-400 w-28"></span>
              <span className="font-semibold text-gray-600">or</span>
              <span className="h-px bg-gray-400 w-28"></span>
            </div>

            <GoogleAuthButton setLoading={setLoading} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
