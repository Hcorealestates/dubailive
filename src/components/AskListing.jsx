"use client";
import { useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react';
import PostItem from "@/components/post-item";
import Pagination from "@/components/pagination";
import LoadingCustom from '@/components/loading-custom';

export default function AskListing() {
   const searchParams = useSearchParams()
   const page = searchParams.get('page') ? searchParams.get('page') : "1";
   const currentpage = searchParams.get('page') ? searchParams.get('page') : "1";
   const [askdata, setAskdata] = useState([]);
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
      fetch(process.env.API_URL + 'ask-peoples/', {
         method: 'POST',
         cache: 'force-cache',
         headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
         },
         body: formData,
      })
         .then((res) => res.json())
         .then((result) => {
            setAskdata(result.askdata);
            setMessage(result.message);
            setTotalrecords(result.totalrecords);
            setPerpagerecord(result.perpagerecord);
            setNumberofpage(Math.ceil(result.totalrecords / result.perpagerecord))
            setLoading(false)
         })
         .catch((err) => {
            console.error("Error fetching data:", err);
            setLoading(false);
         });
   }, [page]);

   const pageName = 'people-also-ask';
   //const number_of_page = Math.ceil(totalrecords / perpagerecord);
  
   return (
      <> 
         {loading ? (
            <LoadingCustom />
         ) : (
            <>
               <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {askdata.map(item => (
                     <div key={item.id}>
                        <PostItem postItem={item} />
                     </div>
                  ))}
               </div>
               {totalrecords > 10 && (
                  <div className="border-t mt-12 pt-4">
                     <Pagination 
                        totalrecord={totalrecords} 
                        pagename={pageName} 
                        currentpage={page} 
                        numberofpage={number_of_page} 
                     />
                  </div>
               )}
            </>
         )}  
      </>
   );
}