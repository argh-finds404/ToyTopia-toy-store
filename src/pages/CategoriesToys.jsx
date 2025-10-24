import React, { useEffect, useState } from "react";
import { useLoaderData, useParams } from "react-router-dom";
import { Link } from "react-router";

const CategoriesToys = () => {
  const { id } = useParams();
  const data = useLoaderData();
  const [categoryToys, setCategoryToys] = useState([]);
  const [loading, setLoading] = useState(true); // 👈 Step 1: track loading state
  
  useEffect(() => {
    setLoading(true); // start loading
    setTimeout(() => {
      // 👈 simulate async loader (since loader already fetched)
      if (id) {
        const filtered = data.filter((toy) => toy.categoryId == id);
        setCategoryToys(filtered);
      } else {
        setCategoryToys(data);
      }
      setLoading(false); // end loading
    }, 500); // slight delay for smooth spinner (optional)
  }, [data, id]);

  // 👇 Step 2: show loader while waiting
  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <span className="loading loading-bars loading-xl text-[#370617]"></span>
      </div>
    );
  }

  //  Step 3: rest of your component
  return (
    <div className="w-11/12 mx-auto my-10">
      {id ? (
        <div className="flex flex-col items-center text-center mb-10">
          <p className="text-sm text-gray-500 font-semibold">Trending Now</p>
          <h2 className="text-4xl font-bold text-gray-700">
            <span className="text-[#fca311]">Best Selling </span>Products...
          </h2>
        </div>
      ) : (
        <div className="flex flex-col items-center text-center mb-10">
          <p className="text-sm text-gray-500 font-semibold">Let's Shop</p>
          <h2 className="text-4xl font-bold text-gray-700">
            <span className="text-[#fca311]">New </span>Arrivals...
          </h2>
        </div>
      )}

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

              <Link
                to={`/toys-details/${toy.toyId}`}
                className="absolute bottom-2 sm:bottom-5 left-1/2 -translate-x-1/2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition duration-300 text-white bg-[#4062bb] hover:bg-[#42a5f5] active:scale-95 px-4 py-2 rounded-lg font-semibold shadow-md"
              >
                Read More
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoriesToys;
