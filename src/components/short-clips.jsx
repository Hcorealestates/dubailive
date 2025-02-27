"use client";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

export default function ShortClips({ InstVides }) {
  return <>
    <Swiper
      slidesPerView={1}
      spaceBetween={16}
      modules={[Navigation]}
      navigation={{ clickable: true }}
      className='rounded-b-lg'
    >
      {InstVides.map(video => (
        <SwiperSlide key={video.id}>
          <video width="400" height="560" controls loop muted autoPlay className="w-screen">
            <source src={video.video} />
          </video>
        </SwiperSlide>
      ))}
    </Swiper>
  </>
}