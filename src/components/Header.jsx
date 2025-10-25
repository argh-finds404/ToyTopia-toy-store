import React, { useContext, useEffect, useState } from "react";
import logo from "../assets/newLogo.png";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { FaHome, FaHeart } from "react-icons/fa";
import { IoPeople } from "react-icons/io5";
import { BiLogoBlogger } from "react-icons/bi";
import {
  MdPermContactCalendar,
  MdOutlineTrackChanges,
  MdOutlineLogin,
} from "react-icons/md";
import { RiLogoutBoxLine } from "react-icons/ri";
import { AuthContext } from "../Provider/AuthProvider";
import { db } from "../firebase/firebase.config";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { MdOutlineFavorite } from "react-icons/md";

const Header = () => {
  const { user, logOut } = useContext(AuthContext);
  const [wishlistCount, setWishlistCount] = useState(0);

  const handleLogOut = () => {
    logOut()
      .then(() =>
        toast.success("Logged out successfully 👋", { theme: "colored" })
      )
      .catch((error) => alert(error));
  };

  // Real-time wishlist count
  useEffect(() => {
    if (!user) {
      setWishlistCount(0);
      return;
    }
    const q = query(
      collection(db, "wishlist"),
      where("userEmail", "==", user.email)
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setWishlistCount(snapshot.size);
    });
    return () => unsubscribe();
  }, [user]);

  return (
    <div className="navbar bg-base-100 shadow-sm max-w-11/12 mx-auto px-6 rounded-2xl relative">
      <div className="navbar-start">
        <img
          className="w-[80px] h-[50px] object-cover bg-white"
          src={logo}
          alt="Logo"
        />
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal gap-4">
          <li>
            <Link to="/">
              <FaHome /> Home
            </Link>
          </li>
          <li>
            <Link to="/aboutus">
              <IoPeople /> About Us
            </Link>
          </li>
          <li>
            <Link to="/blog">
              <BiLogoBlogger /> Blog
            </Link>
          </li>
          <li>
            <Link to="/contact">
              <MdPermContactCalendar /> Contact
            </Link>
          </li>
          <li>
            <Link to="/livetrack">
              <MdOutlineTrackChanges /> Track Order
            </Link>
          </li>
          <li className="relative">
            <Link to="/wishlist" className="flex items-center gap-2">
              <MdOutlineFavorite /> Wishlist
              {wishlistCount > 0 && (
                <span className="ml-1 bg-red-500 text-white rounded-full px-2 text-xs absolute -top-2 -right-3">
                  {wishlistCount}
                </span>
              )}
            </Link>
          </li>
        </ul>
      </div>

      <div className="navbar-end flex items-center gap-2 relative">
        {user ? (
          <>
            <Link to="/profile" className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full border-2 border-blue-500">
                <img
                  alt="Avatar"
                  src={user.photoURL || "https://via.placeholder.com/100"}
                />
              </div>
            </Link>
            <button
              onClick={handleLogOut}
              className="btn bg-[#ef233c] text-[#edf2f4] flex items-center gap-1"
            >
              <RiLogoutBoxLine /> LogOut
            </button>
          </>
        ) : (
          <Link
            to="/auth/login"
            className="btn rounded-xl bg-[#1976d2] text-[#edf2f4] flex items-center gap-1"
          >
            <MdOutlineLogin /> Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default Header;
