import React, { useEffect, useState, useContext } from "react";
import { useLoaderData, useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";
import { db } from "../firebase/firebase.config";
import {
  collection,
  query,
  where,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
  getDocs,
} from "firebase/firestore";
import { toast } from "react-toastify";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { Helmet } from "react-helmet-async";

const CategoriesToys = () => {
  const { id } = useParams();
  const data = useLoaderData();
  const { user } = useContext(AuthContext);
  const [categoryToys, setCategoryToys] = useState([]);
  const [wishlistIds, setWishlistIds] = useState([]);
  const navigate = useNavigate();

  // Real-time wishlist listener
  useEffect(() => {
    if (!user) return;
    const q = query(
      collection(db, "wishlist"),
      where("userEmail", "==", user.email)
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setWishlistIds(snapshot.docs.map((doc) => doc.data().toyId));
    });
    return () => unsubscribe();
  }, [user]);

  // Filter toys by category
  useEffect(() => {
    const filtered = id ? data.filter((toy) => toy.categoryId == id) : data;
    setCategoryToys(filtered);
  }, [data, id]);

  const toggleWishlist = async (toy) => {
    if (!user) {
      toast.error("You must be logged in to manage wishlist");
      return;
    }

    const wishlistRef = collection(db, "wishlist");

    if (wishlistIds.includes(toy.toyId)) {
      const q = query(
        wishlistRef,
        where("userEmail", "==", user.email),
        where("toyId", "==", toy.toyId)
      );
      const snapshot = await getDocs(q);
      snapshot.forEach(async (docSnap) => {
        await deleteDoc(doc(db, "wishlist", docSnap.id));
      });
      toast.success("Removed from wishlist");
    } else {
      await addDoc(wishlistRef, {
        userEmail: user.email,
        toyId: toy.toyId,
        toyName: toy.toyName,
        subCategory: toy.subCategory,
        price: toy.price,
        pictureURL: toy.pictureURL,
      });
      toast.success("Added to wishlist");
    }
  };

  return (
    <div className="w-11/12 mx-auto my-10">
      <Helmet>
        <title>{id ? "Category Toys" : "All Toys"}</title>
      </Helmet>

      <div className="flex flex-col items-center text-center mb-10">
        <p className="text-sm text-gray-500 font-semibold">
          {id ? "Trending Now" : "Let's Shop"}
        </p>
        <h2 className="text-4xl font-bold text-gray-700">
          <span className="text-[#fca311]">
            {id ? "Best Selling " : "Popular "}
          </span>
          {id ? "Products..." : "Toys..."}
        </h2>
      </div>

      <p className="text-center text-gray-500 mb-8">
        Total{" "}
        <span className="font-semibold text-[#2a9d8f]">
          {categoryToys.length}
        </span>{" "}
        type{categoryToys.length !== 1 ? "s" : ""} found
      </p>

      {categoryToys.length === 0 ? (
        <p className="text-center text-gray-400">
          No toys found in this category.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 justify-items-center">
          {categoryToys.map((toy) => (
            <div
              key={toy.toyId}
              className="relative w-full max-w-sm bg-[#f9f8f6] rounded-2xl shadow-md hover:shadow-2xl hover:-translate-y-1 transition duration-300 hover:bg-[#fafaff] p-5 group"
            >
              {/* Wishlist Heart */}
              <button
                onClick={() => toggleWishlist(toy)}
                className="absolute top-4 right-4 z-10 bg-white p-1 rounded-full shadow-md hover:scale-110 transition-transform"
              >
                {wishlistIds.includes(toy.toyId) ? (
                  <FaHeart className="text-red-500" size={22} />
                ) : (
                  <FaRegHeart className="text-gray-400" size={22} />
                )}
              </button>

              <img
                src={toy.pictureURL}
                alt={toy.toyName}
                className="rounded-xl w-full h-56 object-cover mb-4"
              />
              <h3 className="text-lg font-bold text-gray-700">{toy.toyName}</h3>
              <p className="text-sm text-gray-500">{toy.subCategory}</p>
              <div className="flex justify-between items-center mt-3">
                <p className="text-[#2a9d8f] font-semibold">${toy.price}</p>
                <span className="text-sm text-yellow-500 font-medium">
                  ⭐ {toy.rating}
                </span>
              </div>

              <button
                onClick={() => navigate(`/toys-details/${toy.toyId}`)}
                className="absolute bottom-2 sm:bottom-5 left-1/2 -translate-x-1/2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition duration-300 text-white bg-[#4062bb] hover:bg-[#42a5f5] active:scale-95 px-4 py-2 rounded-lg font-semibold shadow-md"
              >
                Read More
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoriesToys;
