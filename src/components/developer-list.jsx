"use client";
import { useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react';
import Image from "next/image";
import DeveloperLogo from "./developer-logo";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faRulerCombined } from "@fortawesome/pro-regular-svg-icons";
import ArrowLink from "./arrow-link";
import DeveloperProject from "./developer-project";
import LoadingCustom from '@/components/loading-custom';
import Pagination from "@/components/pagination";
import TextComponent from "@/components/TextComponent";

export default function DeveloperList() {

   const searchParams = useSearchParams()
   const page = searchParams.get('page') ? searchParams.get('page') : "";
   //console.log(page);
   const currentpage = searchParams.get('page') ? searchParams.get('page') : "1";
   const [devDetails, setDevelopers] = useState([]);
   const [message, setMessage] = useState('');
   const [totalrecords, setTotalrecords] = useState('');
   const [perpagerecord, setPerpagerecord] = useState('');
   const [number_of_page, setNumberofpage] = useState('');
   const [loading, setLoading] = useState(true);
   useEffect(() => {
      const formData = new URLSearchParams();
      formData.append('token1', process.env.token1);
      formData.append('token2', process.env.token2);
      formData.append('page', page);
      fetch(process.env.API_URL + 'developers/', {
         method: 'POST',
         cache: 'force-cache',
         headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
         },
         body: formData,
      })
         .then((res) => res.json())
         .then((result) => {
            setDevelopers(result.devdata);
            setMessage(result.message);
            setTotalrecords(result.totalrecords);
            setPerpagerecord(result.perpagerecord);
            setNumberofpage(Math.ceil(result.totalrecords / result.perpagerecord))
            setLoading(false)
         })
   }, [page]);

   const pageName = 'developers';

   return <>
         {loading ? (<LoadingCustom />) : (<> 
            {devDetails.map((developer, index) =>
               <div className="grid lg:grid-cols-12 gap-x-8" key={index}>
                  <figure className="lg:col-span-3 flex flex-col items-start bg-white p-6 rounded-lg">
                     <div className="border px-3 py-2 rounded-lg mb-3">
                        <DeveloperLogo className="w-48 h-auto" developerLogo={developer} />
                     </div>
                     <figcaption className="">
                        <h3 className="text-xl mb-2">{developer.name}</h3>
                        <TextComponent className="mb-6 ebrochure" itemObj={developer.shortdesc} />
                     </figcaption>
                  </figure>
                  <div className="lg:col-span-9 flex md:gap-8 gap-6 max-sm:overflow-x-auto pb-2">
                     {developer.selectedProject.map(project =>
                        <DeveloperProject className="max-sm:min-w-[90%]" devProject={project} key={project.id} />)}
                  </div>
                  <div className="col-span-full mt-6">
                     <ArrowLink arrowLink={developer.url} arrowText={`Explore ${developer.name}`} />
                  </div>
               </div>)
            }
            {totalrecords>10 && 
               <div className="">
                  <Pagination totalrecord={totalrecords} pagename={pageName} currentpage={currentpage} numberofpage={number_of_page} />
               </div>
            }
         </>)
      }
   </>
}

