import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaSearch, FaTruck, FaBoxOpen, FaCheckCircle, FaMapMarkedAlt, FaGamepad, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { toast } from "react-toastify";

const trackingSteps = [
  { status: 1, label: "Order Received", desc: "Our toy makers got your order!", icon: FaBoxOpen },
  { status: 2, label: "Packed with Love", desc: "Bubble wrapped with safety tags.", icon: FaCheckCircle },
  { status: 3, label: "On the Road", desc: "The toy delivery truck is driving!", icon: FaTruck },
  { status: 4, label: "At Your Doorstep", desc: "Ring ring! Playtime has arrived!", icon: FaMapMarkedAlt }
];

const LiveTrack = () => {
  const [trackCode, setTrackCode] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [activeTrack, setActiveTrack] = useState(null); // tracking data once submitted
  const [currentStatus, setCurrentStatus] = useState(1); // 1 to 4 status control

  const handleTrackSubmit = (e) => {
    e.preventDefault();
    if (!trackCode.trim()) return;

    setIsSearching(true);
    // Simulate lookup
    setTimeout(() => {
      setIsSearching(false);
      setActiveTrack({
        code: trackCode.toUpperCase(),
        estDelivery: "June 28, 2026",
        recipient: "Billy Smith",
        address: "123 Toy Lane, Block B, Dhaka",
        items: "Transformers Optimus Prime, UNO Card Game"
      });
      setCurrentStatus(1);
      toast.success("Order found! Showing tracker...");
    }, 1200);
  };

  // Simulating state updates interactively
  const advanceStatus = () => {
    if (currentStatus < 4) {
      const nextStatus = currentStatus + 1;
      setCurrentStatus(nextStatus);
      if (nextStatus === 4) {
        toast.success("The delivery truck has arrived! Open your door!");
      } else {
        toast.info(`Truck update: Moving to status "${trackingSteps[nextStatus - 1].label}"`);
      }
    }
  };

  const regressStatus = () => {
    if (currentStatus > 1) {
      setCurrentStatus(currentStatus - 1);
    }
  };

  // Calculate truck percentage offset along the timeline
  const getTruckPercentage = () => {
    // 1 -> 0%, 2 -> 33%, 3 -> 66%, 4 -> 100%
    return ((currentStatus - 1) / 3) * 100;
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <span className="text-xs font-bold text-toy-primary bg-toy-primary-light px-3 py-1 rounded-full uppercase tracking-wider mb-2 inline-block">
          Toy Express Tracker
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-800 mt-2">
          Track Your <span className="text-toy-secondary">Toy Journey</span>
        </h1>
        <p className="text-gray-500 mt-2 text-sm">
          Enter your tracking code to follow our colorful delivery truck driving down the road straight to your room.
        </p>
      </div>

      {/* Query Section */}
      <div className="bg-white border border-slate-100 p-6 rounded-3xl shadow-md max-w-xl mx-auto mb-10">
        <form onSubmit={handleTrackSubmit} className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-grow">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Enter code (e.g. TT-9876)"
              value={trackCode}
              onChange={(e) => setTrackCode(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-slate-50 focus:bg-white rounded-2xl outline-none text-sm border border-slate-100 focus:border-toy-primary transition-all text-gray-700 font-bold tracking-wide"
              required
            />
          </div>
          <button
            type="submit"
            disabled={isSearching}
            className="bg-toy-primary hover:bg-toy-primary/95 disabled:bg-slate-300 text-white font-bold text-sm px-6 py-3 rounded-2xl shadow-md active:scale-95 transition-all cursor-pointer whitespace-nowrap"
          >
            {isSearching ? "Searching..." : "Locate My Toys!"}
          </button>
        </form>
        <p className="text-[10px] text-gray-400 mt-2.5 text-center">
          *Tip: You can use any code, such as <span className="font-bold text-toy-primary">TT-9876</span>, to test the simulator!
        </p>
      </div>

      {/* Simulator Interface */}
      <AnimatePresence mode="wait">
        {activeTrack && (
          <motion.div
            key={activeTrack.code}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="space-y-10"
          >
            {/* Meta Order details */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-white border border-slate-100 p-6 rounded-3xl shadow-sm text-sm">
              <div>
                <h4 className="font-semibold text-gray-400 text-xs uppercase">Tracking ID</h4>
                <p className="text-gray-800 font-extrabold text-base mt-1">{activeTrack.code}</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-400 text-xs uppercase">Toy Recipient</h4>
                <p className="text-gray-800 font-bold text-base mt-1">{activeTrack.recipient}</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-400 text-xs uppercase">Est. Arrival</h4>
                <p className="text-toy-teal font-extrabold text-base mt-1">{activeTrack.estDelivery}</p>
              </div>
            </div>

            {/* Interactive Timeline & Dotted Road */}
            <div className="bg-slate-50 border border-slate-100 rounded-3xl p-8 sm:p-12 relative overflow-hidden">
              <h3 className="text-lg font-extrabold text-gray-800 text-center mb-16 flex items-center justify-center gap-1.5">
                <FaGamepad className="text-toy-primary animate-spin" /> Sandbox Delivery Track
              </h3>

              {/* Road Lane Container */}
              <div className="relative h-4 mb-20">
                {/* Dotted Center Roadline */}
                <div className="absolute top-1/2 left-0 right-0 h-1 border-t-4 border-dashed border-slate-300 -translate-y-1/2"></div>
                {/* Solid Colored Track Progress */}
                <motion.div
                  className="absolute top-1/2 left-0 h-1 bg-toy-primary -translate-y-1/2 origin-left"
                  animate={{ width: `${getTruckPercentage()}%` }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                ></motion.div>

                {/* Animated Truck Graphic */}
                <motion.div
                  className="absolute -top-6 -translate-x-1/2 z-10 w-16 h-12 flex flex-col items-center justify-center cursor-pointer select-none"
                  animate={{ left: `${getTruckPercentage()}%` }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                >
                  <div className="bg-toy-primary text-white p-2 rounded-xl shadow-lg relative flex items-center justify-center hover:scale-110 active:scale-95 transition-transform">
                    <FaTruck size={20} className="animate-pulse" />
                    {/* Small exhaust bubble */}
                    <span className="absolute -left-1.5 bottom-1 text-[8px] animate-ping opacity-60">💨</span>
                  </div>
                  <span className="text-[9px] font-bold text-toy-primary bg-toy-primary-light px-1.5 py-0.5 rounded shadow-sm border border-white mt-1 uppercase whitespace-nowrap">
                    TT-Delivery
                  </span>
                </motion.div>

                {/* Step Stop Nodes */}
                <div className="absolute inset-0 flex justify-between items-center">
                  {trackingSteps.map((step) => {
                    const StepIcon = step.icon;
                    const isCompleted = currentStatus >= step.status;
                    const isActive = currentStatus === step.status;

                    return (
                      <div key={step.status} className="relative flex flex-col items-center">
                        {/* Stop circle */}
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all duration-500 z-10 ${
                            isCompleted
                              ? "bg-toy-primary border-toy-primary text-white scale-110"
                              : "bg-white border-slate-200 text-gray-400"
                          } ${isActive ? "ring-4 ring-toy-primary/20" : ""}`}
                        >
                          <StepIcon size={12} />
                        </div>

                        {/* Label */}
                        <div className="absolute top-10 text-center w-28 flex flex-col items-center">
                          <span
                            className={`text-xs font-bold whitespace-nowrap transition-colors duration-500 ${
                              isCompleted ? "text-gray-800" : "text-gray-400"
                            }`}
                          >
                            {step.label}
                          </span>
                          <span className="text-[9px] text-gray-400 leading-tight mt-0.5 hidden sm:inline-block max-w-[100px]">
                            {step.desc}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Status Simulation Controls */}
              <div className="flex flex-col sm:flex-row gap-4 items-center justify-between pt-12 border-t border-slate-200 text-sm">
                <span className="text-gray-500 font-bold flex items-center gap-1.5">
                  <FaGamepad className="text-toy-primary animate-pulse text-base" /> <span className="text-gray-700">Sandbox Controls:</span> Try shifting gears to test status updates!
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={regressStatus}
                    disabled={currentStatus === 1}
                    className="bg-white hover:bg-slate-100 disabled:opacity-40 border border-slate-200 text-gray-700 text-xs font-bold px-4 py-2 rounded-xl transition-all active:scale-95 cursor-pointer disabled:cursor-not-allowed"
                  >
                    <FaArrowLeft className="inline-block mr-1 text-[10px]" /> Move Truck Back
                  </button>
                  <button
                    onClick={advanceStatus}
                    disabled={currentStatus === 4}
                    className="bg-toy-secondary hover:bg-toy-secondary/95 disabled:opacity-40 text-white text-xs font-bold px-4 py-2 rounded-xl transition-all active:scale-95 cursor-pointer disabled:cursor-not-allowed shadow-md shadow-toy-secondary/15"
                  >
                    Move Truck Forward <FaArrowRight className="inline-block ml-1 text-[10px]" />
                  </button>
                </div>
              </div>
            </div>

            {/* Delivery address card */}
            <div className="bg-white border border-slate-100 p-6 rounded-3xl shadow-sm text-sm grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold text-gray-400 text-xs">Destination Address</h4>
                <p className="text-gray-700 font-bold mt-1">{activeTrack.address}</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-400 text-xs">Packages Inside</h4>
                <p className="text-gray-700 font-medium mt-1">{activeTrack.items}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LiveTrack;
