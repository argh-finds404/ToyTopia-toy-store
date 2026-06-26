import React, { useState, useEffect, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "framer-motion";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";

const slides = [
  {
    image: "/img1.jpg",
    title: "Explore Fun & Learning",
    text: "ToyTopia curates the finest educational and creative toys to spark imagination and boost spatial intelligence."
  },
  {
    image: "/img2.jpg",
    title: "Premium & Safe Quality",
    text: "All items are certified safe, non-toxic, and built with child-friendly materials. Play without worries!"
  },
  {
    image: "/img3.jpg",
    title: "Follow Your Deliveries",
    text: "Watch the animated delivery truck travel in real-time straight to your playpen with our new tracking simulator."
  }
];

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { logIn, setUser, signInWithGoogle } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto transition slides
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    logIn(email, password)
      .then((res) => {
        setUser(res.user);
        toast.success("Welcome back to ToyTopia!", {
          position: "top-center",
          autoClose: 2000,
        });
        navigate(location.state?.from?.pathname || "/");
      })
      .catch((error) => {
        toast.error(error.message, { position: "top-center", autoClose: 3000 });
      });
  };

  const handleGoogleLogin = () => {
    signInWithGoogle()
      .then(() => {
        toast.success("Logged in with Google successfully!", {
          position: "top-center",
          autoClose: 2000,
        });
        navigate(location.state?.from?.pathname || "/");
      })
      .catch((err) => toast.error(err.message));
  };

  return (
    <div className="max-w-4xl mx-auto my-6 bg-white rounded-3xl shadow-xl overflow-hidden flex h-[620px] border border-slate-100">
      <Helmet>
        <title>Login | ToyTopia</title>
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
              <span className="text-[10px] font-extrabold bg-toy-primary text-white px-2.5 py-1 rounded-lg uppercase tracking-wider inline-block">
                ToyTopia Playpen
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
      <div className="w-full md:w-1/2 p-8 sm:p-12 flex flex-col justify-center">
        <div className="mb-6 text-center md:text-left">
          <h2 className="text-2xl font-extrabold text-gray-800">Welcome Back!</h2>
          <p className="text-xs text-gray-400 mt-1">Please enter your details to sign in</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          {/* Email field */}
          <div className="flex flex-col gap-1">
            <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider" htmlFor="email">
              Email Address
            </label>
            <div className="relative">
              <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
              <input
                type="email"
                name="email"
                id="email"
                placeholder="kitty@toybox.com"
                required
                className="w-full pl-11 pr-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl outline-none focus:bg-white focus:border-toy-primary text-sm transition-all text-gray-700 font-semibold"
              />
            </div>
          </div>

          {/* Password field */}
          <div className="flex flex-col gap-1">
            <div className="flex justify-between items-center">
              <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider" htmlFor="password">
                Password
              </label>
              <Link
                to="/auth/forgot-password"
                className="text-[11px] font-bold text-toy-primary hover:underline"
              >
                Forgot Password?
              </Link>
            </div>
            <div className="relative">
              <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                placeholder="••••••••"
                required
                className="w-full pl-11 pr-11 py-2.5 bg-slate-50 border border-slate-100 rounded-xl outline-none focus:bg-white focus:border-toy-primary text-sm transition-all text-gray-700 font-semibold"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                {showPassword ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
              </button>
            </div>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            className="w-full py-3 bg-toy-primary hover:bg-toy-primary/95 text-white font-extrabold rounded-xl text-sm shadow-md shadow-toy-primary/10 transition-all hover:shadow-lg active:scale-98 cursor-pointer mt-2"
          >
            Sign In
          </button>
        </form>

        {/* Divider */}
        <div className="relative flex items-center my-5">
          <div className="flex-grow border-t border-slate-100"></div>
          <span className="flex-shrink mx-3 text-[10px] text-gray-400 uppercase font-bold tracking-wider">
            or continue with
          </span>
          <div className="flex-grow border-t border-slate-100"></div>
        </div>

        {/* Google Sign In */}
        <button
          onClick={handleGoogleLogin}
          type="button"
          className="w-full py-2.5 border border-slate-200 hover:bg-slate-50 text-gray-700 font-bold rounded-xl text-xs flex items-center justify-center gap-2 active:scale-98 transition-all cursor-pointer shadow-sm"
        >
          <FaGoogle className="text-toy-primary" />
          Continue with Google
        </button>

        {/* Register link */}
        <p className="text-xs text-gray-500 text-center mt-6">
          Don't have an account?{" "}
          <Link to="/auth/register" className="text-toy-primary font-bold hover:underline">
            Create account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;

