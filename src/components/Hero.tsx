"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="w-full bg-gray-100">
      <Swiper spaceBetween={30} slidesPerView={1} loop autoplay>
        <SwiperSlide>
          <div className="h-[400px] w-full relative">
            <Image
              src="/images/promo.jpg"
              alt="Promo Spesial Akhir Tahun"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/40 text-white text-3xl font-bold">
              Promo Spesial Akhir Tahun
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="h-[400px] w-full relative">
            <Image
              src="/images/villa.jpg"
              alt="Nikmati Liburan di Villa Terbaik"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/40 text-white text-3xl font-bold">
              Nikmati Liburan di Villa Terbaik
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="h-[400px] w-full relative">
            <Image
              src="/images/booking.jpg"
              alt="Booking Mudah, Harga Terjangkau"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/40 text-white text-3xl font-bold">
              Booking Mudah, Harga Terjangkau
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </section>
  );
}
