"use client"
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import ProjectItem from './project-item';
export default function HomeTopProjects({ topProject }) {
  return <>

    <Swiper
      slidesPerView={'auto'}
      spaceBetween={16}
      // modules={[Navigation]}
      breakpoints={{
        768: {
          cssMode: true
        }
      }}
      className='lg:*:grid! sm:*:grid! lg:*:grid-cols-3 sm:*:grid-cols-2 lg:*:gap-8 sm:*:gap-6 *:py-4 overflow-visible! *:overflow-visible!'
    >
      {topProject.map(pItem => <SwiperSlide key={pItem.propId} tag='figure' className='border border-primary/20 rounded-lg transform! relative transition hover:shadow-2xl hover:scale-105 w-[98%]! sm:w-full!'>
        <ProjectItem projectObject={pItem} />
      </SwiperSlide>)}
    </Swiper>
  </>
}