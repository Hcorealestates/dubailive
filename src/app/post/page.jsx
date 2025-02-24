import { Suspense } from 'react'
import Footer from "@/components/footer";
import Header from "@/components/header";
import getHomeCompleteData from "@/api/getHomeCompleteData";
import BlogSearch from "@/components/BlogSearch";
import PostSlides from "@/components/post-slides";
import BlogListing from "@/components/BlogListing";
import TextComponent from "@/components/TextComponent";
import LoadingCustom from '@/components/loading-custom';

export default async function AllPost() {
  const props = getHomeCompleteData();
  const result = await props;
  const pagedata = result.pagedata;
  const StaticPage = result.staticpagedata;
  const blogs = getBlogDetails();
  const resblog = await blogs;
  //console.log(StaticPage)

  return <>
    <Header headerObj={pagedata} />
    <title>{pagedata.blogseotitle}</title>
    <meta name="description" content={pagedata.blogseodesc} />
    <link rel="canonical" href={pagedata.posturl} />
    <section className="wrapper max-w-5xl text-center py-16">
      <h1 className="text-3xl lg:text-[4vw] leading-tight"><TextComponent itemObj={StaticPage.blog_h1.replace("classname", "className")} /></h1>
      <div className="mt-8 flex justify-center relative z-10">
        <BlogSearch parentClass="mx-0 text-left" />
      </div>
    </section>
    <section className="overflow-hidden">
      <div className="wrapper border-t pb-16">
        <h2 className="text-2xl lg:text-3xl py-4 mb-5"><TextComponent itemObj={StaticPage.blog_slide_h3} /></h2>
        <PostSlides postItemSlide={resblog.firstTenBlogs} />
      </div>
    </section>

    <section className="wrapper border-t pb-16">
      <h4 className="text-2xl lg:text-[3vw] leading-tight py-6"><TextComponent itemObj={StaticPage.blog_listingheading} /></h4>
      <Suspense fallback={<LoadingCustom />}>
        <BlogListing />
      </Suspense>
    </section>
    <Footer footerProject={result.footerproject} footerComm={result.footercomm} pageData={pagedata} staticInfo={result.staticpagedata} />
  </>
}

async function getBlogDetails() {
  const formData = new URLSearchParams();
  formData.append('token1', process.env.token1);
  formData.append('token2', process.env.token2);
  const finalresult = await fetch(process.env.API_URL + 'blogs/firstTenblogs/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: formData,
  });
  return finalresult.json();
}