"use client"
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import PostItem from './post-item';
export default function PostSlides({ postItemSlide }) {
   return <>
      <Swiper
         slidesPerView={1}
         spaceBetween={24}
         modules={[Navigation]}
         navigation={{ clickable: true }}
         className=' overflow-visible!'
         breakpoints={{
         640: {
            slidesPerView: 2,
         },
         992: {
            spaceBetween: 32,
            slidesPerView: 3
         }
         }}
      >
      {postItemSlide.map(item => <SwiperSlide key={item.id} tag="figure" className="">
         <PostItem postItem={item} />
      </SwiperSlide>)}
      </Swiper>
   </>
}