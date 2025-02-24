"use client";
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import ProjectId from "@/components/project-id";
import Pagination from "@/components/pagination";
import LoadingCustom from '@/components/loading-custom';

export default function ProjectListing({ columnVal, columnName, commurlName }) {
  const searchParams = useSearchParams();
  const page = searchParams.get('page') ? searchParams.get('page') : "1";
  const currentpage = searchParams.get('page') ? searchParams.get('page') : "1";
  const [projectsData, setProject] = useState([]);
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
    formData.append('column', columnName);
    formData.append('val', columnVal);
    formData.append('orderby', 'id');
    fetch(process.env.API_URL + 'properties/getPropertiesByCondition/', {
      method: 'POST',
      cache: 'force-cache',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData,
    })
      .then((res) => res.json())
      .then((result) => {
        setProject(result.propertydata);
        setMessage(result.message);
        setTotalrecords(result.totalrecords);
        setPerpagerecord(result.perpagerecord);
        setNumberofpage(Math.ceil(result.totalrecords / result.perpagerecord))
        setLoading(false)
      })
  }, [page, columnName, page]);

  const pageName = commurlName;
  // console.log(pageName);
  return <>
    {loading ? (<LoadingCustom />) : (<>
      <ProjectId projectId={projectsData} />
      {totalrecords > 10 &&
        <div className="mb-10">
          <Pagination totalrecord={totalrecords} pagename={pageName} currentpage={currentpage} numberofpage={number_of_page} />
        </div>
      }
    </>)
    }
  </>
}