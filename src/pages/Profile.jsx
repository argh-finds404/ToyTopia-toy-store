import React, { useContext, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { user, updateUser } = useContext(AuthContext);
  const [name, setName] = useState(user?.displayName || "");
  const [photoURL, setPhotoURL] = useState(user?.photoURL || "");
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updateUser({ displayName: name, photoURL });

      toast.success("✅ Profile updated successfully!", { theme: "colored" });
      setIsEditing(false);
    } catch (err) {
      toast.error(`⚠️ ${err.message}`, { theme: "colored" });
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setName(user?.displayName || "");
    setPhotoURL(user?.photoURL || "");
    setIsEditing(false);
  };

  // Handle image error
  const handleImageError = (e) => {
    e.target.src = "https://via.placeholder.com/100";
  };

  return (
    <div className="max-w-lg mx-auto my-10 bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-200">
      <Helmet>
        <title>My Profile</title>
      </Helmet>

      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 text-center text-white">
        <div className="relative w-28 h-28 mx-auto mb-4">
          <img
            src={user?.photoURL || "https://via.placeholder.com/100"}
            alt="User"
            className="w-28 h-28 rounded-full border-4 border-white shadow-lg object-cover"
            onError={handleImageError}
          />
        </div>
        <h2 className="text-2xl font-semibold">
          {user?.displayName || "No Name Set"}
        </h2>
        <p className="text-sm opacity-90">{user?.email}</p>
      </div>

      <div className="p-6 space-y-4">
        {!isEditing ? (
          <div className="text-center space-y-3">
            <button
              onClick={() => setIsEditing(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-xl font-medium shadow-md transition-colors"
            >
              Edit Profile
            </button>
            <button
              onClick={() => navigate("/")}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-6 rounded-xl font-medium transition-colors"
            >
              Go Home
            </button>
          </div>
        ) : (
          <form onSubmit={handleUpdate} className="space-y-5">
            <div>
              <label className="block text-gray-600 font-medium mb-1">
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none transition-colors"
                placeholder="Enter your full name"
                required
              />
            </div>

            <div>
              <label className="block text-gray-600 font-medium mb-1">
                Photo URL
              </label>
              <input
                type="text"
                value={photoURL}
                onChange={(e) => setPhotoURL(e.target.value)}
                className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none transition-colors"
                placeholder="Enter photo URL"
                required
              />
              {photoURL && (
                <div className="mt-2">
                  <p className="text-sm text-gray-500 mb-1">Preview:</p>
                  <img
                    src={photoURL}
                    alt="Preview"
                    className="w-16 h-16 rounded-full object-cover border"
                    onError={(e) => {
                      e.target.src = "https://via.placeholder.com/100";
                    }}
                  />
                </div>
              )}
            </div>

            <div className="flex justify-between gap-2">
              <button
                type="button"
                onClick={handleCancel}
                disabled={loading}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-5 rounded-xl font-medium transition-colors flex-1"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-xl font-medium shadow-md transition-colors flex-1 disabled:opacity-50"
              >
                {loading ? "Saving..." : "Save Changes"}
              </button>
            </div>

            <div className="text-center">
              <button
                type="button"
                onClick={() => navigate("/")}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-6 rounded-xl font-medium transition-colors"
              >
                Go Home
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Profile;
