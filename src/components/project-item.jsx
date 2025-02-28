import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBedFront, faRulerCombined } from "@fortawesome/pro-light-svg-icons";
import Link from 'next/link';
import Image from 'next/image';
export default function ProjectItem({ projectObject }) {
  return <>
    <Image src={projectObject.listingimage} width={350} height={240} className='h-60 md:h-80 rounded-t-lg w-full object-cover object-center transform' title={projectObject.propname} alt={projectObject.propname} />
    <figcaption className='p-4 pb-0'>
      <h6 className="text-center text-lg md:text-xl mb-3 max-sm:line-clamp-1"><Link href={projectObject.propurl} className=' before:absolute before:inset-0'>{projectObject.propname}</Link></h6>
      <div className="text-center text-gray-500 text-sm">{projectObject.propertytypename}</div>
      <div className="text-center mb-4 text-xl text-primary font-semibold">AED {projectObject.proprice} <span className="">M</span></div>
      <div className="flex justify-between border-t -mx-4 py-3 px-4 text-sm">
        <div className="">
          <FontAwesomeIcon icon={faBedFront} /> {projectObject.propbed} <span className="">BR</span>
        </div>
        <div className="">
          <FontAwesomeIcon icon={faRulerCombined} /> {projectObject.propsize} <span className=""> Sq. Ft.</span>
        </div>
      </div>
    </figcaption>
  </>
}