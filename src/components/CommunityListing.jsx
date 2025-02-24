"use client";
import { useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react';
import CommunityComponent from "@/components/community-component";
import Pagination from "@/components/pagination";
import LoadingCustom from '@/components/loading-custom';

export default function CommunityListing() {
  const searchParams = useSearchParams()
  const page = searchParams.get('page') ? searchParams.get('page') : "1";
  const currentpage = searchParams.get('page') ? searchParams.get('page') : "1";
  const [communitiesData, setCommunity] = useState(false);
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
    fetch(process.env.API_URL + 'communities/', {
      method: 'POST',
      cache: 'force-cache',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData,
    })
      .then((res) => res.json())
      .then((result) => {
        setCommunity(result.communitydata);
        setMessage(result.message);
        setTotalrecords(result.totalrecords);
        setPerpagerecord(result.perpagerecord);
        setNumberofpage(Math.ceil(result.totalrecords / result.perpagerecord))
        setLoading(false)
      })
  }, [page]);

  const pageName = 'our-communities';

  return <>
    <div className="lg:space-y-28 space-y-12">
      {loading ? (<LoadingCustom />) : (
        <CommunityComponent communities={communitiesData} />
      )
      }
    </div>
    {totalrecords > 10 &&
      <div className="lg:pb-10 pb-7">
        <Pagination totalrecord={totalrecords} pagename={pageName} currentpage={currentpage} numberofpage={number_of_page} />
      </div>
    }
  </>
}