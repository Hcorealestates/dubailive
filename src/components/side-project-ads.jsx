"use client"
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Autoplay } from 'swiper/modules';

export default function SideProjectAds({ slideObj }) {
  return <>
    <Swiper
      slidesPerView={1}
      spaceBetween={16}
      autoplay={true}
      modules={[Autoplay]}
      loop={true}
    >
      {slideObj.map(slide => <SwiperSlide key={slide.id} tag="figure">
        <Link href={slide.url}>
          <Image src={slide.image} width={292} height={584} className=" w-screen" alt={slide.alt} title={slide.alt} />
        </Link>
      </SwiperSlide>)}
    </Swiper>
  </>
}