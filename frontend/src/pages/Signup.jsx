import React from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import { signup } from "../services/axiosInstance";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";

const Signup = () => {
  const [signupData, setSignupData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [passwordError,setPasswordError]=useState("");

  const handleFormChanges = (e) => {
    setSignupData({ ...signupData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (
      signupData.confirmPassword &&
      signupData.password !== signupData.confirmPassword
    ) {
      setPasswordError("Passwords do not match");
    } else {
      setPasswordError("");
    }
  }, [signupData.password, signupData.confirmPassword]);

  const postSignupData = async (data) => {
    try {
      const res = await signup(data);
      console.log(res.data);
      toast.success(res.data.message);
    } catch (error) {
      console.log(error.message);
      toast.error("Something occured. Please try again!!");
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    postSignupData(signupData);
    setSignupData({
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-100 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-5xl bg-white shadow-xl rounded-2xl grid grid-cols-1 lg:grid-cols-2 overflow-hidden">
        {/* Left: Form Section */}
        <div className="p-8 sm:p-12">
          <h2 className="text-3xl font-bold text-slate-800 mb-2">Sign Up</h2>
          <p className="text-slate-500 mb-6 text-sm">
            Create your account to start managing your inventory seamlessly.
          </p>

          <form className="space-y-5" onSubmit={handleFormSubmit}>
            <div>
              <label className="block text-sm font-medium text-slate-700">
                Full Name
              </label>
              <input
                type="text"
                placeholder="John Doe"
                id="fullName"
                name="fullName"
                value={signupData.fullName}
                onChange={handleFormChanges}
                className="w-full border rounded-md px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={signupData.email}
                onChange={handleFormChanges}
                placeholder="you@example.com"
                className="w-full border rounded-md px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={signupData.password}
                onChange={handleFormChanges}
                placeholder="••••••••"
                className="w-full border rounded-md px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={signupData.confirmPassword}
                onChange={handleFormChanges}
                placeholder="••••••••"
                className="w-full border rounded-md px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
              <p className="text-red-600">{
                    passwordError
                }</p>
            </div>

            <button
              type="submit"
              className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-semibold py-2.5 rounded-md transition-all"
            >
              Sign Up
            </button>
          </form>

          <p className="text-xs text-slate-500 mt-6 text-center">
            Already have an account?{" "}
            <NavLink
              to="/login"
              className="text-cyan-600 font-medium hover:underline"
            >
              Log In
            </NavLink>
          </p>
        </div>

        {/* Right: Inventory Image */}
        <div className="hidden lg:block">
          <img
            src="/signup.webp"
            alt="Inventory Warehouse"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Signup;
