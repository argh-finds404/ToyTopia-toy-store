import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTruck,
  faBox,
  faHeadset,
  faCreditCard,
} from "@fortawesome/free-solid-svg-icons";

const ShopInfo = () => {
  const infos = [
    {
      icon: faTruck,
      title: "Express Delivery",
      subtitle: "Inside Dhaka in 24h",
      color: "text-toy-primary"
    },
    {
      icon: faBox,
      title: "Free Return",
      subtitle: "For 365 Days",
      color: "text-toy-secondary"
    },
    {
      icon: faHeadset,
      title: "24/7 Support",
      subtitle: "Always online",
      color: "text-toy-mint"
    },
    {
      icon: faCreditCard,
      title: "Secure Pay",
      subtitle: "100% Encrypted",
      color: "text-[#a55eea]"
    },
  ];

  return (
    <div className="w-11/12 max-w-7xl mx-auto px-4 mt-6">
      <div className="bg-white border border-slate-100 shadow-sm rounded-3xl py-4 px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 text-center gap-4 sm:gap-0">
          {infos.map((info, i) => (
            <div
              key={i}
              className={`flex flex-col items-center justify-center p-4 relative`}
            >
              <div className={`text-3xl ${info.color} mb-2`}>
                <FontAwesomeIcon icon={info.icon} />
              </div>
              <h3 className="font-extrabold text-sm sm:text-base text-gray-800">
                {info.title}
              </h3>
              <p className="text-gray-400 text-xs mt-0.5">{info.subtitle}</p>

              {/* ✅ Conditional Dividers */}
              {/* Desktop: vertical divider (right side) */}
              {i !== infos.length - 1 && (
                <div className="hidden md:block absolute right-0 top-1/2 transform -translate-y-1/2 w-[1px] h-12 bg-slate-100"></div>
              )}
              {/* Mobile: horizontal divider (bottom) */}
              {i !== infos.length - 1 && (
                <div className="block md:hidden absolute bottom-0 left-1/2 transform -translate-x-1/2 w-2/3 h-[1px] bg-slate-100"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShopInfo;

