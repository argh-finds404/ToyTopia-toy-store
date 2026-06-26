import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { db } from "../firebase/firebase.config";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { 
  FaUser, 
  FaEnvelope, 
  FaCamera, 
  FaHeart, 
  FaCalendarAlt, 
  FaHome,
  FaCheckCircle,
  FaEdit,
  FaSave,
  FaTimes
} from "react-icons/fa";

const Profile = () => {
  const { user, updateUser, logOut } = useContext(AuthContext);
  const [name, setName] = useState(user?.displayName || "");
  const [photoURL, setPhotoURL] = useState(user?.photoURL || "");
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [wishlistCount, setWishlistCount] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return;
    const q = query(
      collection(db, "wishlist"),
      where("userEmail", "==", user.email)
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setWishlistCount(snapshot.size);
    });
    return () => unsubscribe();
  }, [user]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updateUser({ displayName: name, photoURL });
      toast.success("Profile updated successfully!");
      setIsEditing(false);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setName(user?.displayName || "");
    setPhotoURL(user?.photoURL || "");
    setIsEditing(false);
  };

  const handleLogOut = () => {
    logOut()
      .then(() => {
        toast.success("Logged out successfully");
        navigate("/");
      })
      .catch((error) => toast.error(error.message));
  };

  const handleImageError = (e) => {
    e.target.src = "https://i.ibb.co.com/8Dy44W5R/user-placeholder.png";
  };

  return (
    <div className="bg-[#f8f9ff] min-h-screen flex flex-col justify-between select-none">
      <Helmet>
        <title>My Dashboard | ToyTopia</title>
      </Helmet>
      <Header />

      <main className="w-11/12 max-w-7xl mx-auto my-12 flex-grow">
        {/* Cover Photo / Hero Section */}
        <div className="relative w-full mb-24">
          <div className="w-full h-48 md:h-64 rounded-[2rem] overflow-hidden shadow-sm border border-slate-100 bg-gradient-to-r from-toy-primary via-toy-accent to-toy-secondary relative">
            <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
          </div>
          
          {/* Avatar Container bleeding out of the cover */}
          <div className="absolute -bottom-16 left-8 md:left-12 flex items-end gap-6 z-10">
            <div className="relative">
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-8 border-[#f8f9ff] shadow-lg overflow-hidden bg-white">
                <img
                  src={user?.photoURL || "https://i.ibb.co.com/8Dy44W5R/user-placeholder.png"}
                  alt="Avatar"
                  className="w-full h-full object-cover"
                  onError={handleImageError}
                />
              </div>
              <div className="absolute bottom-2 right-2 bg-toy-mint text-white p-1.5 rounded-full border-4 border-[#f8f9ff] shadow-sm">
                <FaCheckCircle size={14} />
              </div>
            </div>
            
            <div className="mb-0 hidden sm:block">
              <h1 className="text-3xl md:text-4xl font-extrabold text-slate-800 drop-shadow-sm">
                {user?.displayName || "Toy Explorer"}
              </h1>
              <p className="text-sm font-bold text-slate-500 drop-shadow-sm mt-1">
                {user?.email}
              </p>
            </div>
          </div>
        </div>

        {/* Mobile Title (shown only on small screens) */}
        <div className="sm:hidden px-4 mb-8 text-center -mt-16 relative z-10">
          <h1 className="text-2xl font-extrabold text-slate-800">
            {user?.displayName || "Toy Explorer"}
          </h1>
          <p className="text-xs font-semibold text-slate-500 mt-1">
            {user?.email}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Stats & Actions */}
          <div className="space-y-6">
            <div className="bg-white border border-slate-100 rounded-3xl shadow-sm p-6 space-y-4">
              <h3 className="text-lg font-bold text-slate-800 border-b border-slate-50 pb-3">Quick Stats</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 text-center flex flex-col items-center justify-center">
                  <FaHeart className="text-toy-accent text-2xl mb-2" />
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Wishlist</p>
                  <p className="text-xl font-black text-slate-700">{wishlistCount}</p>
                </div>
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 text-center flex flex-col items-center justify-center">
                  <FaCalendarAlt className="text-toy-primary text-2xl mb-2" />
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Member Since</p>
                  <p className="text-sm font-black text-slate-700 mt-1">Today</p>
                </div>
              </div>
            </div>

            <div className="bg-white border border-slate-100 rounded-3xl shadow-sm p-6 space-y-4">
              <h3 className="text-lg font-bold text-slate-800 border-b border-slate-50 pb-3">Family Tools</h3>
              <div className="space-y-2">
                <button className="w-full text-left px-4 py-3 bg-slate-50 hover:bg-toy-primary-light hover:text-toy-primary text-slate-600 font-bold rounded-xl transition-colors text-sm border border-slate-100 flex items-center justify-between">
                  Parental Controls <span className="text-xs bg-slate-200 px-2 py-0.5 rounded text-slate-500">New</span>
                </button>
                <button className="w-full text-left px-4 py-3 bg-slate-50 hover:bg-toy-primary-light hover:text-toy-primary text-slate-600 font-bold rounded-xl transition-colors text-sm border border-slate-100">
                  Child Profiles
                </button>
                <button className="w-full text-left px-4 py-3 bg-slate-50 hover:bg-toy-primary-light hover:text-toy-primary text-slate-600 font-bold rounded-xl transition-colors text-sm border border-slate-100">
                  Order History
                </button>
              </div>
            </div>

            <div className="bg-white border border-slate-100 rounded-3xl shadow-sm p-6 space-y-3">
              <h3 className="text-lg font-bold text-slate-800 border-b border-slate-50 pb-3">Account Actions</h3>
              {!isEditing && (
                <button
                  onClick={() => setIsEditing(true)}
                  className="w-full flex items-center justify-center gap-2 bg-toy-primary hover:bg-toy-primary/95 text-white font-bold text-sm py-3.5 rounded-2xl shadow-md shadow-toy-primary/20 hover:shadow-lg hover:-translate-y-0.5 active:scale-95 transition-all cursor-pointer"
                >
                  <FaEdit /> Edit Profile
                </button>
              )}
              <button
                onClick={() => navigate("/")}
                className="w-full flex items-center justify-center gap-2 bg-slate-50 hover:bg-slate-100 text-slate-600 font-bold text-sm py-3.5 rounded-2xl border border-slate-200/60 active:scale-95 transition-all cursor-pointer"
              >
                <FaHome /> Back to Store
              </button>
              <button
                onClick={handleLogOut}
                className="w-full flex items-center justify-center gap-2 bg-rose-50 hover:bg-rose-100 text-rose-500 font-bold text-sm py-3.5 rounded-2xl border border-rose-100 active:scale-95 transition-all cursor-pointer mt-2"
              >
                Log Out
              </button>
            </div>
          </div>

          {/* Right Column: Profile Details / Edit Form */}
          <div className="lg:col-span-2">
            <div className="bg-white border border-slate-100 rounded-3xl shadow-sm p-6 sm:p-8 h-full">
              {!isEditing ? (
                <div className="space-y-6">
                  <div className="flex justify-between items-center border-b border-slate-100 pb-4">
                    <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                      <FaUser className="text-toy-primary" /> Profile Information
                    </h2>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-1">
                      <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Full Name</p>
                      <p className="text-sm font-bold text-slate-800 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                        {user?.displayName || "Not Provided"}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Email Address</p>
                      <p className="text-sm font-bold text-slate-800 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                        {user?.email}
                      </p>
                    </div>
                    <div className="md:col-span-2 space-y-1">
                      <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Photo URL</p>
                      <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex items-center gap-4 overflow-hidden">
                        <FaCamera className="text-slate-400 shrink-0" />
                        <p className="text-xs text-slate-600 truncate font-medium">
                          {user?.photoURL || "No photo uploaded"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleUpdate} className="space-y-6">
                  <div className="flex justify-between items-center border-b border-slate-100 pb-4">
                    <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                      <FaEdit className="text-toy-primary" /> Edit Information
                    </h2>
                  </div>
                  
                  <div className="space-y-5">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                        Display Name
                      </label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-sm rounded-2xl px-5 py-3.5 focus:outline-none focus:ring-2 focus:ring-toy-primary/50 focus:border-toy-primary transition-all font-semibold"
                        placeholder="e.g. John Doe"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                        Profile Photo URL
                      </label>
                      <input
                        type="url"
                        value={photoURL}
                        onChange={(e) => setPhotoURL(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-sm rounded-2xl px-5 py-3.5 focus:outline-none focus:ring-2 focus:ring-toy-primary/50 focus:border-toy-primary transition-all font-semibold"
                        placeholder="https://example.com/photo.jpg"
                        required
                      />
                    </div>
                  </div>

                  <div className="flex gap-4 pt-4">
                    <button
                      type="submit"
                      disabled={loading}
                      className="flex-1 flex items-center justify-center gap-2 bg-toy-mint hover:bg-toy-mint/90 text-white font-bold py-3.5 rounded-2xl shadow-md shadow-toy-mint/20 active:scale-95 transition-all cursor-pointer disabled:opacity-70 text-sm"
                    >
                      {loading ? <span className="loading loading-spinner loading-sm"></span> : <><FaSave /> Save Changes</>}
                    </button>
                    <button
                      type="button"
                      onClick={handleCancel}
                      disabled={loading}
                      className="flex-1 flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold py-3.5 rounded-2xl active:scale-95 transition-all cursor-pointer text-sm"
                    >
                      <FaTimes /> Cancel
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Profile;
