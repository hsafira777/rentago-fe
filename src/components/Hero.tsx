"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="w-full">
      <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        spaceBetween={0}
        slidesPerView={1}
        loop
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        navigation
        pagination={{ clickable: true }}
        className="h-[80vh]"
      >
        {/* Slide 1 */}
        <SwiperSlide>
          <div className="relative w-full h-full">
            <Image
              src="/images/villa.jpg"
              alt="Private Villa"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/60" />
            <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-6 text-white">
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                Private Villa Getaway Exclusive
              </h1>
              <p className="mt-4 text-lg text-gray-200 max-w-2xl">
                Book exclusive private villas with personal service. Perfect for
                special occasions, family gatherings, or romantic escapes in
                tropical destinations.
              </p>
              <div className="mt-6 flex gap-4 flex-wrap justify-center">
                <Link
                  href="/explore"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium shadow-md transition"
                >
                  Find a Property
                </Link>
              </div>
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 2 */}
        <SwiperSlide>
          <div className="relative w-full h-full">
            <Image
              src="/images/promo.jpg"
              alt="Promo Spesial"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/50" />
            <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-6 text-white">
              <h2 className="text-4xl md:text-5xl font-bold">
                Promo Spesial Akhir Tahun
              </h2>
              <p className="mt-4 text-lg text-gray-200 max-w-2xl">
                Nikmati diskon hingga 40% untuk villa pilihan.
              </p>
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 3 */}
        <SwiperSlide>
          <div className="relative w-full h-full">
            <Image
              src="/images/booking.jpg"
              alt="Booking Mudah"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/50" />
            <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-6 text-white">
              <h2 className="text-4xl md:text-5xl font-bold">Booking Mudah</h2>
              <p className="mt-4 text-lg text-gray-200 max-w-2xl">
                Harga terjangkau, proses cepat, layanan terpercaya.
              </p>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </section>
  );
}
