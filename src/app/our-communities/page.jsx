import { Suspense } from 'react';
import BannerGradient from "@/components/banner-gradient";
import CommonSearch from "@/components/common-search";
import Footer from "@/components/footer";
import Header from "@/components/header";
import { faSlashForward } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import getHomeCompleteData from "@/api/getHomeCompleteData";
import CommunityListing from "@/components/CommunityListing";
import LoadingCustom from '@/components/loading-custom';


export default async function OurCommunities() {
  const props = getHomeCompleteData();
  const result = await props;
  const pagedata = result.pagedata;

  return <>
    <Header headerObj={pagedata} />
    <title>{pagedata.commseotitle}</title>
    <meta name="description" content={pagedata.commseodesc} />
    <link rel="canonical" href={pagedata.communitiesurl} />
    <section className="relative">
    <Image src={pagedata.commbanner} priority width={1000} height={650} alt={result.staticpagedata.community_h1} className="w-screen h-72 sm:h-[350px] md:h-[500px] object-cover object-center" />
      <BannerGradient>
        <h1 className="text-3xl md:text-5xl mb-8 text-center text-white">{result.staticpagedata.community_h1}</h1>
        <CommonSearch parentClass="-mb-7 max-w-3xl mx-6" />
      </BannerGradient>
    </section>
    <nav className="wrapper mt-12 border-b pb-3 mb-3" aria-label="Breadcrumb">
      <ol className="flex gap-2 text-sm text-gray-500">
        <li>
          <Link href={pagedata.homeurl} className="link">Dubai Housing</Link>
        </li>
        <li><FontAwesomeIcon icon={faSlashForward} /></li>
        <li aria-current="page">Our Communities</li>
      </ol>
    </nav>

    <section className="wrapper">
      <h2 className="text-2xl md:text-4xl">{pagedata.community_h2}</h2>
      <Suspense fallback={<LoadingCustom />}>
        <CommunityListing />
      </Suspense>
    </section>
    <Footer footerProject={result.footerproject} footerComm={result.footercomm} pageData={pagedata} staticInfo={result.staticpagedata} />
  </>
}