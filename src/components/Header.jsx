import React from 'react';
import logo from "../assets/newLogo.png"
import { Link } from 'react-router';
const Header = () => {
    
    return (
      <div>
        <div className="navbar bg-base-100 shadow-sm w-11/12 mx-auto">
          <div className="navbar-start">
            <div className="dropdown">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost lg:hidden"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {" "}
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />{" "}
                </svg>
              </div>
              <ul
                tabIndex="-1"
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
              >
                <li>
                  <Link to="/" className="text-[#003049]">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/aboutus">About Us</Link>
                </li>
                <li>
                  <Link to="/blog">Blog</Link>
                </li>
                <li>
                  <Link to="/contact">Contact</Link>
                </li>
                <li>
                  <Link to="/livetrack">Track Order</Link>
                </li>
              </ul>
            </div>
            <img
              className="w-[80px] h-[50px] object-cover bg-white"
              src={logo}
            />
          </div>
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1 ">
              <li className="text-[#f72585] hover:text-[#ebc034]">
                <Link>Home</Link>
              </li>
              <li className="text-[#f72585] hover:text-[#ebc034]">
                <Link>About Us</Link>
              </li>
              <li className="text-[#f72585] hover:text-[#ebc034]">
                <Link>Blog</Link>
              </li>
              <li className="text-[#f72585] hover:text-[#ebc034]">
                <Link>Contact</Link>
              </li>
              <li className="text-[#f72585] hover:text-[#ebc034]">
                <Link>Track Order</Link>
              </li>
            </ul>
          </div>

          <div className="navbar-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                />
              </div>
            </div>
            <Link className="btn">Login</Link>
          </div>
        </div>
      </div>
    );
};

export default Header;