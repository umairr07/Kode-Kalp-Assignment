import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { handleError, handleSuccess } from "../utils/Toast";
import { ToastContainer } from "react-toastify";

function Login() {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    const copyLoginData = { ...loginData };
    copyLoginData[name] = value;
    setLoginData(copyLoginData);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = loginData;

    if (!email || !password) {
      console.log("All fields are required");
      return handleError("All fields are required");
    }

    try {
      const response = await fetch("http://localhost:3000/api/v1/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData),
      });

      const result = await response.json();

      if (response.ok) {
        handleSuccess("Login successful");

        setTimeout(() => {
          navigate("/home");
        }, 1500);
      }
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg flex w-4/5 max-w-4xl overflow-hidden">
        <div className="w-1/2 bg-blue-500 text-white flex flex-col justify-center items-center p-8">
          <h2 className="text-2xl font-bold mb-4">Doesn't have an account?</h2>
          <p className="mb-6">Click below to create a new account</p>
          <Link
            to="/signup"
            className="bg-white text-blue-500 py-2 px-4 rounded-md hover:bg-gray-200 transition duration-300"
          >
            Sign Up
          </Link>
        </div>

        <div className="w-1/2 p-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 mt-10">Login</h2>

          <div className="mb-4 mt-10">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={loginData.email}
              onChange={handleOnChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your email"
            />
          </div>

          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={loginData.password}
              onChange={handleOnChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
            onClick={handleLogin}
          >
            Login
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Login;
