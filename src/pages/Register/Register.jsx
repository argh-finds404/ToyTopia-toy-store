import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "framer-motion";
import { FaUser, FaEnvelope, FaImage, FaLock, FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";

const slides = [
  {
    image: "/img4.jpg",
    title: "Build Castles & Worlds",
    text: "Encourage hands-on storytelling and architectural design with our classic lego and building sets."
  },
  {
    image: "/img5.jpg",
    title: "Create Magical Moments",
    text: "From birthday gift wrap sets to holiday items, find the perfect toy to light up your child's eyes."
  },
  {
    image: "/img6.jpg",
    title: "Join The Playroom Today",
    text: "Unlock wishlists, write product reviews, save delivery trackers, and enjoy 365-day free returns."
  }
];

const Register = () => {
  const { createUser, updateUser, signInWithGoogle } = useContext(AuthContext);
  const [password, setPassword] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  const [nameError, setNameError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;

  // Auto transition slides
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);

    if (!/(?=.*[A-Z])/.test(value))
      setPasswordMessage("Include an uppercase letter.");
    else if (!/(?=.*[a-z])/.test(value))
      setPasswordMessage("Include a lowercase letter.");
    else if (value.length < 6) setPasswordMessage("At least 6 characters.");
    else setPasswordMessage("Good to go!");
  };

  const handleRegister = (e) => {
    e.preventDefault();
    const name = e.target.name.value.trim();
    const email = e.target.email.value;
    const photo = e.target.photo.value;

    if (name.length < 5) {
      setNameError("Name must be at least 5 characters.");
      return;
    } else setNameError("");

    if (!passwordRegex.test(password)) {
      setPasswordMessage("Password invalid.");
      return;
    }

    createUser(email, password)
      .then(() => updateUser({ displayName: name, photoURL: photo }))
      .then(() => {
        toast.success("Account created successfully! Welcome aboard.");
        navigate("/");
      })
      .catch((err) => toast.error(err.message));
  };

  const handleGoogleRegister = () => {
    signInWithGoogle()
      .then(() => {
        toast.success("Registered with Google successfully!", {
          position: "top-center",
          autoClose: 2000,
        });
        navigate("/");
      })
      .catch((err) => toast.error(err.message));
  };

  return (
    <div className="max-w-4xl mx-auto my-6 bg-white rounded-3xl shadow-xl overflow-hidden flex h-[620px] border border-slate-100">
      <Helmet>
        <title>Register | ToyTopia</title>
      </Helmet>

      {/* Left Column: Picture Animation Slider */}
      <div className="hidden md:flex md:w-1/2 relative overflow-hidden h-full flex-col justify-end p-8 text-white select-none">
        {/* Animated Slide Image */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 0.85, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${slides[currentSlide].image})` }}
          />
        </AnimatePresence>

        {/* Soft overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/35 to-transparent"></div>

        {/* Overlay Content */}
        <div className="relative z-10 space-y-3">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35 }}
            >
              <span className="text-[10px] font-extrabold bg-toy-secondary text-white px-2.5 py-1 rounded-lg uppercase tracking-wider inline-block">
                Create Playroom
              </span>
              <h2 className="text-2xl font-extrabold mt-2 text-white leading-tight">
                {slides[currentSlide].title}
              </h2>
              <p className="text-xs text-slate-200 mt-1 leading-relaxed">
                {slides[currentSlide].text}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Bullet Indicators */}
          <div className="flex gap-1.5 pt-2">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentSlide(i)}
                className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                  currentSlide === i ? "w-5 bg-white" : "w-1.5 bg-white/40"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Right Column: Auth Form */}
      <div className="w-full md:w-1/2 p-6 sm:p-10 flex flex-col justify-center overflow-y-auto">
        <div className="mb-4 text-center md:text-left">
          <h2 className="text-2xl font-extrabold text-gray-800">Join Us!</h2>
          <p className="text-xs text-gray-400 mt-1">Create an account to start shopping toys</p>
        </div>

        <form onSubmit={handleRegister} className="space-y-3">
          {/* Name field */}
          <div className="flex flex-col gap-0.5">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider" htmlFor="name">
              Full Name
            </label>
            <div className="relative">
              <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={12} />
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Teddy Bear"
                required
                className="w-full pl-11 pr-4 py-2 bg-slate-50 border border-slate-100 rounded-xl outline-none focus:bg-white focus:border-toy-primary text-xs transition-all text-gray-700 font-semibold"
              />
            </div>
            {nameError && <p className="text-[10px] text-toy-accent font-semibold mt-0.5">{nameError}</p>}
          </div>

          {/* Email field */}
          <div className="flex flex-col gap-0.5">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider" htmlFor="email">
              Email Address
            </label>
            <div className="relative">
              <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={12} />
              <input
                type="email"
                name="email"
                id="email"
                placeholder="kitty@toybox.com"
                required
                className="w-full pl-11 pr-4 py-2 bg-slate-50 border border-slate-100 rounded-xl outline-none focus:bg-white focus:border-toy-primary text-xs transition-all text-gray-700 font-semibold"
              />
            </div>
          </div>

          {/* Photo field */}
          <div className="flex flex-col gap-0.5">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider" htmlFor="photo">
              Photo URL
            </label>
            <div className="relative">
              <FaImage className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={12} />
              <input
                type="text"
                name="photo"
                id="photo"
                placeholder="https://image-url.com/avatar.jpg"
                required
                className="w-full pl-11 pr-4 py-2 bg-slate-50 border border-slate-100 rounded-xl outline-none focus:bg-white focus:border-toy-primary text-xs transition-all text-gray-700 font-semibold"
              />
            </div>
          </div>

          {/* Password field */}
          <div className="flex flex-col gap-0.5">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider" htmlFor="password">
              Password
            </label>
            <div className="relative">
              <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={12} />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                value={password}
                onChange={handlePasswordChange}
                placeholder="••••••••"
                required
                className="w-full pl-11 pr-11 py-2 bg-slate-50 border border-slate-100 rounded-xl outline-none focus:bg-white focus:border-toy-primary text-xs transition-all text-gray-700 font-semibold"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                {showPassword ? <FaEyeSlash size={14} /> : <FaEye size={14} />}
              </button>
            </div>
            {passwordMessage && (
              <p
                className={`text-[10px] font-bold mt-0.5 ${
                  passwordMessage === "Good to go!" ? "text-toy-mint" : "text-toy-accent"
                }`}
              >
                {passwordMessage}
              </p>
            )}
          </div>

          {/* Submit button */}
          <button
            type="submit"
            className="w-full py-2.5 bg-toy-secondary hover:bg-toy-secondary/95 text-white font-extrabold rounded-xl text-xs shadow-md shadow-toy-secondary/10 transition-all hover:shadow-lg active:scale-98 cursor-pointer mt-2"
          >
            Create Account
          </button>
        </form>

        {/* Divider */}
        <div className="relative flex items-center my-3.5">
          <div className="flex-grow border-t border-slate-100"></div>
          <span className="flex-shrink mx-3 text-[9px] text-gray-400 uppercase font-bold tracking-wider">
            or sign up with
          </span>
          <div className="flex-grow border-t border-slate-100"></div>
        </div>

        {/* Google Sign In */}
        <button
          onClick={handleGoogleRegister}
          type="button"
          className="w-full py-2 border border-slate-200 hover:bg-slate-50 text-gray-700 font-bold rounded-xl text-[10px] flex items-center justify-center gap-2 active:scale-98 transition-all cursor-pointer shadow-sm"
        >
          <FaGoogle className="text-toy-secondary" />
          Continue with Google
        </button>

        {/* Login link */}
        <p className="text-[11px] text-gray-500 text-center mt-4">
          Already have an account?{" "}
          <Link to="/auth/login" className="text-toy-secondary font-bold hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;

