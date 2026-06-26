import React from "react";

const ShortCard = ({ category }) => {
  const { name, img_url } = category;

  return (
    <div className="w-full">
      <div className="w-32 h-36 bg-white border border-slate-100 hover:border-toy-primary rounded-2xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between p-3 select-none group">
        <div className="w-full h-20 rounded-xl overflow-hidden bg-slate-50 flex items-center justify-center p-1.5">
          <img 
            src={img_url} 
            alt={name}
            className="w-full h-full object-contain group-hover:scale-108 transition-transform duration-300" 
          />
        </div>
        <div className="text-center">
          <h2 className="text-[11px] font-extrabold text-slate-700 group-hover:text-toy-primary transition-colors line-clamp-2 leading-snug">
            {name}
          </h2>
        </div>
      </div>
    </div>
  );
};

export default ShortCard;

