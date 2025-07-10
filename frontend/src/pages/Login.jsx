import React, { useState } from "react";
import toast from "react-hot-toast";
import { login } from "../services/axiosInstance";
import {useAuth} from '../context/AuthContext';
import {useNavigate} from "react-router-dom";

const Login = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const {login:newUser}=useAuth();
  const navigate=useNavigate();

  const handleFormChanges = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const postLoginData = async (data) => {
    try {
      const res = await login(data);
      toast.success(res.data.message);

      newUser(res.data.user);
      navigate('/dashboard');
    } catch (error) {
      console.log(error.message);
      toast.error("Something occured.Please try again!!");
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    postLoginData(loginData);
    setLoginData({
      email: "",
      password: "",
    });
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 py-8 bg-gray-100 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="/inventory.avif" // ✅ Replace with your image path
          alt="Background"
          className="w-full h-full object-cover opacity-100"
        />
        <div className="absolute inset-0 bg-white/60 backdrop-blur-sm"></div>
      </div>

      {/* Foreground Login Card */}
      <div className="relative w-full max-w-5xl bg-white shadow-xl rounded-2xl grid grid-cols-1 lg:grid-cols-2 overflow-hidden">
        {/* Form Section */}
        <div className="p-8 sm:p-12">
          <h2 className="text-3xl font-bold text-slate-800 mb-2">Log In</h2>
          <p className="text-slate-500 mb-6 text-sm">
            Welcome back! Log in to continue managing your inventory.
          </p>

          <form className="space-y-5" onSubmit={handleFormSubmit}>
            <div>
              <label className="block text-sm font-medium text-slate-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={loginData.email}
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
                value={loginData.password}
                onChange={handleFormChanges}
                placeholder="••••••••"
                className="w-full border rounded-md px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-semibold py-2.5 rounded-md transition-all"
            >
              Log In
            </button>
          </form>

          <p className="text-xs text-slate-500 mt-6 text-center">
            Don’t have an account?{" "}
            <a
              href="/signup"
              className="text-cyan-600 font-medium hover:underline"
            >
              Sign Up
            </a>
          </p>
        </div>

        {/* Image Section */}
        <div className="hidden lg:block">
          <img
            src="/login.png" // Replace with your side image
            alt="Login visual"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
