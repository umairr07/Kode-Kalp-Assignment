import { useState } from "react";
import { handleError, handleSuccess } from "../utils/Toast.jsx";
import { ToastContainer } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

function Signup() {
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    // console.log(name, value);
    const copyUserData = { ...userData };
    copyUserData[name] = value;
    setUserData(copyUserData);
  };

  console.log("User Data", userData);

  const handleSignup = async (event) => {
    event.preventDefault();
    const { username, email, password } = userData;

    console.log(username, email, password);

    if (!username || !email || !password) {
      console.log("All fields are required");
      return handleError("All fields are required");
    }

    try {
      const response = await fetch(
        "https://backend-kodekalp.onrender.com/api/v1/user/signup",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(userData),
        }
      );

      const result = await response.json();

      if (response.status === 409) {
        return handleError("Email already exists :(, try with new email");
      }

      if (response.ok) {
        handleSuccess("User registered and email sent successfully");

        setTimeout(() => {
          navigate("/confirmation");
        }, 1500);
      }
    } catch (error) {
      return handleError(error);
    }
  };

  return (
    <>
      <div className="flex min-h-screen items-center justify-center bg-gray-100">
        <div className="bg-white shadow-lg rounded-lg flex w-4/5 max-w-4xl overflow-hidden">
          <div className="w-1/2 p-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Sign Up</h2>

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="username"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={userData.username}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter your username"
              />
            </div>

            <div className="mb-4">
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
                value={userData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter your email (original)"
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
                value={userData.password}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter your password"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
              onClick={handleSignup}
            >
              Sign Up
            </button>
          </div>

          <div className="w-1/2 bg-blue-500 text-white flex flex-col justify-center items-center p-8">
            <h2 className="text-2xl font-bold mb-4">
              Already have an account?
            </h2>
            <p className="mb-6">
              Click below to login if you already have an account
            </p>
            <Link
              to="/login"
              className="bg-white text-blue-500 py-2 px-4 rounded-md hover:bg-gray-200 transition duration-300"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default Signup;
