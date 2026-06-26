import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { db } from "../firebase/firebase.config";
import {
  collection,
  query,
  where,
  onSnapshot,
  deleteDoc,
  doc,
} from "firebase/firestore";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Loading from "./Loading";
import { FaTrashAlt, FaRegHeart } from "react-icons/fa";
import EmptyState from "../components/EmptyState";

const Wishlist = () => {
  const { user } = useContext(AuthContext);
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }
    setLoading(true);

    let unsubscribe;
    try {
      const q = query(
        collection(db, "wishlist"),
        where("userEmail", "==", user?.email || "")
      );

      unsubscribe = onSnapshot(
        q,
        (snapshot) => {
          const items = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
          setWishlist(items);
          setLoading(false);
        },
        (error) => {
          console.error("Wishlist onSnapshot error:", error);
          setLoading(false);
          toast.error("Failed to load wishlist items.");
        }
      );

    } catch (err) {
      console.error("Query setup error:", err);
      setLoading(false);
    }

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [user]);

  const removeFromWishlist = async (id) => {
    await deleteDoc(doc(db, "wishlist", id));
    toast.success("Removed from wishlist");
  };

  if (loading) {
    return (
      <div className="bg-[#f8f9ff] min-h-screen flex flex-col justify-between">
        <Header />
        <Loading />
        <Footer />
      </div>
    );
  }

  if (wishlist.length === 0) {
    return (
      <div className="bg-[#f8f9ff] min-h-screen flex flex-col justify-between">
        <Header />
        <main className="max-w-xl mx-auto my-12 px-6 bg-white border border-slate-100 rounded-3xl shadow-sm w-full">
          <EmptyState
            icon={FaRegHeart}
            title="Your wishlist is empty!"
            description="Your sandbox is waiting! Browse through our curated catalog and heart your favorite toys to save them here."
            actionButton={
              <Link
                to="/categories"
                className="inline-block bg-toy-primary hover:bg-toy-primary/95 text-white font-extrabold px-8 py-3.5 rounded-2xl shadow-md shadow-toy-primary/20 hover:shadow-lg hover:-translate-y-1 active:scale-95 transition-all text-sm cursor-pointer"
              >
                Browse Catalog
              </Link>
            }
          />
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="bg-[#f8f9ff] min-h-screen flex flex-col justify-between">
      <Helmet>
        <title>My Wishlist | ToyTopia</title>
      </Helmet>
      <Header />
      <main className="max-w-6xl mx-auto my-12 px-6 w-full flex-grow">
        <div className="flex flex-col items-center sm:items-start mb-8 text-center sm:text-left">
          <span className="text-[10px] font-extrabold bg-toy-primary-light text-toy-primary px-3 py-1 rounded-full uppercase tracking-wider mb-2">
            My Account
          </span>
          <h1 className="text-3xl font-extrabold text-slate-800">
            My Saved <span className="text-toy-accent">Wishlist</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            You have <span className="font-bold text-toy-accent">{wishlist.length}</span> saved item{wishlist.length !== 1 ? "s" : ""}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 justify-items-center">
          {wishlist.map((toy) => (
            <div
              key={toy.id}
              className="relative w-full max-w-sm bg-white border border-slate-100 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 p-5 group flex flex-col justify-between"
            >
              <div>
                {/* Remove button */}
                <button
                  onClick={() => removeFromWishlist(toy.id)}
                  className="absolute top-4 right-4 z-10 bg-white/95 p-2 rounded-full shadow-md hover:scale-110 active:scale-95 transition-all text-gray-400 hover:text-toy-accent cursor-pointer border border-slate-100"
                  title="Remove from wishlist"
                >
                  <FaTrashAlt size={14} />
                </button>

                {/* Image */}
                <div className="rounded-2xl overflow-hidden w-full h-52 mb-4 bg-slate-50">
                  <img
                    src={toy.pictureURL}
                    alt={toy.toyName}
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                  />
                </div>

                <span className="text-xs font-semibold px-2.5 py-1 bg-slate-100 rounded-lg text-slate-600 inline-block mb-2">
                  {toy.subCategory}
                </span>

                <h3 className="text-base font-bold text-slate-800 line-clamp-1 mb-1">
                  {toy.toyName}
                </h3>

                <p className="text-toy-teal font-extrabold text-lg mb-4">${toy.price}</p>
              </div>

              <button
                onClick={() => navigate(`/toys-details/${toy.toyId}`)}
                className="w-full text-center text-white bg-toy-primary hover:bg-toy-primary/90 active:scale-95 transition-all py-3 rounded-2xl font-bold shadow-md shadow-toy-primary/10 hover:shadow-lg hover:shadow-toy-primary/20 text-xs cursor-pointer"
              >
                View Product Details
              </button>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Wishlist;

