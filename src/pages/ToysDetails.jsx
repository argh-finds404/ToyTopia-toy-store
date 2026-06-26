import React, { useState } from "react";
import { useLoaderData, useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { IoMdArrowRoundBack } from "react-icons/io";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { FaRegCircleCheck, FaChildren } from "react-icons/fa6";
import { FaShippingFast, FaSearch, FaStar } from "react-icons/fa";
import { Helmet } from "react-helmet-async";
import ScrollToTop from "../components/ScrollToTop";

const ToysDetails = () => {
  const { id } = useParams();
  const data = useLoaderData();
  const toy = data.find((item) => item.toyId == id);
  const navigate = useNavigate();

  const [quantity, setQuantity] = useState(1);
  const [availableQuantity, setAvailableQuantity] = useState(
    toy?.availableQuantity || 0
  );

  // Try Now Form
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleTryNowSubmit = (e) => {
    e.preventDefault();
    if (!name || !email) {
      toast.error("Please fill in all fields");
      return;
    }
    toast.success("Try Now request submitted successfully!");
    setName("");
    setEmail("");
  };

  if (!toy) {
    return (
      <div className="bg-[#f8f9ff] min-h-screen flex flex-col justify-between">
        <Header />
        <main className="max-w-xl mx-auto my-20 px-6 text-center space-y-5 bg-white border border-slate-100 p-10 rounded-3xl shadow-sm flex flex-col items-center justify-center">
          <div className="text-6xl animate-bounce select-none text-toy-primary flex justify-center"><FaSearch /></div>
          <h2 className="text-2xl font-extrabold text-slate-800">Toy Not Found!</h2>
          <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
            Oops! The toy you are looking for has hidden in the toy box. It might have been sold out or moved.
          </p>
          <button
            onClick={() => navigate("/categories")}
            className="bg-toy-primary hover:bg-toy-primary/95 text-white font-extrabold px-6 py-3 rounded-2xl shadow-md active:scale-95 transition-all text-xs cursor-pointer"
          >
            Back to Catalog
          </button>
        </main>
        <Footer />
      </div>
    );
  }

  const increaseQuantity = () => {
    if (availableQuantity > 0) {
      setQuantity(quantity + 1);
      setAvailableQuantity(availableQuantity - 1);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
      setAvailableQuantity(availableQuantity + 1);
    }
  };

  const handleAddToCart = () => {
    toast.success(`Added ${quantity} item(s) to cart!`, {
      position: "top-center",
      autoClose: 2000,
    });
    setQuantity(1);
  };

  return (
    <div className="bg-[#f8f9ff] min-h-screen flex flex-col justify-between">
      <ScrollToTop />
      <Helmet>
        <title>{`${toy.subCategory} | ${toy.toyName} - ToyTopia`}</title>
        <meta
          name="description"
          content={toy.description.slice(0, 120) + "..."}
        />
      </Helmet>

      <Header />
      <main className="max-w-6xl mx-auto my-16 px-4 flex-grow w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          {/* Left: Image */}
          <div className="relative bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300">
            <img
              src={toy.pictureURL}
              alt={toy.toyName}
              className="w-full h-[450px] md:h-[550px] object-cover transition-transform duration-500 hover:scale-105"
            />
            <div className="absolute top-3 right-3 bg-white/80 px-3 py-1 rounded-full text-sm font-semibold shadow-md">
              {availableQuantity > 0 ? "In Stock" : "Out of Stock"}
            </div>
          </div>

          {/* Right: Info */}
          <div className="flex flex-col justify-between space-y-6">
            <div>
              <h1 className="text-4xl font-bold text-gray-800">
                {toy.toyName}
              </h1>
              <p className="text-gray-500 text-sm mt-1">{toy.subCategory}</p>

              {/* Price & Rating */}
              <div className="flex items-center mt-4 space-x-4">
                <div className="bg-green-50 text-green-700 font-bold px-4 py-2 rounded-xl shadow-inner">
                  ${toy.price}
                </div>
                <div className="flex items-center gap-1.5 bg-yellow-50 text-yellow-700 px-3 py-2 rounded-xl shadow-inner font-semibold">
                  <FaStar className="text-toy-yellow" /> {toy.rating}
                </div>
              </div>

              {/* Seller Info */}
              <div className="mt-5 space-y-1 text-gray-700">
                <p>
                  <span className="font-semibold">Seller:</span>{" "}
                  {toy.sellerName} ({toy.sellerEmail})
                </p>
                <p>
                  <span className="font-semibold">Available Quantity:</span>{" "}
                  <span className="text-[#c9184a] font-bold">
                    {availableQuantity}
                  </span>
                </p>
              </div>

              {/* Quantity Controls + Add to Cart */}
              <div className="mt-6 flex flex-col space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center border-2 border-toy-primary/20 rounded-2xl overflow-hidden bg-white shadow-sm">
                    <button
                      onClick={decreaseQuantity}
                      className="px-4 py-2 bg-slate-50 hover:bg-toy-primary hover:text-white transition-colors font-bold text-lg"
                      disabled={quantity <= 1}
                    >
                      -
                    </button>
                    <span className="px-6 py-2 font-bold text-slate-700">{quantity}</span>
                    <button
                      onClick={increaseQuantity}
                      className="px-4 py-2 bg-slate-50 hover:bg-toy-primary hover:text-white transition-colors font-bold text-lg"
                      disabled={availableQuantity <= 0}
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={handleAddToCart}
                    className="flex-1 bg-toy-secondary hover:bg-toy-secondary/90 text-white font-extrabold py-3.5 rounded-2xl shadow-md shadow-toy-secondary/20 hover:shadow-lg transition-all active:scale-95 uppercase tracking-wide"
                    disabled={
                      quantity > availableQuantity + quantity - 1 ||
                      availableQuantity <= 0
                    }
                  >
                    Add to Cart
                  </button>
                </div>

                {/* Info Boxes */}
                <div className="flex flex-col sm:flex-row gap-4 mt-8">
                  <div className="flex-1 border-2 border-dashed border-toy-mint/40 bg-toy-mint/5 rounded-2xl p-4 text-center hover:bg-toy-mint/10 transition-colors">
                    <p className="flex flex-col items-center font-bold text-sm text-slate-700 mt-2 p-2">
                      <FaRegCircleCheck className="text-toy-mint mb-2" size={28} />
                      PREMIUM QUALITY
                    </p>
                  </div>
                  <div className="flex-1 border-2 border-dashed border-toy-primary/40 bg-toy-primary/5 rounded-2xl p-4 text-center hover:bg-toy-primary/10 transition-colors">
                    <p className="flex flex-col items-center font-bold text-sm text-slate-700 mt-2 p-2">
                      <FaChildren className="text-toy-primary mb-2" size={28} />
                      AGE-APPROPRIATE
                    </p>
                  </div>
                  <div className="flex-1 border-2 border-dashed border-toy-yellow/40 bg-toy-yellow/5 rounded-2xl p-4 text-center hover:bg-toy-yellow/10 transition-colors">
                    <p className="flex flex-col items-center font-bold text-sm text-slate-700 mt-2 p-2">
                      <FaShippingFast className="text-toy-yellow mb-2" size={28} />
                      FREE SHIPPING
                    </p>
                  </div>
                </div>

                {/* Try Now Form */}
                <div className="mt-8 bg-white border border-slate-100 p-6 rounded-3xl shadow-sm">
                  <h2 className="text-lg font-bold mb-4 text-slate-800 text-center uppercase tracking-wide">
                    Try Now
                  </h2>
                  <form
                    onSubmit={handleTryNowSubmit}
                    className="flex flex-col gap-4 max-w-md mx-auto"
                  >
                    <input
                      type="text"
                      placeholder="Your Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="bg-slate-50 border border-slate-200 rounded-xl px-5 py-3.5 focus:outline-none focus:border-toy-primary focus:ring-2 focus:ring-toy-primary/20 transition-all font-medium text-slate-700 placeholder-slate-400"
                      required
                    />
                    <input
                      type="email"
                      placeholder="Your Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-slate-50 border border-slate-200 rounded-xl px-5 py-3.5 focus:outline-none focus:border-toy-primary focus:ring-2 focus:ring-toy-primary/20 transition-all font-medium text-slate-700 placeholder-slate-400"
                      required
                    />
                    <button
                      type="submit"
                      className="bg-toy-primary text-white rounded-xl py-3.5 font-extrabold hover:bg-toy-primary/95 transition-all shadow-md shadow-toy-primary/20 active:scale-95"
                    >
                      Request Trial
                    </button>
                  </form>
                </div>
              </div>

              {/* Description */}
              <div className="mt-6 bg-white border border-slate-100 p-6 rounded-3xl shadow-sm">
                <h2 className="text-lg font-bold mb-3 text-slate-800 uppercase tracking-wide">
                  Product Details
                </h2>
                <p className="text-slate-600 leading-relaxed font-medium text-sm">{toy.description}</p>
              </div>
            </div>

            <button
              onClick={() => navigate(-1)}
              className="w-full flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold py-3.5 rounded-2xl transition-all active:scale-95 mt-6 border border-slate-200"
            >
              <IoMdArrowRoundBack size={20} />
              Back to Catalog
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ToysDetails;
