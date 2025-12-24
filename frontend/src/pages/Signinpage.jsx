import React, { useState } from "react";
import { MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import useAuthStore from "../store/useauthstore.js";

const Signinpage = () => {
  const { login } = useAuthStore();

  const [Formdata, setFormdata] = useState({
    email: "",
    password: "",
  });

  // ✅ Validation
  const formvalidate = () => {
    if (!Formdata.email.trim()) {
      toast.error("Email is required");
      return false;
    }
    if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(Formdata.email)
    ) {
      toast.error("Email is invalid");
      return false;
    }
    if (!Formdata.password.trim()) {
      toast.error("Password is required");
      return false;
    }
    if (Formdata.password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return false;
    }
    return true;
  };

  // ✅ Handle Login
  const handleLogin = async (e) => {
    e.preventDefault();
    if (!formvalidate()) return;

    const formdata = {
      email: Formdata.email,
      password: Formdata.password,
    };

    try {
      const userData = await login(formdata);

      if (userData) {
        localStorage.setItem("chat-user", JSON.stringify(userData));
        console.log("User added in localStorage:", userData);
        toast.success("Login successful!");
      }
    } catch (error) {
      toast.error("Login failed");
      console.error("Login error:", error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="logincontainer p-5 flex flex-col rounded-xl items-center w-[30%] bg-[#141b22a8]">
        <MessageSquare className="text-purple-500 mt-9 mb-2 h-12 w-12 p-3 rounded-md bg-gray-800" />
        <h2 className="text-2xl my-2">Welcome back</h2>
        <p className="text-gray-500 mb-4">Please sign in to your account.</p>

        {/* Form */}
        <form onSubmit={handleLogin} className="w-full">
            <input
              value={Formdata.email}
              type="email"
              placeholder="Email"
              className="my-6 w-full outline-none p-2 border border-gray-500 rounded"
              onChange={(e) =>
                setFormdata({ ...Formdata, email: e.target.value })
              }
            />

            <input
              value={Formdata.password}
              type="password"
              placeholder="Password"
              className="mb-4 w-full outline-none p-2 border border-gray-500 rounded"
              onChange={(e) =>
                setFormdata({ ...Formdata, password: e.target.value })
              }
            />

          <button
            type="submit"
            className="cursor-pointer bg-purple-500 w-full text-white p-2 rounded"
          >
            Login
          </button>
        </form>

        <p className="text-gray-500 mt-5">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-purple-500">
            Sign up
          </Link>
        </p>

        <p className="text-gray-500 text-sm mt-40 text-center">
          By signing in, you agree to our{" "}
          <a href="/terms" className="text-purple-500 hover:underline">
            Terms & Conditions
          </a>{" "}
          and{" "}
          <a href="/privacy" className="text-purple-500 hover:underline">
            Privacy Policy
          </a>
          .
        </p>
      </div>
    </div>
  );
};

export default Signinpage;
