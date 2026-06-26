import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { FaUser, FaEnvelope, FaLock, FaImage, FaEye, FaEyeSlash, FaGoogle, FaGamepad, FaStar, FaMagic, FaGift } from "react-icons/fa";

const Register = () => {
  const { createNewUser, setUser, updateUserProfile, signInWithGoogle } = useContext(AuthContext);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const photoURL = e.target.photo.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    const regex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    if (!regex.test(password)) {
      toast.error(
        "Password must be at least 6 characters, with 1 uppercase and 1 lowercase letter.",
        { position: "top-center", autoClose: 4000 }
      );
      return;
    }

    createNewUser(email, password)
      .then((res) => {
        updateUserProfile({ displayName: name, photoURL: photoURL })
          .then(() => {
            setUser({ ...res.user, displayName: name, photoURL: photoURL });
            toast.success("Account created successfully!", {
              position: "top-center",
              autoClose: 2000,
            });
            navigate("/");
          })
          .catch((error) => toast.error(error.message));
      })
      .catch((error) => {
        toast.error(error.message, { position: "top-center", autoClose: 3000 });
      });
  };

  const handleGoogleLogin = () => {
    signInWithGoogle()
      .then((res) => {
        setUser(res.user);
        toast.success("Registered with Google successfully!", {
          position: "top-center",
          autoClose: 2000,
        });
        navigate("/");
      })
      .catch((err) => toast.error(err.message));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f0f4f8] p-4 sm:p-8">
      <Helmet>
        <title>Register | ToyTopia</title>
      </Helmet>

      <div className="max-w-6xl w-full bg-white rounded-[2rem] sm:rounded-[3rem] shadow-2xl overflow-hidden flex flex-col md:flex-row-reverse h-auto md:h-[750px] border border-white relative z-10">
        
        {/* Left Column (Now Right Side for Register): Premium Animated Hero */}
        <div className="w-full md:w-1/2 relative overflow-hidden bg-gradient-to-bl from-toy-secondary via-purple-500 to-indigo-600 p-12 flex flex-col justify-between hidden md:flex">
          {/* Animated Background Mesh */}
          <div className="absolute inset-0 opacity-30 mix-blend-overlay" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg width=\\'60\\' height=\\'60\\' viewBox=\\'0 0 60 60\\' xmlns=\\'http://www.w3.org/2000/svg\\'%3E%3Cg fill=\\'none\\' fill-rule=\\'evenodd\\'%3E%3Cg fill=\\'%23ffffff\\' fill-opacity=\\'1\\'%3E%3Cpath d=\\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')" }}></div>
          
          <div className="relative z-10 text-right">
            <Link to="/" className="inline-block font-extrabold text-3xl tracking-tight text-white font-heading drop-shadow-md">
              Toy<span className="text-toy-yellow">Topia</span>
            </Link>
          </div>

          <div className="relative z-10 mt-16 flex-grow text-right">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-6 drop-shadow-lg"
            >
              Join the <br/><span className="text-toy-yellow">Adventure.</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-indigo-100 text-lg max-w-sm font-medium ml-auto"
            >
              Create an account to save your favorite toys, track orders, and earn ToyTopia points!
            </motion.p>
          </div>

          {/* Floating 3D-like Elements */}
          <div className="absolute inset-0 pointer-events-none">
            <motion.div 
              animate={{ y: [0, 25, 0], rotate: [0, -15, 0] }} 
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-1/4 left-1/4 text-6xl text-white/20 backdrop-blur-sm bg-white/10 p-4 rounded-[2.5rem] border border-white/20 shadow-2xl"
            >
              <FaGamepad />
            </motion.div>
            <motion.div 
              animate={{ y: [0, -20, 0], rotate: [0, 15, 0] }} 
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute bottom-1/3 right-1/4 text-7xl text-toy-yellow/80 backdrop-blur-sm bg-white/10 p-4 rounded-[2rem] border border-white/20 shadow-2xl"
            >
              <FaStar />
            </motion.div>
            <motion.div 
              animate={{ y: [0, -30, 0], rotate: [0, -20, 0], scale: [1, 1.1, 1] }} 
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
              className="absolute bottom-1/4 left-1/3 text-5xl text-toy-mint/80 backdrop-blur-sm bg-white/10 p-4 rounded-full border border-white/20 shadow-2xl"
            >
              <FaGift />
            </motion.div>
          </div>
        </div>

        {/* Left Column (Form Side): Glassmorphism Form */}
        <div className="w-full md:w-1/2 relative bg-[#f8f9ff] flex flex-col justify-center p-8 sm:p-12 lg:p-16 overflow-hidden">
          
          {/* Subtle Background Blobs for Glass Effect */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-toy-secondary/10 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-float-slow pointer-events-none"></div>
          <div className="absolute bottom-0 right-0 w-72 h-72 bg-toy-primary/10 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-float-reverse pointer-events-none"></div>

          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="w-full max-w-md mx-auto relative z-10"
          >
            {/* Mobile Logo */}
            <div className="md:hidden text-center mb-8">
              <Link to="/" className="inline-block font-extrabold text-4xl tracking-tight text-toy-primary font-heading drop-shadow-sm">
                Toy<span className="text-toy-secondary">Topia</span>
              </Link>
            </div>

            <div className="mb-8 text-center md:text-left">
              <h2 className="text-3xl font-extrabold text-slate-800">Create Account</h2>
              <p className="text-slate-500 mt-2 font-medium">Join the ultimate toy experience!</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name field */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest pl-1" htmlFor="name">
                  Full Name
                </label>
                <div className="relative group">
                  <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-toy-secondary transition-colors" size={13} />
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="John Doe"
                    required
                    className="w-full bg-white/60 backdrop-blur-md border border-slate-200 text-slate-800 text-sm rounded-xl focus:ring-4 focus:ring-toy-secondary/10 focus:border-toy-secondary block pl-11 p-3.5 transition-all outline-none font-semibold shadow-sm hover:bg-white"
                  />
                </div>
              </div>

              {/* Photo field */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest pl-1" htmlFor="photo">
                  Photo URL
                </label>
                <div className="relative group">
                  <FaImage className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-toy-secondary transition-colors" size={13} />
                  <input
                    type="url"
                    id="photo"
                    name="photo"
                    placeholder="https://example.com/photo.jpg"
                    required
                    className="w-full bg-white/60 backdrop-blur-md border border-slate-200 text-slate-800 text-sm rounded-xl focus:ring-4 focus:ring-toy-secondary/10 focus:border-toy-secondary block pl-11 p-3.5 transition-all outline-none font-semibold shadow-sm hover:bg-white"
                  />
                </div>
              </div>

              {/* Email field */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest pl-1" htmlFor="email">
                  Email Address
                </label>
                <div className="relative group">
                  <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-toy-secondary transition-colors" size={13} />
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="kitty@toybox.com"
                    required
                    className="w-full bg-white/60 backdrop-blur-md border border-slate-200 text-slate-800 text-sm rounded-xl focus:ring-4 focus:ring-toy-secondary/10 focus:border-toy-secondary block pl-11 p-3.5 transition-all outline-none font-semibold shadow-sm hover:bg-white"
                  />
                </div>
              </div>

              {/* Password field */}
              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between items-center pl-1 pr-1">
                  <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest" htmlFor="password">
                    Password
                  </label>
                </div>
                <div className="relative group">
                  <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-toy-secondary transition-colors" size={13} />
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    placeholder="••••••••"
                    required
                    className="w-full bg-white/60 backdrop-blur-md border border-slate-200 text-slate-800 text-sm rounded-xl focus:ring-4 focus:ring-toy-secondary/10 focus:border-toy-secondary block pl-11 pr-12 p-3.5 transition-all outline-none font-semibold shadow-sm hover:bg-white"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-toy-secondary transition-colors cursor-pointer p-1"
                  >
                    {showPassword ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full text-white bg-toy-secondary hover:bg-toy-secondary/95 focus:ring-4 focus:outline-none focus:ring-toy-secondary/30 font-bold rounded-xl text-base px-5 py-4 text-center transition-all shadow-lg shadow-toy-secondary/30 mt-4 border border-white/20"
              >
                Create Account
              </motion.button>
            </form>

            <div className="flex items-center justify-center space-x-3 my-6">
              <div className="h-px bg-slate-200 w-full"></div>
              <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest whitespace-nowrap">Or Continue With</span>
              <div className="h-px bg-slate-200 w-full"></div>
            </div>

            {/* Google Login */}
            <motion.button
              whileHover={{ scale: 1.02, backgroundColor: "#ffffff" }}
              whileTap={{ scale: 0.98 }}
              onClick={handleGoogleLogin}
              type="button"
              className="w-full text-slate-700 bg-white/80 backdrop-blur-sm border-2 border-slate-100 hover:border-slate-200 focus:ring-4 focus:outline-none focus:ring-slate-100 font-extrabold rounded-xl text-sm px-5 py-3.5 text-center flex justify-center items-center gap-3 transition-all shadow-sm"
            >
              <FaGoogle className="text-red-500" size={18} /> Google
            </motion.button>

            <p className="text-sm font-semibold text-slate-500 text-center mt-8">
              Already have an account?{" "}
              <Link to="/auth/login" className="font-extrabold text-toy-secondary hover:underline transition-all">
                Sign in here
              </Link>
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Register;
