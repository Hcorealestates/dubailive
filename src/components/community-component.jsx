import { faSquareCheck } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Modal from "./Modal";
import { faSquareWhatsapp } from "@fortawesome/free-brands-svg-icons";
import Link from "next/link";
import WhatsappLink from "./whatsapp-link";
import TextComponent from "@/components/TextComponent";

export default function CommunityComponent({ communities }) {

  return <>
    {communities.map(community => <figure key={community.id} className="relative flex flex-col lg:flex-row my-8 items-center group rounded-xl border lg:border-0">
      {/* Community Image */}
      <div className="w-full lg:min-w-[55vw] rounded-t-xl lg:rounded-xl overflow-hidden relative z-[-1] lg:group-even:order-1">
        <Image src={community.listingimage} width={850} height={550} alt={community.name} title={community.name} className="w-full group-hover:scale-110 transition-all lg:max-h-[650px]" />
      </div>
      {/* Community Information */}
      <figcaption className="lg:border lg:-ml-64 lg:group-even:ml-0 lg:group-even:-mr-64  w-full bg-white lg:p-8 p-6 lg:rounded-2xl">
        {community.name && <h2 className="text-xl md:text-2xl mb-4">{community.name}</h2>}
        <div className="sm:bg-primary/[.2] flex flex-col sm:flex-row sm:gap-6 justify-between *:grow sm:p-4">
          <div className="flex justify-between max-sm:border-t max-sm:py-2 sm:flex-col text-sm text-primary-800">Starting Sizes
            <span className="sm:text-xl font-semibold">{community.size} {community.size === 'On Request' ? "" : "Sq. Ft."}</span>
          </div>
          <div className="flex justify-between  max-sm:border-t max-sm:py-2 sm:flex-col text-sm text-primary-800">Starting Price
            <span className="sm:text-xl font-semibold">AED {community.price} {community.price === 'On Request' ? "" : "M*"}</span>
          </div>
          <div className="flex justify-between max-sm:border-t max-sm:py-2 sm:flex-col text-sm text-primary-800">Beds
            <span className="sm:text-xl font-semibold">{community.comm_bed} {community.comm_bed === 'On Request' ? "" : "BR"}</span>
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-8 my-8">
          {/* Key Features */}
          <div className="feature">
            <span className="font-semibold block mb-3 ">KEY FEATURES</span>
            <TextComponent className="space-y-2 flex gap-3 items-center text-sm" itemObj={community.commfeaturedesc} />
          </div>

          {/* BUY NOW */}
          <div className="feature">
            <span className="bg-red-600 text-white overflow-hidden inline-block min-w-32 py-1 px-2 relative after:absolute after:-right-4 after:top-[50%] after:size-8 after:bg-white after:rotate-45 after:translate-y-[-50%] mb-4">BUY NOW*</span>
            <TextComponent itemObj={community.commofferdesc} />
          </div>
        </div>

        {/* Buttons & Whatsapp */}
        <div className="flex flex-wrap items-center gap-3">
          <Modal className="grow relative z-10" projectName={community.name}>Enquire Now</Modal>

          <WhatsappLink phoneNumber={community.whatsapp_number} message={community.name} className="flex items-center relative z-10">
            <FontAwesomeIcon icon={faSquareWhatsapp} className="text-whatsapp text-5xl" />
          </WhatsappLink>

          {/* before:absolute before:inset-0 */}
          <Link href={community.url} className="btn btn-primary grow before:absolute before:inset-0">View Details</Link>
        </div>
      </figcaption>
    </figure>)}
  </>
}