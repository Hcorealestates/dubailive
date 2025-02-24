"use client"
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import Link from 'next/link';
import 'swiper/css';
import 'swiper/css/navigation';
import DeveloperLogo from './developer-logo';
export default function DeveloperSlides({ developerObj }) {
  return <Swiper
    slidesPerView={'auto'}
    spaceBetween={16}
    modules={[Navigation]}
    navigation={{ clickable: true }}
    breakpoints={{
      768: {
        slidesPerView: 3,
      },
      1025: {
        slidesPerView: 5,
        spaceBetween: 24
      },
    }}
    className=''
  >
    {developerObj.map(developer => <SwiperSlide key={developer.id} tag='figure' className='border border-primary/[0.3] hover:shadow-xs hover:border-primary/[.6] rounded-lg text-center bg-white '>
      <Link href={developer.url} className='p-3 block' title={developer.name}>
        <DeveloperLogo className='mx-auto h-12 w-auto' developerLogo={developer} />
      </Link>
      <figcaption className='sr-only'>{developer.name} </figcaption>
    </SwiperSlide>)}
  </Swiper>
}