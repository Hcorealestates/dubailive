"use client"
import { faLocationDot, faSquareCheck, faXmark } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Modal from "./Modal";
import { faSquareWhatsapp } from "@fortawesome/free-brands-svg-icons";
import Link from "next/link";
import WhatsappLink from "./whatsapp-link";
import { useState } from "react"
import TextComponent from "@/components/TextComponent";

export default function CommonAds({ projectAds }) {
  const [handle, setHandle] = useState(true)
  return <>
    {handle && <figure className="relative flex flex-col lg:flex-row my-8 group rounded-xl border">
      <button onClick={() => setHandle(!handle)} className="absolute top-3 right-3 bg-white flex justify-center size-9 z-20 hover:bg-gray-200 rounded-full items-center text-xl cursor-pointer"><FontAwesomeIcon icon={faXmark} /></button>
      {/* Community Image */}
      <div className="overflow-hidden flex-1 max-sm:rounded-t-xl">
        <Image src={projectAds.offerimage} width={850} height={550} alt={projectAds.offerImageAlt} title={projectAds.offerImageAlt} className=" w-full group-hover:scale-110 transition-all min-h-full" />
      </div>
      {/* Community Information */}
      <figcaption className="bg-white lg:p-8 p-6  flex-1">
        <h2 className="text-xl md:text-2xl mb-2">{projectAds.offerheading}</h2>
        <div className="mb-4 text-zinc-600 text-sm"><FontAwesomeIcon icon={faLocationDot} /> {projectAds.offerloc}</div>
        <div className="sm:bg-primary/[.2] flex flex-col sm:flex-row sm:gap-6 justify-between *:grow sm:p-4">
          <div className="flex justify-between max-sm:border-t max-sm:py-2 sm:flex-col text-sm text-primary-800">Starting Sizes
            <span className="sm:text-xl font-semibold">{projectAds.offerSize} {projectAds.offerSize === 'On Request' ? "" : "Sq. Ft."}</span>
          </div>
          <div className="flex justify-between  max-sm:border-t max-sm:py-2 sm:flex-col text-sm text-primary-800">Starting Price
            <span className="sm:text-xl font-semibold">AED {projectAds.offerPrice} {projectAds.offerPrice === 'On Request' ? "" : "M*"}</span>
          </div>
          <div className="flex justify-between max-sm:border-t max-sm:py-2 sm:flex-col text-sm text-primary-800">Beds
            <span className="sm:text-xl font-semibold">{projectAds.offerBed} {projectAds.offerBed === 'On Request' ? "" : "BR"}</span>
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-8 my-8">
          {/* Key Features */}
          <div className="feature">
            <span className="font-semibold block mb-3 ">KEY FEATURES</span>
            <TextComponent itemObj={projectAds.propfeaturedesc} />
          </div>

          {/* BUY NOW */}
          <div className="feature">
            <span className="bg-red-600 text-white overflow-hidden inline-block min-w-32 py-1 px-2 relative after:absolute after:-right-4 after:top-[50%] after:size-8 after:bg-white after:rotate-45 after:translate-y-[-50%] mb-4">BUY NOW*</span>
            <TextComponent itemObj={projectAds.projectofferdesc} />
          </div>
        </div>

        {/* Buttons & Whatsapp */}
        <div className="flex flex-wrap items-center gap-3">
          <Modal className="grow relative z-10" projectName={projectAds.offerheading}>Enquire Now</Modal>

          <WhatsappLink phoneNumber={projectAds.WhatsApp} message={projectAds.offerheading} className="flex items-center relative z-10">
            <FontAwesomeIcon icon={faSquareWhatsapp} className="text-whatsapp text-5xl" />
          </WhatsappLink>

          {/* before:absolute before:inset-0 */}
          <Link href={projectAds.OfferURL} className="btn btn-primary grow before:absolute before:inset-0">View Details</Link>
        </div>
      </figcaption>
    </figure>}
  </>
}