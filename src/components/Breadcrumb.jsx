import { headers } from 'next/headers';
import { faSlashForward } from "@fortawesome/pro-light-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

export default function Breadcrumb() {
   const headersList = headers();
   const referer = headersList.get('referer');

   if(referer === 'https://www.dubaihousing-ae.com/'){
      return null;
   }


   if(referer && referer.includes("our-communities")){
      const lastSegment = referer ? referer.split("/").filter(Boolean).pop() : "";
      const formattedText = lastSegment
      .replace(/-/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());
      return ( 
         <>
         <li><FontAwesomeIcon icon={faSlashForward} /></li>
         <li>
           <Link href={referer} className="link">{formattedText}</Link>
         </li>
         </>
      )
   }

   if(referer === 'https://www.dubaihousing-ae.com/projects'){
      return ( 
         <>
         <li><FontAwesomeIcon icon={faSlashForward} /></li>
         <li>
           <Link href={referer} className="link">New Projects</Link>
         </li>
         </>
      )
   }
}