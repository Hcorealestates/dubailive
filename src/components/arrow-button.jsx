import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightLong } from "@fortawesome/pro-light-svg-icons";
import Link from "next/link";
export default function ArrowLink({ arrowLink = '/', arrowText }) {
  return <>
    <button className="relative inline-flex items-center gap-2 group transition border-b border-b-primary uppercase font-semibold">{arrowText}<FontAwesomeIcon icon={faArrowRightLong} className=" group-hover:translate-x-5 duration-200" />
    </button>
  </>
}