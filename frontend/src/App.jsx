import React, { useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import useAuthStore from "./store/useauthstore.js";
import Home from "./pages/Home";
import Signuppage from "./pages/Signuppage";
import Signinpage from "./pages/Signinpage";
import Settingspage from "./pages/Settingpage";
import Profilepage from "./pages/Profilepage";
import PrivacyAnsPolicy from "./pages/PrivacyAnsPolicy.jsx";
import { Loader } from "lucide-react";
import { Toaster } from "react-hot-toast";
import Sidebar from "./components/Sidebar"; // 👈 tumhara sidebar component

const App = () => {
  const { authuser, checkauth, isCheckingAuth ,IsonlineUsers , isAuthenticated } = useAuthStore();
  const location = useLocation(); // 👈 current route check karne ke liye
 console.log({ IsonlineUsers })

 useEffect(() => {
  // sirf tabhi checkauth chalao jab user logged in na ho
  checkauth();
}, [isAuthenticated]);
 
if (isCheckingAuth && !authuser) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-14 animate-spin text-green-500" />
      </div>
    );
  }

  // 👇 ye check karega ke current path signin ya signup hai ya nahi
  const hideSidebar = ["/signin", "/signup" , '/privacy'].includes(location.pathname);

  return (
    <div className="flex">
      {/* Sidebar sirf signin/signup ke ilawa show hoga */}
      {!hideSidebar && <Sidebar />}

      <div data-theme="dark" className="flex-1">
        <Routes>
          <Route path="/" element={authuser ? <Home /> : <Navigate to="/signin" />} />
          <Route path="/signup" element={!authuser ? <Signuppage /> : <Navigate to="/" />} />
          <Route path="/signin" element={!authuser ? <Signinpage /> : <Navigate to="/" />} />
          <Route path="/privacy" element={<PrivacyAnsPolicy />} />
          <Route path="/settings" element={authuser ? <Settingspage /> : <Navigate to="/signin" />} />
          <Route path="/profile" element={authuser ? <Profilepage /> : <Navigate to="/signin" />} />
        </Routes>
      </div>

      <Toaster />
    </div>
  );
};

export default App;
