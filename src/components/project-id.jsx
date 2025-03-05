import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBedFront, faBuildings, faLocationDot, faRulerCombined } from "@fortawesome/pro-regular-svg-icons";
import Modal from "./Modal";
import WhatsappLink from "./whatsapp-link";
import { faSquareWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { faPhoneSquare } from "@fortawesome/pro-solid-svg-icons";


export default function ProjectId({ projectId }) {
  return <>{projectId.map(pid => <figure key={pid.propId} className="flex flex-col xl:flex-row border rounded-lg group relative transition duration-150 hover:shadow-xl hover:border-primary/[.3]">
    <Image src={pid.listingimage} width={389} height={289} alt={pid.listingimagealt} title={pid.listingimagealt} className="xl:rounded-l-lg max-xl:rounded-t-lg w-full h-64 xl:h-74 object-cover object-center xl:w-90" />
    <figcaption className="flex flex-col p-4 lg:p-6 grow">
      <h2 className="text-xl md:text-2xl">
        {/*  */}
        <Link href={pid.propurl} className="group-hover:text-primary before:absolute before:inset-0">
          {pid.propname}
        </Link>
      </h2>
      <Link href={pid.proplocationurl} className="link relative z-10"><FontAwesomeIcon icon={faLocationDot} /> {pid.proplocation}</Link>

      {/* Price */}
      <div className="text-2xl pt-4 pb-2 mb-4 font-bold text-primary border-b">
        <small className="block font-normal text-gray-600 text-sm">Price</small>
        {pid.proprice === 'On Request' ? `${pid.proprice}` : `AED ${pid.proprice}`}
        {pid.proprice === 'On Request' ? "" : <span> M*</span>}
      </div>

      {/* Configuration */}
      <div className="flex flex-col md:justify-between xl:flex-row gap-3 text-zinc-600">
        {pid.propbed ? <div className="flex gap-1 items-center">
          <FontAwesomeIcon icon={faBedFront} /> {pid.propbed}  <span>BR</span>
        </div> : null}
        {pid.propertytypename ? <div className="flex gap-1 items-center">
          <FontAwesomeIcon icon={faBuildings} /> {pid.propertytypename}
        </div> : null}
        {pid.propsize ? <div className="flex gap-1 items-center">
          <FontAwesomeIcon icon={faRulerCombined} />{pid.propsize}  <span>Sq. Ft.</span>
        </div> : null}
      </div>

      {/* Click Event */}
      <div className="flex gap-3 items-center mt-8 max-sm:mb-2">

        {/* Enquire Now */}
        <Modal className="py-1.5 px-3 max-sm:grow relative z-10" projectName={pid.propname}>Enquire Now</Modal>

        {/* Whatsapp */}
        <WhatsappLink message={pid.propname} phoneNumber={pid.propwhatsapp} className="h-9 text-whatsapp flex items-center md:border md:border-whatsapp rounded-lg relative z-10 hover:scale-105 focus:scale-95">
          <FontAwesomeIcon icon={faSquareWhatsapp} className="text-[40px]" /> <span className="hidden md:inline-block px-2">Whastapp</span>
        </WhatsappLink>

        {/* Tel - Mobile Number */}
        <a href={`tel:+${pid.propcallnumber}`} className="h-9 text-phone flex items-center md:border md:border-phone rounded-lg relative z-10 hover:scale-105 focus:scale-95"><FontAwesomeIcon icon={faPhoneSquare} className="text-[40px]" /> <span className="hidden md:inline-block px-2">Call Now</span></a>
      </div>
    </figcaption>
  </figure>)}
  </>
}