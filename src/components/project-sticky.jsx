"use client"
import { faBedFront, faRulerCombined } from "@fortawesome/pro-light-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from 'react';
import CommonSearch from "./common-search";
import { faMagnifyingGlass, faPhone } from "@fortawesome/pro-regular-svg-icons";
import { faSquarePhone } from "@fortawesome/pro-solid-svg-icons";
import WhatsappLink from "./whatsapp-link";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";

export default function ProjectSticky({ prop }) {
  const [isSticky, setIsSticky] = useState(false);
  const [showSearch, setShowSearch] = useState(false)

  useEffect(() => {
    const scrollHandle = () => {
      if (window.scrollY > 700) {
        setIsSticky(true)
      } else {
        setIsSticky(false)
      }
    }
    window.addEventListener('scroll', scrollHandle);
    return () => {
      window.removeEventListener('scroll', scrollHandle)
    }
  }, []);
  return <section className={`bg-white sticky top-0 shadow-sm z-20 transition-all ${isSticky ? 'block' : 'hidden'
    }`}>
    <div className="wrapper flex justify-between">
      {/* Sticky items */}
      <div className="self-center py-1.5">
        {/* Project Name */}
        <h4 className={`mb-1 md:text-[1.4rem] line-clamp-1 ${prop.propname.length >= 25 ? 'text-xl' : 'text-2xl'}`}>{prop.propname}</h4>
        {/* Property Details */}
        <div className="flex gap-3 text-sm">
          {prop.propbed && <div><FontAwesomeIcon icon={faBedFront} className="text-[11px]" /> {prop.propbed}  <span>BR</span></div>}
          {prop.propsize !== 'NA' && <div><FontAwesomeIcon icon={faRulerCombined} className="text-[11px]" /> {prop.propsize} <span>Sq. Ft.</span>
          </div>}
        </div>
      </div>
      <div className="self-center hidden lg:block">
        <div className="text-sm min-w-16 max-md:text-right">
          Price <small>(AED)</small> <span className={`text-primary block font-bold ${prop.proprice.toLowerCase() == 'on request' ? 'max-sm:text-xs' : 'text-xl'}`}>{prop.proprice} {prop.proprice.toLowerCase() !== 'on request' && 'M'}</span>
        </div>
      </div>
      {/* Phone & Whatsapp */}
      <div className="hidden self-center lg:flex gap-x-4">
        <a href="" className="text-phone"><FontAwesomeIcon icon={faPhone} /> <span className="text-lg lg:text-xl">+97 1507 794 706</span></a>
        <WhatsappLink className="text-whatsapp"><FontAwesomeIcon icon={faWhatsapp} /> <span className="text-lg lg:text-xl">Whatsapp</span> </WhatsappLink>
      </div>

      {/* Sticky Search */}
      <div className="hidden lg:block relative bg-gray-200">
        {showSearch && <div className="pl-2 absolute md:min-w-[500px] right-[60px] bg-gray-200 min-h-full flex items-center">
          <CommonSearch inputClasses="project-search" parentClass="mx-0" />
        </div>}
        <div className="px-2 flex items-center justify-center min-h-full">
          <button onClick={() => setShowSearch(!showSearch)} className="flex items-center justify-center btn btn-primary px-3"><FontAwesomeIcon icon={faMagnifyingGlass} className="text-xl" /></button>
        </div>
      </div>
    </div>
  </section>
}