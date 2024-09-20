import React from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const res = await fetch(
        "https://backend-kodekalp.onrender.com/api/v1/user/logout",
        {
          method: "GET", // Keep GET since the backend requires it
          credentials: "include", // Ensure cookies are sent
          headers: {
            "Content-Type": "application/json", // Ensure proper content type
          },
        }
      );

      // Check if the response is OK
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      console.log("Logout response data:", data); // Log full response

      if (data.message) {
        console.log("Logout message:", data.message);
      }

      // Check success flag to determine next action
      if (data.message === "User logged out successfully") {
        console.log("Logout successful");
        navigate("/"); // Redirect to home page
      } else {
        console.log("Logout failed: No success message received");
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <div className="min-h-screen bg-[#434343]">
      {/* Navbar */}
      <nav className="bg-gray-100 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <a href="/" className="text-[#434343] font-bold text-xl">
            KodeKalp
          </a>
          <button
            onClick={handleLogout}
            className="bg-white text-gray-600 font-semibold py-2 px-4 rounded hover:bg-blue-50"
          >
            Logout
          </button>
        </div>
      </nav>

      {/* Main content */}
      <main className="container mx-auto p-8 mt-36">
        <h1 className="text-3xl font-bold text-center text-gray-100 mb-8">
          Welcome to KodeKalp!
        </h1>

        <div className="flex justify-center mb-8">
          <img
            src="https://www.kodekalp.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2F1.dc34d1b2.png&w=384&q=75"
            alt="KodeKalp"
            className="rounded-lg shadow-lg"
          />
        </div>
      </main>
    </div>
  );
}

export default Home;
