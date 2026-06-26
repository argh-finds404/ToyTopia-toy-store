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
import { FaHeart, FaRegHeart, FaExclamationCircle } from "react-icons/fa";
import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "framer-motion";
import EmptyState from "../components/EmptyState";

const CategoriesToys = () => {
  const { id } = useParams();
  const data = useLoaderData();
  const { user } = useContext(AuthContext);
  const [categoryToys, setCategoryToys] = useState([]);
  const [wishlistIds, setWishlistIds] = useState([]);
  const navigate = useNavigate();

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

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

  // Filter toys by category & reset pagination page
  useEffect(() => {
    const filtered = id ? data.filter((toy) => toy.categoryId == id) : data;
    setCategoryToys(filtered);
    setCurrentPage(1); // reset to page 1 on category change
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

  // Pagination calculation
  const totalPages = Math.ceil(categoryToys.length / itemsPerPage);
  const paginatedToys = categoryToys.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const chunkSize = 5;
  const currentChunk = Math.floor((currentPage - 1) / chunkSize);
  const startPage = currentChunk * chunkSize + 1;
  const endPage = Math.min(totalPages, startPage + chunkSize - 1);

  const handlePageChange = (pageNum) => {
    setCurrentPage(pageNum);
    // Smooth scroll to catalog top
    const element = document.getElementById("catalog-start");
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handlePrevChunk = () => {
    handlePageChange(startPage - 1);
  };

  const handleNextChunk = () => {
    handlePageChange(endPage + 1);
  };

  return (
    <div className="w-11/12 mx-auto my-10" id="catalog-start">
      <Helmet>
        <title>{id ? "Category Toys | ToyTopia" : "All Toys | ToyTopia"}</title>
      </Helmet>

      <div className="flex flex-col items-center text-center mb-8">
        <span className="text-xs font-bold text-toy-primary bg-toy-primary-light px-3 py-1 rounded-full uppercase tracking-wider mb-2">
          {id ? "Trending Category" : "Full Catalog"}
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-800">
          {id ? "Best Selling " : "Popular "}
          <span className="text-toy-secondary">
            {id ? "Products" : "Toys"}
          </span>
        </h2>
        <p className="text-sm text-gray-500 mt-2 max-w-md">
          Total <span className="font-bold text-toy-teal">{categoryToys.length}</span> fun items found in this section
        </p>
      </div>

      {categoryToys.length === 0 ? (
        <div className="my-8">
          <EmptyState
            icon={FaExclamationCircle}
            title="No toys in this sandbox!"
            description="We couldn't find any toys matching this category right now. Try exploring other categories or check back later!"
            actionButton={
              <button
                onClick={() => navigate("/categories")}
                className="bg-toy-primary hover:bg-toy-primary/95 text-white font-extrabold text-sm px-8 py-3.5 rounded-2xl shadow-md shadow-toy-primary/20 hover:shadow-lg hover:-translate-y-1 active:scale-95 transition-all cursor-pointer"
              >
                Show All Toys
              </button>
            }
          />
        </div>
      ) : (
        <>
          <motion.div 
            layout
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 justify-items-center"
          >
            <AnimatePresence mode="popLayout">
              {paginatedToys.map((toy) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  key={toy.toyId}
                  className="relative w-full max-w-sm bg-white border border-slate-100 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 p-5 group flex flex-col justify-between"
                >
                  <div>
                    {/* Wishlist Heart */}
                    <button
                      onClick={() => toggleWishlist(toy)}
                      className="absolute top-4 right-4 z-10 bg-white/95 p-2 rounded-full shadow-md hover:scale-110 active:scale-95 transition-all text-gray-400 hover:text-toy-accent cursor-pointer"
                    >
                      {wishlistIds.includes(toy.toyId) ? (
                        <FaHeart className="text-toy-accent" size={18} />
                      ) : (
                        <FaRegHeart size={18} />
                      )}
                    </button>

                    {/* Image Container with Zoom */}
                    <div className="rounded-2xl overflow-hidden w-full h-52 mb-4 bg-slate-50">
                      <img
                        src={toy.pictureURL}
                        alt={toy.toyName}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>

                    <span className="text-xs font-semibold px-2.5 py-1 bg-slate-100 rounded-lg text-slate-600 inline-block mb-2">
                      {toy.subCategory}
                    </span>

                    <h3 className="text-lg font-bold text-gray-800 line-clamp-1 mb-1">
                      {toy.toyName}
                    </h3>

                    <div className="flex justify-between items-center mb-4">
                      <p className="text-toy-teal font-extrabold text-xl">${toy.price}</p>
                      <span className="text-sm text-toy-yellow font-bold flex items-center gap-1">
                        ⭐ {toy.rating}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => navigate(`/toys-details/${toy.toyId}`)}
                    className="w-full text-center text-white bg-toy-primary hover:bg-toy-primary/90 active:scale-95 transition-all py-3 rounded-2xl font-bold shadow-md shadow-toy-primary/10 hover:shadow-lg hover:shadow-toy-primary/20 text-sm cursor-pointer"
                  >
                    View Details
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-12 flex-wrap">
              <button
                disabled={currentPage === 1}
                onClick={() => handlePageChange(currentPage - 1)}
                className="px-4 py-2 bg-white rounded-xl border border-slate-200 text-gray-700 hover:bg-toy-primary-light hover:text-toy-primary disabled:opacity-40 transition-all font-semibold active:scale-95 cursor-pointer disabled:cursor-not-allowed text-xs animate-fade-in"
              >
                Prev
              </button>

              {startPage > 1 && (
                <button
                  onClick={handlePrevChunk}
                  className="px-4 py-2 bg-white rounded-xl border border-slate-200 text-gray-500 hover:bg-toy-primary-light hover:text-toy-primary transition-all font-semibold active:scale-95 cursor-pointer text-xs"
                >
                  Prev 5
                </button>
              )}

              <div className="flex gap-1.5">
                {Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i).map((pageNum) => (
                  <button
                    key={pageNum}
                    onClick={() => handlePageChange(pageNum)}
                    className={`w-10 h-10 rounded-xl font-bold text-sm transition-all active:scale-95 border cursor-pointer ${
                      currentPage === pageNum
                        ? "bg-toy-primary text-white border-toy-primary shadow-md shadow-toy-primary/20"
                        : "bg-white text-gray-600 border-slate-200 hover:bg-toy-primary-light hover:text-toy-primary"
                    }`}
                  >
                    {pageNum}
                  </button>
                ))}
              </div>

              {endPage < totalPages && (
                <button
                  onClick={handleNextChunk}
                  className="px-4 py-2 bg-white rounded-xl border border-slate-200 text-gray-500 hover:bg-toy-primary-light hover:text-toy-primary transition-all font-semibold active:scale-95 cursor-pointer text-xs"
                >
                  Next 5
                </button>
              )}

              <button
                disabled={currentPage === totalPages}
                onClick={() => handlePageChange(currentPage + 1)}
                className="px-4 py-2 bg-white rounded-xl border border-slate-200 text-gray-700 hover:bg-toy-primary-light hover:text-toy-primary disabled:opacity-40 transition-all font-semibold active:scale-95 cursor-pointer disabled:cursor-not-allowed text-sm animate-fade-in"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default CategoriesToys;

