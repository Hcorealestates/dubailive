import { faLocationDot, faRulerCombined } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";

export default function DeveloperProject({ devProject, className }) {
  return <figure className={`${className} relative bg-white rounded-lg *:rounded-lg group`}>
    {devProject.listingimage &&<Image src={devProject.listingimage} width={500} height={400} className="w-screen group-hover:brightness-50 group-hover:drop-shadow-xl transition-all h-80" alt={devProject.propname} title={devProject.propname} />}
    {devProject.propurl &&<Link href={devProject.propurl}>
      <span className="absolute inset-0 z-1"></span>
    </Link>}
    <figcaption className="absolute bottom-3 left-3 mr-3 bg-white p-4">
      {devProject.propname &&<h4 className="text-xl md:text-2xl mb-2 line-clamp-2 group-hover:text-primary group-hover:translate-x-2 transition-transform">{devProject.propname}</h4>}
      {devProject.proplocationurl &&<Link className="link text-sm mb-2 inline-block relative z-10 hover:translate-x-3 transition-transform" href={devProject.proplocationurl}><FontAwesomeIcon icon={faLocationDot} />  {devProject.proplocation}
      </Link>}
      {devProject.propsize &&
        <div className="mb-2 border-y py-2">
          <span className="text-gray-500 block text-xs">Sizes</span>
          <FontAwesomeIcon icon={faRulerCombined} /> {devProject.propsize} {devProject.propsize != 'On Request' || devProject.propsize != '' ? ' Sq. Ft.' : ''}
        </div>
      }
      {devProject.proprice &&
        <div className="text-primary text-xl font-bold">
          <span className="text-gray-500 block text-xs font-normal">Prices</span>
          AED {devProject.proprice} {devProject.proprice != 'On Request' ? 'M*' : ''}
        </div>
      }
    </figcaption>
  </figure>
}