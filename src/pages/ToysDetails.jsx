import React, { useState } from "react";
import { useLoaderData, useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { IoMdArrowRoundBack } from "react-icons/io";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { FaRegCircleCheck, FaChildren } from "react-icons/fa6";
import { FaShippingFast, FaSearch } from "react-icons/fa";
import { Helmet } from "react-helmet-async";

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
    <>
      <Helmet>
        <title>{`${toy.subCategory} | ${toy.toyName} - ToyStore`}</title>
        <meta
          name="description"
          content={toy.description.slice(0, 120) + "..."}
        />
      </Helmet>

      <Header />
      <main className="max-w-6xl mx-auto my-16 px-4">
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
                <div className="flex items-center bg-yellow-50 text-yellow-700 px-3 py-2 rounded-xl shadow-inner font-semibold">
                  ⭐ {toy.rating}
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
                  <div className="flex items-center border rounded-lg overflow-hidden">
                    <button
                      onClick={decreaseQuantity}
                      className="px-3 py-2 bg-gray-200 hover:bg-gray-300"
                      disabled={quantity <= 1}
                    >
                      -
                    </button>
                    <span className="px-4 py-2">{quantity}</span>
                    <button
                      onClick={increaseQuantity}
                      className="px-3 py-2 bg-gray-200 hover:bg-gray-300"
                      disabled={availableQuantity <= 0}
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={handleAddToCart}
                    className="flex-1 bg-[#c9184a] hover:bg-red-500 text-white font-semibold py-3 rounded-2xl shadow-md transition-transform active:scale-95"
                    disabled={
                      quantity > availableQuantity + quantity - 1 ||
                      availableQuantity <= 0
                    }
                  >
                    ADD TO CART
                  </button>
                </div>

                {/* Info Boxes */}
                <div className="flex flex-col sm:flex-row gap-4 mt-4">
                  <div className="flex-1 border border-dashed rounded-2xl p-4 text-center">
                    <p className="flex flex-col items-center font-semibold mt-2 p-2">
                      <FaRegCircleCheck size={30} />
                      PREMIUM QUALITY
                    </p>
                  </div>
                  <div className="flex-1 border border-dashed rounded-2xl p-4 text-center">
                    <p className="flex flex-col items-center font-semibold mt-2 p-2">
                      <FaChildren size={30} />
                      AGE-APPROPRIATE DESIGN
                    </p>
                  </div>
                  <div className="flex-1 border border-dashed rounded-2xl p-4 text-center">
                    <p className="flex flex-col items-center font-semibold mt-2 p-2">
                      <FaShippingFast size={30} />
                      FREE <br /> SHIPPING
                    </p>
                  </div>
                </div>

                {/* Try Now Form */}
                <div className="mt-6 bg-gray-50 p-6 rounded-2xl shadow-inner">
                  <h2 className="text-xl font-semibold mb-4 text-gray-800 text-center">
                    Try Now
                  </h2>
                  <form
                    onSubmit={handleTryNowSubmit}
                    className="flex flex-col gap-4 max-w-md mx-auto"
                  >
                    <input
                      type="text"
                      placeholder="Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-[#1976d2]"
                      required
                    />
                    <input
                      type="email"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-[#1976d2]"
                      required
                    />
                    <button
                      type="submit"
                      className="bg-[#1976d2] text-white rounded-lg py-3 font-semibold hover:bg-[#1565c0] transition-colors"
                    >
                      Try Now
                    </button>
                  </form>
                </div>
              </div>

              {/* Description */}
              <div className="mt-6 bg-gray-50 p-6 rounded-2xl shadow-inner">
                <h2 className="text-lg font-semibold mb-2 text-gray-800">
                  Product Details
                </h2>
                <p className="text-gray-600">{toy.description}</p>
              </div>
            </div>

            <button
              onClick={() => navigate(-1)}
              className="w-full flex items-center justify-center gap-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-3 rounded-2xl shadow-md transition-transform active:scale-95 mt-4"
            >
              <IoMdArrowRoundBack size={20} />
              Back to this toys category
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default ToysDetails;
