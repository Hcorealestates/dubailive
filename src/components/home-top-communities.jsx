"use client"
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { far } from '@awesome.me/kit-d4fc302733/icons';
import { library } from '@fortawesome/fontawesome-svg-core';
library.add(far);
import Link from 'next/link';
export default function HomeTopCommunities({ topCommunities }) {
  return <>
    <Swiper
      slidesPerView={'auto'}
      spaceBetween={16}
      breakpoints={{
        768: {
          cssMode: true
        }
      }}
      className='lg:*:grid! sm:*:grid! lg:*:grid-cols-3 sm:*:grid-cols-2 lg:*:gap-8 sm:*:gap-6 overflow-visible!'
    >
      {topCommunities.map(commItem => <SwiperSlide key={commItem.id} tag='figure' className='border border-primary/20 rounded-xl w-[98%]! sm:w-full! relative overflow-hidden group'>
        <Image src={commItem.listingimage} width={350} height={500} className='h-[470px] md:h-[550px] rounded-xl w-full object-cover object-center transform' title={commItem.name} alt={commItem.name} />
        <figcaption className='absolute bottom-0 left-0 bg-black/[.80] w-full h-full rounded-xl text-center text-white flex flex-col justify-between translate-y-[85%] group-hover:translate-y-0 transition-all duration-300'>
          <h4 className="pt-6 text-2xl text-white">{commItem.name}</h4>
          <div className="flex border-y border-y-white/[.30] divide-x divide-white/[.30] justify-between">
            {commItem.icons.map((icon, index) => <div key={index} className="grow py-4 text-sm text-gray-300">
              <FontAwesomeIcon className="text-3xl md:text-4xl" icon={`fa-regular ${icon.iconId}`} />
              <span className='block mt-2'>{icon.heading}</span>
            </div>)}
          </div>
          <div className="text-xl md:text-3xl">
            <span className='block text-sm text-gray-300'>Starting Size</span>
            {commItem.size} <span className=''>Sq. Ft.</span>
          </div>
          <div className="text-xl md:text-3xl">
            <span className='block text-sm text-gray-300'>Starting Price</span>
            <span className=''>AED</span> {commItem.price} <span className=''>M*</span>
          </div>
          <div className="flex justify-center mb-6">
            <Link href={commItem.url} className="bg-primary hover:bg-white border-2 border-primary focus:outline-hidden text-white hover:text-primary font-semibold h-12 px-6  flex items-center justify-center rounded-lg before:absolute before:inset-0 shadow-sm shadow-primary">Discover More</Link>
          </div>
        </figcaption>
      </SwiperSlide>)}
    </Swiper>
  </>
}