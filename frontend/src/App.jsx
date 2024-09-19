import { ToastContainer } from "react-toastify";
import Login from "./components/Login";
import Signup from "./components/Signup";
import "react-toastify/dist/ReactToastify.css";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Logout from "./components/Logout";
import ConfirmPage from "./components/ConfirmPage";

function App() {
  return (
    // <Login />
    <div>
      <Routes>
        <Route path="/" element={<Navigate to="/signup" />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/confirmation" element={<ConfirmPage />} />
      </Routes>
    </div>
  );
}

export default App;
