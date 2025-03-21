import { faArrowRightLong, faLocationDot, faRulerCombined } from "@fortawesome/pro-regular-svg-icons";
import { faCircleChevronRight } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";

export default function DeveloperProject({ devProject, className }) {
  return <figure className={`${className} relative bg-white rounded-lg hover:shadow-xl group`}>
    {devProject.listingimage && <Image src={devProject.listingimage} width={500} height={400} className="w-screen group-hover:brightness-50 group-hover:drop-shadow-xl transition-all h-40 md:h-70 rounded-tl-lg rounded-tr-lg" alt={devProject.propname} title={devProject.propname} />}

    <div className="absolute top-4 left-4 mr-4 bg-white px-2 py-1.5 rounded-lg">{devProject.propbed} BR {devProject.propertytypename}</div>
    <figcaption className="bg-white p-4 pb-0">
      {devProject.propname && <h4 className="text-xl mb-2 line-clamp-1 text-center">{devProject.propname}</h4>}
      {/* {devProject.proplocationurl && <Link className="link text-sm mb-2 inline-block relative z-10 hover:translate-x-3 transition-transform" href={devProject.proplocationurl}><FontAwesomeIcon icon={faLocationDot} />  {devProject.proplocation}
      </Link>} */}
      {devProject.proprice &&
        <div className="text-primary text-xl font-bold text-center mb-6">
          {/* <span className="text-gray-500 block text-xs font-normal">Prices</span> */}
          AED {devProject.proprice} {devProject.proprice != 'On Request' ? <span>M<small className="text-gray-500 text-sm align-super">*</small></span> : ''}
        </div>
      }
      <div className="border-t flex justify-between items-center">
        {devProject.propsize &&
          <div className="mb-2 py-2">
            {/* <span className="text-gray-500 block text-xs">Sizes</span> */}
            <FontAwesomeIcon className="text-xs" icon={faRulerCombined} /> {devProject.propsize} {devProject.propsize != 'On Request' || devProject.propsize != '' ? ' Sq. Ft.' : ''}
          </div>
        }
        {devProject.propurl && <Link href={devProject.propurl} className="py-2"> <FontAwesomeIcon className="text-2xl group-hover:text-primary" icon={faCircleChevronRight} />
          <span className="absolute inset-0 z-1"></span>
        </Link>}
      </div>
    </figcaption>
  </figure>
}