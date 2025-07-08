import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { TiThMenuOutline } from "react-icons/ti";
import { IoMdClose } from "react-icons/io";

const Header = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="shadow-md py-4 px-4 sm:px-10 bg-white min-h-[70px] tracking-wide relative z-50">
        <div className="flex flex-wrap items-center justify-between gap-5 w-full">
          {/* Logo */}
          <div>
            <p className="text-2xl font-bold">
              Stock <span className="text-cyan-500">Mini</span>
            </p>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center justify-center space-x-4">
            <NavLink to="/home" className="text-xl font-medium">
              Home
            </NavLink>
            <NavLink to="/features" className="text-xl font-medium">
              Features
            </NavLink>
            <NavLink to="/services" className="text-xl font-medium">
              Services
            </NavLink>
            <NavLink to="/testimonials" className="text-xl font-medium">
              Testimonials
            </NavLink>
          </div>

          {/* Desktop Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <NavLink
              to="/signup"
              className="bg-cyan-500 text-white text-xl font-medium px-5 py-2 rounded-full hover:bg-cyan-700 transition-all"
            >
              Sign Up
            </NavLink>
            <NavLink
              to="/login"
              className="bg-transparent text-xl font-medium px-5 py-2 border border-cyan-500 rounded-full hover:bg-cyan-300 transition-all"
            >
              Log In
            </NavLink>
          </div>

          {/* Mobile Toggle Button */}
          <div className="flex md:hidden items-center">
            <button className="text-3xl" onClick={() => setOpen(!open)}>
              {open ? <IoMdClose /> : <TiThMenuOutline />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu - separate from header container */}
      {open && (
        <nav className="md:hidden bg-white w-full px-4 pb-4 text-center mt-4 flex flex-col items-center justify-center space-y-4 shadow-md transition-all">
          <NavLink to="/home" className="text-xl font-medium w-full" onClick={()=>setOpen(!open)}>
            Home
          </NavLink>
          <NavLink to="/features" className="text-xl font-medium w-full" onClick={()=>setOpen(!open)}>
            Features
          </NavLink>
          <NavLink to="/services" className="text-xl font-medium w-full" onClick={()=>setOpen(!open)}>
            Services
          </NavLink>
          <NavLink to="/testimonials" className="text-xl font-medium w-full" onClick={()=>setOpen(!open)}>
            Testimonials
          </NavLink>
          <NavLink
            to="/signup"
            onClick={()=>setOpen(!open)}
            className="bg-cyan-500 text-white text-xl font-medium px-5 py-2 rounded-full hover:bg-cyan-700 transition-all w-full text-center"
          >
            Sign Up
          </NavLink>
          <NavLink
            to="/login"
            onClick={()=>setOpen(!open)}
            className="bg-transparent text-xl font-medium px-5 py-2 border border-cyan-500 rounded-full hover:bg-cyan-300 transition-all w-full text-center"
          >
            Log In
          </NavLink>
        </nav>
      )}
    </>
  );
};

export default Header;
