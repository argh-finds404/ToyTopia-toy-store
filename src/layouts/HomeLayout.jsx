import React, { useEffect, useState } from "react";
import { Outlet, useNavigation, useLocation } from "react-router-dom";
import Header from "../components/Header";
import Slider from "../components/Slider";
import ShopInfo from "../components/ShopInfo";
import Topside from "../components/homelayout/Topside";
import Footer from "../components/Footer";
import { Helmet } from "react-helmet-async";
import Loading from "../pages/Loading";
import { motion, AnimatePresence } from "framer-motion";

const HomeLayout = () => {
  const navigation = useNavigation();
  const location = useLocation();
  const [pageTitle, setPageTitle] = useState("ToyTopia - A Kids Toy Shop");

  useEffect(() => {
    // Map paths to descriptive titles
    const path = location.pathname;
    if (path === "/" || path.startsWith("/categories")) {
      setPageTitle("ToyTopia - Explore Fun Toys!");
    } else if (path === "/aboutus") {
      setPageTitle("About Us | ToyTopia");
    } else if (path === "/blog") {
      setPageTitle("Parenting & Toy Blog | ToyTopia");
    } else if (path === "/contact") {
      setPageTitle("Contact Us | ToyTopia");
    } else if (path === "/livetrack") {
      setPageTitle("Track Your Toy Delivery | ToyTopia");
    } else {
      setPageTitle("ToyTopia");
    }
  }, [location]);

  const isHome = location.pathname === "/" || location.pathname.startsWith("/categories");

  return (
    <div className="bg-[#f8f9ff] min-h-screen flex flex-col justify-between relative overflow-hidden">
      {/* Background Decorative Blobs */}
      <div className="absolute top-24 left-[-100px] w-96 h-96 rounded-full bg-toy-primary/10 blur-3xl pointer-events-none animate-float-slow z-0"></div>
      <div className="absolute top-[400px] right-[-100px] w-96 h-96 rounded-full bg-toy-secondary/10 blur-3xl pointer-events-none animate-float-reverse z-0"></div>
      <div className="absolute bottom-24 left-1/3 w-80 h-80 rounded-full bg-toy-yellow/5 blur-3xl pointer-events-none animate-float-slow z-0"></div>

      <Helmet>
        <title>{pageTitle}</title>
      </Helmet>

      <header className="w-full relative z-10">
        <Header />
      </header>

      <main className="w-full flex-grow relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            {isHome && (
              <>
                <Slider />
                <ShopInfo />
                <div className="w-11/12 max-w-7xl mx-auto my-8">
                  <Topside />
                </div>
              </>
            )}

            <div className="w-11/12 max-w-7xl mx-auto my-8">
              {navigation.state === "loading" ? (
                <div className="flex justify-center items-center py-20">
                  <Loading />
                </div>
              ) : (
                <Outlet />
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </main>

      <div className="relative z-10">
        <Footer />
      </div>
    </div>
  );
};

export default HomeLayout;


