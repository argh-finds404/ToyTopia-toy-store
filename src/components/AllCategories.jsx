import React from "react";
import { NavLink } from "react-router-dom";
import ShortCard from "./ShortCard";
import Marquee from "react-fast-marquee";

const categoryPromise = fetch("/categories.json").then((res) => res.json());

const AllCategories = () => {
  const categories = React.use(categoryPromise);

  return (
    <div className="w-full flex flex-col items-center">
      <div className="font-extrabold text-xl py-6 text-center text-slate-800">
        Search <span className="text-toy-primary">Toys</span> by{" "}
        <span className="text-toy-secondary">Categories</span>{" "}
        <span className="text-toy-teal font-extrabold">({categories.length})</span>
      </div>

      <div className="relative w-full overflow-hidden py-4">
        {/* Left & Right Gradient Fade Mask */}
        <div className="absolute top-0 left-0 bottom-0 w-16 bg-gradient-to-r from-[#f8f9ff] to-transparent z-10 pointer-events-none"></div>
        <div className="absolute top-0 right-0 bottom-0 w-16 bg-gradient-to-l from-[#f8f9ff] to-transparent z-10 pointer-events-none"></div>

        <Marquee gradient={false} speed={40}>
          <div className="flex gap-6 px-4">
            <NavLink
              to="/categories"
              className={({ isActive }) =>
                isActive &&
                !categories.find(
                  (cat) => `/categories/${cat.id}` === window.location.pathname
                )
                  ? "active focus:outline-none"
                  : "focus:outline-none"
              }
            >
              <ShortCard
                category={{
                  name: "Show All",
                  img_url:
                    "https://i.ibb.co.com/PZ0tB3Zq/all-removebg-preview.png",
                }}
              />
            </NavLink>

            {categories.map((category) => (
              <NavLink
                to={`/categories/${category.id}`}
                key={category.id}
                className={({ isActive }) =>
                  isActive ? "active focus:outline-none" : "focus:outline-none"
                }
              >
                <ShortCard category={category} />
              </NavLink>
            ))}
          </div>
        </Marquee>
      </div>
    </div>
  );
};

export default AllCategories;

