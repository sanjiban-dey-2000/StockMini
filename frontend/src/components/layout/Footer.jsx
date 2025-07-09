import React from "react";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer class="tracking-wide bg-gradient-to-br from-black via-black to-purple-700 px-8 sm:px-12 pt-16 pb-8">
      <div class="grid min-[1200px]:grid-cols-3 gap-12 xl:gap-16">
        <div class="min-[1200px]:max-w-sm max-w-lg w-full">
          <div className="flex flex-col items-center space-y-5">
            <h1 className="text-white text-4xl font-bold">
              Stock <span className="text-cyan-400">Mini</span>
            </h1>
            <div className="flex items-center justify-center space-x-4">
              <a href="" className="text-white text-3xl">
                <FaFacebook />
              </a>
              <a href="" className="text-white text-3xl">
                <FaInstagram />
              </a>
              <a href="" className="text-white text-3xl">
                <FaLinkedinIn />
              </a>
              <a href="" className="text-white text-3xl">
                <FaXTwitter />
              </a>
            </div>
          </div>
        </div>

        <div class="min-[1200px]:col-span-2 grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div>
            <h4 class="text-white font-medium text-base">Services</h4>
            <ul class="mt-6 space-y-4">
              <li>
                <a
                  href="javascript:void(0)"
                  class="hover:text-white text-slate-400 text-sm font-normal"
                >
                  Web Development
                </a>
              </li>
              <li>
                <a
                  href="javascript:void(0)"
                  class="hover:text-white text-slate-400 text-sm font-normal"
                >
                  Pricing
                </a>
              </li>
              <li>
                <a
                  href="javascript:void(0)"
                  class="hover:text-white text-slate-400 text-sm font-normal"
                >
                  Support
                </a>
              </li>
              <li>
                <a
                  href="javascript:void(0)"
                  class="hover:text-white text-slate-400 text-sm font-normal"
                >
                  Client Portal
                </a>
              </li>
              <li>
                <a
                  href="javascript:void(0)"
                  class="hover:text-white text-slate-400 text-sm font-normal"
                >
                  Resources
                </a>
              </li>
              <li>
                <a
                  href="javascript:void(0)"
                  class="hover:text-white text-slate-400 text-sm font-normal"
                >
                  App Development
                </a>
              </li>
              <li>
                <a
                  href="javascript:void(0)"
                  class="hover:text-white text-slate-400 text-sm font-normal"
                >
                  UI/UX Design
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 class="text-white font-medium text-base">Platforms</h4>
            <ul class="space-y-4 mt-6">
              <li>
                <a
                  href="javascript:void(0)"
                  class="hover:text-white text-slate-400 text-sm font-normal"
                >
                  Hubspot
                </a>
              </li>
              <li>
                <a
                  href="javascript:void(0)"
                  class="hover:text-white text-slate-400 text-sm font-normal"
                >
                  Integration Services
                </a>
              </li>
              <li>
                <a
                  href="javascript:void(0)"
                  class="hover:text-white text-slate-400 text-sm font-normal"
                >
                  Marketing Glossar
                </a>
              </li>
              <li>
                <a
                  href="javascript:void(0)"
                  class="hover:text-white text-slate-400 text-sm font-normal"
                >
                  UIPath
                </a>
              </li>
              <li>
                <a
                  href="javascript:void(0)"
                  class="hover:text-white text-slate-400 text-sm font-normal"
                >
                  Marketo Integration
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 class="text-white font-medium text-base">Company</h4>

            <ul class="space-y-4 mt-6">
              <li>
                <a
                  href="javascript:void(0)"
                  class="hover:text-white text-slate-400 text-sm font-normal"
                >
                  About us
                </a>
              </li>
              <li>
                <a
                  href="javascript:void(0)"
                  class="hover:text-white text-slate-400 text-sm font-normal"
                >
                  Careers
                </a>
              </li>
              <li>
                <a
                  href="javascript:void(0)"
                  class="hover:text-white text-slate-400 text-sm font-normal"
                >
                  Blog
                </a>
              </li>
              <li>
                <a
                  href="javascript:void(0)"
                  class="hover:text-white text-slate-400 text-sm font-normal"
                >
                  Portfolio
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <hr class="mt-10 mb-8 border-gray-600" />

      <div class="flex flex-wrap max-md:flex-col gap-4">
        <ul class="md:flex md:space-x-6 max-md:space-y-4">
          <li>
            <a
              href="javascript:void(0)"
              class="hover:text-white text-slate-400 text-sm font-normal"
            >
              Terms of Service
            </a>
          </li>
          <li>
            <a
              href="javascript:void(0)"
              class="hover:text-white text-slate-400 text-sm font-normal"
            >
              Privacy Policy
            </a>
          </li>
          <li>
            <a
              href="javascript:void(0)"
              class="hover:text-white text-slate-400 text-sm font-normal"
            >
              Security
            </a>
          </li>
        </ul>

        <p class="text-slate-400 text-sm md:ml-auto">
          © Stock Mini. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
