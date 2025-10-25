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
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const Wishlist = () => {
  const { user } = useContext(AuthContext);
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    setLoading(true);
    const q = query(
      collection(db, "wishlist"),
      where("userEmail", "==", user.email)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const items = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setWishlist(items);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  const removeFromWishlist = async (id) => {
    await deleteDoc(doc(db, "wishlist", id));
    toast.success("Removed from wishlist");
  };

  if (loading) return <p className="text-center my-20">Loading wishlist...</p>;
  if (wishlist.length === 0)
    return <p className="text-center my-20">Your wishlist is empty!</p>;

  return (
    <>
      <Helmet>
        <title>My Wishlist</title>
      </Helmet>
      <Header />
      <main className="max-w-6xl mx-auto my-10 px-4">
        <h1 className="text-3xl font-bold mb-6">My Wishlist</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {wishlist.map((toy) => (
            <div
              key={toy.id}
              className="bg-white p-4 rounded-2xl shadow-md relative group"
            >
              <img
                src={toy.pictureURL}
                alt={toy.toyName}
                className="w-full h-56 object-cover rounded-xl mb-3"
              />
              <h3 className="text-lg font-semibold">{toy.toyName}</h3>
              <p className="text-gray-500">{toy.subCategory}</p>
              <p className="text-[#2a9d8f] font-semibold mt-2">${toy.price}</p>

              <Link
                to={`/toys-details/${toy.toyId}`}
                className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-3 py-2 rounded-lg shadow-md"
              >
                View
              </Link>

              <button
                onClick={() => removeFromWishlist(toy.id)}
                className="absolute top-3 right-3 bg-red-500 text-white px-2 py-1 rounded-full"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Wishlist;
