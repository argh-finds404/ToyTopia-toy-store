import React, { useContext, useEffect, useState } from "react";
import logo from "../assets/newLogo.png";
import { Link, NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import { FaHome, FaGamepad, FaTrophy } from "react-icons/fa";
import { IoPeople } from "react-icons/io5";
import { BiLogoBlogger } from "react-icons/bi";
import {
  MdPermContactCalendar,
  MdOutlineTrackChanges,
  MdOutlineLogin,
  MdOutlineFavorite,
  MdToys,
} from "react-icons/md";
import { RiLogoutBoxLine } from "react-icons/ri";
import { AuthContext } from "../Provider/AuthProvider";
import { db } from "../firebase/firebase.config";
import { collection, query, where, onSnapshot } from "firebase/firestore";

const Header = () => {
  const { user, logOut, loading } = useContext(AuthContext);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleLogOut = () => {
    logOut()
      .then(() =>
        toast.success("Logged out successfully", { theme: "colored" })
      )
      .catch((error) => alert(error));
  };

  // Real-time wishlist count
  useEffect(() => {
    if (!user) {
      setWishlistCount(0);
      return;
    }
    
    let unsubscribe;
    try {
      const q = query(
        collection(db, "wishlist"),
        where("userEmail", "==", user?.email || "")
      );
      unsubscribe = onSnapshot(q, (snapshot) => {
        setWishlistCount(snapshot.size);
      });
    } catch (err) {
      console.error("Header Wishlist Error:", err);
    }
    
    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [user]);

  const mainNavLinks = (
    <>
      <li>
        <NavLink to="/" end className="toy-nav-link">
          <FaHome /> Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/categories" className="toy-nav-link">
          <MdToys /> All Toys
        </NavLink>
      </li>
      <li>
        <NavLink to="/aboutus" className="toy-nav-link">
          <IoPeople /> About Us
        </NavLink>
      </li>
      <li>
        <NavLink to="/wishlist" className="toy-nav-link flex items-center justify-between">
          <span className="flex items-center gap-1">
            <MdOutlineFavorite /> Wishlist
          </span>
          {wishlistCount > 0 && (
            <span className="bg-toy-accent text-white rounded-full h-5 w-5 flex items-center justify-center text-[10px] ml-2">
              {wishlistCount}
            </span>
          )}
        </NavLink>
      </li>
    </>
  );

  const drawerLinks = (
    <>
      <li>
        <NavLink to="/" end className="toy-nav-link">
          <FaHome /> Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/aboutus" className="toy-nav-link">
          <IoPeople /> About Us
        </NavLink>
      </li>
      <li>
        <NavLink to="/blog" className="toy-nav-link">
          <BiLogoBlogger /> Blog
        </NavLink>
      </li>
      <li>
        <NavLink to="/contact" className="toy-nav-link">
          <MdPermContactCalendar /> Contact
        </NavLink>
      </li>
      <li>
        <NavLink to="/livetrack" className="toy-nav-link">
          <MdOutlineTrackChanges /> Track Order
        </NavLink>
      </li>
      <li>
        <NavLink to="/wishlist" className="toy-nav-link flex items-center justify-between">
          <span className="flex items-center gap-2">
            <MdOutlineFavorite /> Wishlist
          </span>
          {wishlistCount > 0 && (
            <span className="bg-toy-accent text-white rounded-full h-5 w-5 flex items-center justify-center text-[10px] ml-2">
              {wishlistCount}
            </span>
          )}
        </NavLink>
      </li>
      <div className="divider my-0"></div>
      <li className="menu-title text-toy-primary font-bold text-xs uppercase tracking-wider">Play & Win</li>
      <li>
        <NavLink to="/games" className="toy-nav-link">
          <FaGamepad /> Games Arcade
        </NavLink>
      </li>
      <li>
        <NavLink to="/competitions" className="toy-nav-link">
          <FaTrophy /> Competitions
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="navbar bg-white sticky top-0 z-50 shadow-sm w-11/12 max-w-7xl mx-auto px-4 sm:px-6 rounded-2xl mt-4 border border-slate-100 transition-all duration-300 min-h-[4rem]">
      {/* Left - Logo & Universal Drawer Toggle */}
      <div className="navbar-start flex items-center gap-2">
        <button 
          onClick={() => setIsDrawerOpen(true)}
          className="btn btn-ghost p-1 mr-1 hover:bg-slate-100 rounded-lg"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-slate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
          </svg>
        </button>

        {/* Universal Side Drawer */}
        <div 
          onClick={() => setIsDrawerOpen(false)}
          className={`fixed inset-0 bg-slate-900/40 z-[100] transition-opacity duration-300 ${isDrawerOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className={`fixed inset-y-0 left-0 w-72 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out flex flex-col ${isDrawerOpen ? "translate-x-0" : "-translate-x-full"}`}
          >
            <div className="flex justify-between items-center p-4 border-b border-slate-100">
              <span className="font-extrabold text-2xl tracking-tight text-toy-primary font-heading drop-shadow-sm">
                Toy<span className="text-toy-secondary">Topia</span>
              </span>
              <button onClick={() => setIsDrawerOpen(false)} className="btn btn-sm btn-circle btn-ghost">✕</button>
            </div>
            <div className="p-4 overflow-y-auto flex-grow">
              <ul className="menu menu-md gap-2 flex flex-col w-full" onClick={() => setIsDrawerOpen(false)}>
                {drawerLinks}
              </ul>
            </div>
          </div>
        </div>

        <Link to="/" className="flex items-center gap-2 select-none">
          <img
            className="h-10 sm:h-12 w-auto object-contain hover:scale-105 transition-transform duration-300"
            src={logo}
            alt="Logo"
          />
          <span className="font-extrabold text-2xl sm:text-3xl tracking-tight text-toy-primary hidden sm:inline-block font-heading drop-shadow-sm">
            Toy<span className="text-toy-secondary">Topia</span>
          </span>
        </Link>
      </div>

      {/* Center - Core Menu for Desktop */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal gap-2 p-0">
          {mainNavLinks}
        </ul>
      </div>

      {/* Right - User / Auth */}
      <div className="navbar-end flex items-center gap-3">
        {loading ? (
          <div className="animate-pulse flex space-x-4">
            <div className="rounded-full bg-slate-200 h-10 w-10"></div>
            <div className="h-10 w-20 bg-slate-200 rounded-xl"></div>
          </div>
        ) : user ? (
          <>
            {/* Avatar with hover name */}
            <div className="relative group">
              <Link to="/profile" className="btn btn-ghost btn-circle avatar hover:ring-2 hover:ring-toy-primary/50 transition-all">
                <div className="w-10 rounded-full border-2 border-toy-primary">
                  <img
                    alt="Avatar"
                    src={user.photoURL || "https://i.ibb.co.com/8Dy44W5R/user-placeholder.png"}
                  />
                </div>
              </Link>

              {/* Hover tooltip */}
              <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs py-1 px-3 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap shadow-md z-[50]">
                {user.displayName || "User"}
              </div>
            </div>

            {/* Logout Button */}
            <button
              onClick={handleLogOut}
              className="btn btn-sm sm:btn-md rounded-xl bg-toy-accent hover:bg-toy-accent/90 text-white border-0 shadow-sm hover:shadow transition-all duration-300 font-bold flex items-center gap-1 active:scale-95 cursor-pointer"
            >
              <RiLogoutBoxLine /> LogOut
            </button>
          </>
        ) : (
          <Link
            to="/auth/login"
            className="btn btn-sm sm:btn-md rounded-xl bg-toy-primary hover:bg-toy-primary/95 text-white border-0 shadow-sm hover:shadow transition-all duration-300 font-bold flex items-center gap-1 active:scale-95"
          >
            <MdOutlineLogin /> Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default Header;

