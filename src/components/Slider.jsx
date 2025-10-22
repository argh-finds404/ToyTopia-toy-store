import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

const Slider = () => {
  return (
    <div className="w-full max-w-6xl mx-auto mt-10 relative px-4">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={20}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
        loop={true}
        speed={800}
        breakpoints={{
          640: { slidesPerView: 1, spaceBetween: 25 }, // small mobiles
          768: { slidesPerView: 1, spaceBetween: 30 }, // tablets
          1024: { slidesPerView: 3, spaceBetween: 30 }, // desktop
        }}
      >
        {[1, 2, 3, 4, 5, 6, 7].map((num) => (
          <SwiperSlide key={num}>
            <div className="w-full h-[28rem] sm:h-96 md:h-[28rem] lg:h-[32rem] overflow-hidden rounded-xl shadow-lg">
              <img
                src={`/img${num}.jpg`}
                alt={`Slide ${num}`}
                className="w-full h-full object-cover"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Slider;
