import React from "react";

const LandingPage = () => {
  return (
    <div className="bg-white py-14 px-6 sm:px-12 bg-gradient-to-r from-pink-50 via-pink-50 to-blue-100">
      <div className="min-w-screen-lg mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-12 items-center">
          {/* Left Column */}
          <div>
            <h2 className="text-slate-900 xl:text-6xl md:text-5xl text-4xl font-bold !leading-tight">
              Stock Mini
            </h2>

            <p className="text-slate-600 text-2xl leading-relaxed mt-6">
              Take full control of your stock with real-time tracking, smart alerts, and an intuitive dashboard.
  Simplify operations, reduce waste, and focus on growing your business—our system handles the rest.
            </p>

            <div className="mt-12 flex gap-6 items-center flex-wrap">
              <button
                type="button"
                className="bg-[#55F5A3] hover:bg-green-400 transition-all text-slate-900 font-semibold text-[20px] rounded-full px-6 py-3 cursor-pointer"
              >
                Getting Started
              </button>
            </div>
          </div>

          {/* Right Column */}
          <div className="aspect-[7/4]">
            <img
              src="https://readymadeui.com/images/kpis-dashboard-img.webp"
              className="shrink-0 w-full h-full rounded-md object-contain"
              alt="dashboard"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
