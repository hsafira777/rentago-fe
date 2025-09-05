"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

export default function Hero() {
  return (
    <section className="w-full bg-gray-100">
      <Swiper spaceBetween={30} slidesPerView={1} loop autoplay>
        <SwiperSlide>
          <div className="h-[400px] flex items-center justify-center bg-blue-600 text-white text-3xl font-bold">
            Promo Spesial Akhir Tahun
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="h-[400px] flex items-center justify-center bg-green-500 text-white text-3xl font-bold">
            Nikmati Liburan di Villa Terbaik
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="h-[400px] flex items-center justify-center bg-purple-600 text-white text-3xl font-bold">
            Booking Mudah, Harga Terjangkau
          </div>
        </SwiperSlide>
      </Swiper>
    </section>
  );
}
