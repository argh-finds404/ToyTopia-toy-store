import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

const Slider = () => {
  return (
    <div className="w-11/12 max-w-7xl mx-auto mt-6 relative select-none">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={20}
        slidesPerView={1}
        breakpoints={{
          640: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 24,
          },
        }}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop={true}
        speed={800}
        className="w-full py-4 pb-12"
      >
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
          <SwiperSlide key={num}>
            <div className="w-full h-[420px] sm:h-[460px] md:h-[480px] lg:h-[500px] overflow-hidden rounded-3xl shadow-md border border-slate-100/80 bg-white group hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <img
                src={`/img${num}.jpg`}
                alt={`Banner Slide ${num}`}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Slider;



