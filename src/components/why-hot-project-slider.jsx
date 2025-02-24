"use client"
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import ProjectItem from './project-item';
export default function WhyHotProjectSlider({ topProject }) {
   return <>
      <Swiper
         slidesPerView={'auto'}
         spaceBetween={16}
         modules={[Navigation]}
         navigation={{ clickable: true }}
         breakpoints={{
            640: {
               spaceBetween: 24,
               slidesPerView: 2,
            },
            992: {
               slidesPerView: 3
            }
         }}
         className='*:py-4'
      // className='lg:*:grid! sm:*:grid! lg:*:grid-cols-3 sm:*:grid-cols-2 lg:*:gap-8 sm:*:gap-6 *:py-4 overflow-visible! *:overflow-visible!'
      >
         {topProject.map(pItem => <SwiperSlide key={pItem.propId} tag='figure' className='border border-primary/20 rounded-lg transform! relative transition hover:shadow-xl'>
            <ProjectItem projectObject={pItem} />
         </SwiperSlide>)}
      </Swiper>
   </>
}