"use client";
import { useSearchParams } from 'next/navigation'
import React, { useEffect, useState, Suspense } from 'react';
import PostItem from "@/components/post-item";
import Pagination from "@/components/pagination";
import LoadingCustom from '@/components/loading-custom';

export default function BlogByCatListing( { CatId, blogCatUrl }) {
  const searchParams = useSearchParams()
  const page = searchParams.get('page') ? searchParams.get('page') : "1";
  const currentpage = searchParams.get('page') ? searchParams.get('page') : "1";
  const [blogCatData, setBlogCat] = useState([]);
  const [message, setMessage] = useState('');
  const [totalrecords, setTotalrecords] = useState('');
  const [perpagerecord, setPerpagerecord] = useState('');
  const [number_of_page, setNumberofpage] = useState('');
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const formData = new URLSearchParams();
    formData.append('token1', process.env.token1);
    formData.append('token2', process.env.token2);
    formData.append('CatId', CatId);
    formData.append('page', page);
    fetch(process.env.API_URL + 'blog-categories/getBlogById/', {
      method: 'POST',
      cache: 'force-cache',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData,
    })
      .then((res) => res.json())
      .then((result) => {
        setBlogCat(result.blogCatdata);
        setMessage(result.message);
        setTotalrecords(result.totalrecords);
        setPerpagerecord(result.perpagerecord);
        setNumberofpage(Math.ceil(result.totalrecords / result.perpagerecord))
        setLoading(false)
      })
  }, [CatId, page]);

  const pageName = blogCatUrl;

  return (
    <>
    <Suspense fallback={<LoadingCustom />}>
      {loading ? (
        <LoadingCustom />
      ) : (
        <>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogCatData.map((item) => (
              <div key={item.id}>
                <PostItem postItem={item} />
              </div>
            ))}
          </div>
          {totalrecords > perpagerecord && (
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
      </Suspense>
    </>
  );
}