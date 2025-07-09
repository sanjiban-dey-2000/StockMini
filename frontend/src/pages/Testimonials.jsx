import React from "react";

const testimonials = [
  {
    name: "John Doe",
    image: "https://readymadeui.com/team-2.webp",
    rating: 3,
    review:
      "StockMini made it so easy to launch my inventory system. The features are clean, fast, and saved me hours of management work.",
  },
  {
    name: "Mark Adair",
    image: "https://readymadeui.com/team-3.webp",
    rating: 5,
    review:
      "I love how professional everything looks with StockMini. The UI is modern, responsive, and easy to use.",
  },
  {
    name: "Simon Konecki",
    image: "https://readymadeui.com/team-4.webp",
    rating: 4,
    review:
      "StockMini gave my business a polished and efficient inventory tracking system. The dashboard is beautifully designed and user-friendly.",
  },
];

const Star = ({ filled }) => (
  <svg
    className={`w-4 h-4 ${filled ? "fill-purple-600" : "fill-[#CED5D8]"}`}
    viewBox="0 0 14 13"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
  </svg>
);

const Testimonials = () => {
  return (
    <section className="py-16 px-10 max-w-6xl mx-auto">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-slate-900 !leading-tight">
          What Our Happy Clients Say
        </h2>
        <p className="text-[15px] mt-6 leading-relaxed text-slate-600">
          See what our clients say about StockMini. They’ve shared how our platform helped them track inventory, reduce loss, and scale with ease.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 max-md:justify-center text-center max-lg:max-w-3xl max-md:max-w-lg mx-auto mt-16">
        {testimonials.map((user, index) => (
          <div key={index}>
            <div className="flex flex-col items-center">
              <img
                src={user.image}
                alt={user.name}
                className="w-24 h-24 rounded-full border-2 border-purple-600"
              />
              <div className="mt-6">
                <h4 className="text-base font-semibold text-slate-900">{user.name}</h4>
              </div>
            </div>

            <div className="flex justify-center space-x-1 mt-3">
              {Array.from({ length: 5 }, (_, i) => (
                <Star key={i} filled={i < user.rating} />
              ))}
            </div>

            <div className="mt-6">
              <p className="text-[15px] leading-relaxed text-slate-700 font-normal">
                {user.review}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
