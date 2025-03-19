
"use client"
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleChevronRight } from '@fortawesome/pro-light-svg-icons';
import { faFacebook, faInstagram, faLinkedin, faWhatsapp, faXTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons';
import Modal from './Modal';
import WhatsappLink from './whatsapp-link';
import { usePathname } from 'next/navigation';
import { faLocationDot, faCirclePhone, faEnvelopeDot, faChevronUp } from '@fortawesome/pro-solid-svg-icons';
import { faClockEight, faEnvelope, faPhone } from '@fortawesome/pro-regular-svg-icons';
import { animateScroll as scroll } from 'react-scroll';

export default function Footer({ footerProject = false, footerComm = false, pageData = false, staticInfo = false, whatsappMessage = 'Dubai Housing', prop = false }) {
  const [showAction, setShowAction] = useState(false);
  const [scrollCustom, setScrollCustom] = useState(false);
  const pathname = usePathname();
  const isProjectDirectory = pathname.startsWith('/project/');
  const year = new Date().getFullYear();

  const scrollToTop = () => {
    scroll.scrollToTop({
      duration: 200,
      delay: 0,
      smooth: 'linear',
    });
  };



  useEffect(() => {
    function scrollHandler() {
      if (window.scrollY > 100) {
        setShowAction(true)
      } else {
        setShowAction(false)
      }
    };

    function scrollToTopHandler() {
      if (window.scrollY > 600) {
        setScrollCustom(true)
      } else {
        setScrollCustom(false)
      }
    }

    window.addEventListener('scroll', scrollToTopHandler);
    window.addEventListener('scroll', scrollHandler);
    return () => {
      window.removeEventListener('scroll', scrollHandler);
      window.removeEventListener('scroll', scrollToTopHandler);
    }
  }, [])

  return <>
    <footer className="bg-primary-950 pt-12">
      {/* <div className="fixed z-50 bg-white/[.5] p-2 bottom-20 left-0 text-xs">
        <div>W: {wSize.width} </div>
        <div>H: {wSize.height}</div>
        </div> */}

      {/* Property For Sale */}
      <div className="wrapper pb-10 lg:pb-0">
        <div className="text-2xl font-serif pb-4 text-primary-100">Property For Sale</div>
        <Swiper
          slidesPerView={1}
          spaceBetween={24}
          modules={[Navigation]}
          navigation={{
            clickable: true,
          }}
          breakpoints={{
            1025: {
              slidesPerView: 5,
            },
            768: {
              slidesPerView: 3,
            },
            640: {
              slidesPerView: 2,
            }
          }}
          className="foo-swiper"
        >
          {footerProject.map((subArray, subIndex) => <SwiperSlide key={subIndex} className='text-white  space-y-2'>
            {subArray.length > 0 && subArray.map((project) => (<Link key={project.id} href={project.url} className='block text-sm hover:underline'>{project.name}</Link>))}
          </SwiperSlide>
          )}
        </Swiper>
        <div className="flex justify-end -mt-6 mb-8 pb-7 border-b border-primary-300/[0.2]">
          <Link href="" className="flex items-center gap-2 border border-primary-700 px-2 py-1 rounded-lg  text-white hover:bg-primary relative z-10">View More <FontAwesomeIcon icon={faCircleChevronRight} /></Link>
        </div>

        {/* Top Community Searches */}
        <div className="text-2xl font-serif pb-4 text-primary-100">Top Community Searches</div>
        <Swiper
          slidesPerView={1}
          spaceBetween={24}
          modules={[Navigation]}
          navigation={{
            clickable: true,
          }}
          breakpoints={{
            1025: {
              slidesPerView: 5,
            },
            768: {
              slidesPerView: 3,
            },
            640: {
              slidesPerView: 2,
            }
          }}
          className="foo-swiper"
        >
          {footerComm.map((subArray, subIndex) => <SwiperSlide key={subIndex} className='text-white  space-y-2'>
            {subArray.length > 0 && subArray.map((community) => <Link key={community.id} href={community.url} className='block text-sm hover:underline'>{community.name}</Link>)}
          </SwiperSlide>)}
        </Swiper>
      </div>

      {/* Common Links */}
      <div className="bg-white py-10">
        <div className="wrapper flex flex-col md:flex-row md:gap-6">
          <div className="flex flex-col space-y-1.5 *:text-primary md:w-3/12">
            <Link href={pageData.homeurl} className='hover:underline'>Dubai Housing</Link>
            <Link className='hover:underline' href={pageData.abouturl}>About Us</Link>
            <Link className='hover:underline' href={pageData.contacturl}>Contact Us</Link>
            <Link className='hover:underline' href={pageData.disclaimerurl}>Disclaimer</Link>
            <Link className='hover:underline' href={pageData.ppolicyurl}>Privacy Policy</Link>
          </div>
          <div className="flex flex-col grow md:pl-6 md:border-l border-y md:border-y-0 py-4 md:py-0 my-4 md:my-0">
            <div className="text-2xl h2">Visit & Contact Us</div>
            <ul className="space-y-1">
              <li className='py-3'><strong>Dubai Housing</strong></li>
              {staticInfo.address && <li className="flex gap-3 items-center"><FontAwesomeIcon icon={faLocationDot} /><span>{staticInfo.address}</span></li>}
              {staticInfo.callnumberstatic && <li className='relative flex gap-3 items-center'><FontAwesomeIcon icon={faCirclePhone} /><a href={`tel:+${staticInfo.callnumberstatic.split(' ').join('')}`} className='link hover:underline before:absolute before:inset-0'> {`+${staticInfo.callnumberstatic}`}</a></li>}
              {staticInfo.email && <li className='relative flex gap-3 items-center'><FontAwesomeIcon icon={faEnvelopeDot} /><a href={`mailto:${staticInfo.email}`} className='link hover:underline before:absolute before:inset-0'>{staticInfo.email}</a></li>}
            </ul>
          </div>

          {/* Follow Us */}
          <div className="flex flex-col grow md:pl-6 md:border-l">
            <div className="text-2xl h2">Follow Us</div>
            <div className="flex gap-3 my-3 text-3xl">
              <Link href={staticInfo.facebook_link} className="hover:scale-125 transition-transform text-facebook"><FontAwesomeIcon icon={faFacebook} /> <span className='sr-only'>Follow us on Facebook</span></Link>
              <Link href={staticInfo.linked_link} className="hover:scale-125 transition-transform text-linkedin"><FontAwesomeIcon icon={faLinkedin} /><span className='sr-only'>Follow us on Linkedin</span></Link>

              <Link href={staticInfo.twitter} className="hover:scale-125 transition-transform text-black"><FontAwesomeIcon icon={faXTwitter} /><span className='sr-only'>Follow us on Twitter</span></Link>

              <Link href={staticInfo.youtube} className="hover:scale-125 transition-transform text-red-600"><FontAwesomeIcon icon={faYoutube} /><span className='sr-only'>Follow us on Youtube</span></Link>

              <Link href={staticInfo.insta} className="hover:scale-125 transition-transform text-instagram"><FontAwesomeIcon icon={faInstagram} /><span className='sr-only'>Follow us on Instagram</span></Link>
            </div>
          </div>
        </div>
      </div>
      <div className="p-4 max-lg:pb-20 text-center text-gray-300 text-sm">
        Copyright &copy; Dubai Housing 2021 - {year} | All Right Reserved
      </div>
    </footer>

    {/* Desktop Form */}
    <Modal className="hidden lg:block rounded-none fixed -right-11 z-20 -translate-y-2/4 top-2/4 -rotate-90" projectName={whatsappMessage}>Enquire Now</Modal>

    {/* Whatsapp Desktop */}
    <WhatsappLink className="hidden fixed left-6 bottom-8 bg-whatsapp h-14 w-14 rounded-full lg:flex justify-center items-center transition-transform hover:scale-110 z-20" phoneNumber={pageData.whatsnumber} message={whatsappMessage}>
      <FontAwesomeIcon className="text-4xl text-white" icon={faWhatsapp} />
    </WhatsappLink>

    {/* Footer Call to Action */}
    {showAction && <div className="bg-primary-50 fixed bottom-0 z-10 flex lg:hidden w-full md:gap-4 h-16  divide-x divide-primary/20 inset-shadow-sm inset-shadow-primary/10">
      {/* Project Price */}
      {isProjectDirectory &&
        (prop.proprice !== 'On Request' && <div className='grow self-center pl-4'>
          <span className="block text-[11px] text-gray-500">Price (AED)</span>
          <span className="text-2xl font-semibold">{prop.proprice} </span>M<sup>&#42;</sup></div>)}

      <WhatsappLink className="grow text-center text-whatsapp self-center" phoneNumber={pageData.whatsnumber} message={whatsappMessage}>
        <FontAwesomeIcon className="text-2xl" icon={faWhatsapp} />
        <small className='block'>Whatsapp</small>
      </WhatsappLink>
      {staticInfo.callnumberstatic && <a href={`tel:+${staticInfo.callnumberstatic.split(' ').join('')}`} className='grow text-center text-phone self-center'><FontAwesomeIcon className="text-[20px]" icon={faPhone} /> <small className='block'>Call Us</small>
      </a>}

      <Modal className='grow bg-transparent hover:bg-transparent text-phone py-0 rounded-none px-0' projectName={whatsappMessage} ><FontAwesomeIcon className='text-2xl' icon={faEnvelope} />
        <small className='block'>Enquiry</small>
      </Modal>
    </div>}
    {scrollCustom && <a onClick={scrollToTop} className='fixed right-4 bottom-18 flex justify-center items-center bg-primary-600 hover:bg-primary-700 z-20 w-10 h-10 rounded-full cursor-pointer'><FontAwesomeIcon className='text-2xl text-white' icon={faChevronUp} /> <span className=' sr-only'>To the top!</span></a>}
  </>
}

/* function CommonQuickAction({ }) {
  return <>
    <WhatsappLink className="" phoneNumber={pageData.whatsnumber} message={whatsappMessage}>
      <FontAwesomeIcon className="text-4xl text-white" icon={faWhatsapp} />
    </WhatsappLink>
  </>
} */