import React, { useState } from "react";
import logo from "../assets/newLogo.png";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { FaTwitter, FaYoutube, FaFacebookF, FaPaperPlane } from "react-icons/fa";

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    toast.success("Welcome to the ToyTopia newsletter family!", {
      position: "bottom-right",
      autoClose: 3000,
    });
    setEmail("");
  };

  return (
    <div className="bg-slate-900 bg-gradient-to-br from-slate-900 to-slate-800 text-slate-300 border-t border-slate-700/50 shadow-[0_-10px_40px_rgba(0,0,0,0.1)]">
      <div className="py-16 px-6 sm:px-12 max-w-7xl mx-auto">
        <footer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 text-center md:text-left">
          {/* Logo & Tagline */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="inline-flex items-center gap-3">
              <img className="h-10 w-auto object-contain" src={logo} alt="ToyTopia Logo" />
              <span className="font-extrabold text-2xl tracking-tight text-white">
                Toy<span className="text-toy-primary">Topia</span>
              </span>
            </Link>
            <p className="text-xs text-slate-400 max-w-xs leading-relaxed">
              ToyTopia is the ultimate creative play store for children and parents. Explore, dream, and play with our premium quality curated toys.
            </p>
            <div className="flex justify-center md:justify-start gap-4 pt-2">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-slate-800 text-slate-300 flex items-center justify-center hover:bg-toy-primary hover:text-white transition-all duration-300 hover:scale-110 shadow-sm"
              >
                <FaTwitter size={14} />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-slate-800 text-slate-300 flex items-center justify-center hover:bg-[#ff0000] hover:text-white transition-all duration-300 hover:scale-110 shadow-sm"
              >
                <FaYoutube size={14} />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-slate-800 text-slate-300 flex items-center justify-center hover:bg-[#1877f2] hover:text-white transition-all duration-300 hover:scale-110 shadow-sm"
              >
                <FaFacebookF size={14} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Explore</h4>
            <ul className="space-y-2 text-xs">
              <li><Link to="/" className="hover:text-toy-primary transition-colors text-slate-400 font-semibold">Home</Link></li>
              <li><Link to="/aboutus" className="hover:text-toy-primary transition-colors text-slate-400 font-semibold">About Us</Link></li>
              <li><Link to="/blog" className="hover:text-toy-primary transition-colors text-slate-400 font-semibold">Blog</Link></li>
              <li><Link to="/contact" className="hover:text-toy-primary transition-colors text-slate-400 font-semibold">Contact</Link></li>
            </ul>
          </div>

          {/* Customer Care */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider font-extrabold">Features</h4>
            <ul className="space-y-2 text-xs">
              <li><Link to="/livetrack" className="hover:text-toy-primary transition-colors text-slate-400 font-semibold">Track Order</Link></li>
              <li><Link to="/wishlist" className="hover:text-toy-primary transition-colors text-slate-400 font-semibold">Wishlist</Link></li>
              <li><Link to="/profile" className="hover:text-toy-primary transition-colors text-slate-400 font-semibold">My Profile</Link></li>
              <li><span className="text-slate-500 cursor-not-allowed">Cookie Policy</span></li>
            </ul>
          </div>

          {/* Newsletter Form */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Newsletter</h4>
            <p className="text-[11px] text-slate-400 leading-normal">
              Subscribe to get child development guides, coupons, and toy releases!
            </p>
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2 mt-2">
              <input
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-slate-900 text-white rounded-xl px-3.5 py-2 text-xs outline-none border border-slate-800 focus:border-toy-primary transition-all w-full placeholder-slate-500"
                required
              />
              <button
                type="submit"
                className="bg-toy-primary hover:bg-toy-primary/90 text-white font-semibold text-xs px-4 py-2 rounded-xl flex items-center justify-center gap-1 active:scale-95 transition-all shadow-sm cursor-pointer whitespace-nowrap"
              >
                <FaPaperPlane size={10} /> Join
              </button>
            </form>
          </div>
        </footer>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-slate-850 text-center text-[11px] text-slate-500 font-semibold">
          <p>© {new Date().getFullYear()} ToyTopia Shop Ltd. Crafted with 💖 for smiling children everywhere.</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;


