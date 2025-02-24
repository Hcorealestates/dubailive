import { notFound } from 'next/navigation';
import BannerGradient from "@/components/banner-gradient";
import CommonSearch from "@/components/common-search";
import CommonAds from "@/components/common-ads";
import Footer from "@/components/footer";
import Header from "@/components/header";
import { faSlashForward } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from '@fortawesome/fontawesome-svg-core';
import { far, fab } from '@awesome.me/kit-d4fc302733/icons';
library.add(far, fab);
import Image from "next/image";
import Link from "next/link";
import getHomeCompleteData from "@/api/getHomeCompleteData";
import SideProjectAds from "@/components/side-project-ads";
import MasterPlan from "@/components/master-plan";
import TextComponent from "@/components/TextComponent";
import NoWhatComponent from "@/components/no-what-component";
import ProjectListing from "@/components/ProjectListing";

export default async function CommunitySingle({ params }) {
  const props = getHomeCompleteData();
  const result = await props;
  const pagedata = result.pagedata;
  const communities = getCommunityDetails(params.communityurl);
  const resultComm = await communities;
  if (resultComm.message != 'success') {
    notFound();
  }
  const communityData = resultComm.community;
  return (
    <>
      <Header headerObj={pagedata} />
      <title>{communityData.seotitle}</title>
      <meta name="description" content={communityData.seodesc} />
      <link rel="canonical" href={communityData.url} />
      <section className="relative">
        <Image
          src={communityData.mobilebannerimage}
          width={639}
          height={350}
          alt={communityData.h1}
          className="block max-h-[300px] object-cover object-center sm:hidden"
        />
        <Image
          src={communityData.mainbannerimage}
          width={1400}
          height={650}
          alt={communityData.h1}
          className="hidden max-h-[400px] w-full sm:block"
        />
        <BannerGradient>
          <h1 className="mb-8 text-center text-3xl md:text-5xl text-white">
            {communityData.h1}
          </h1>
          <CommonSearch parentClass="-mb-7 max-w-3xl mx-6" />
        </BannerGradient>
      </section>
      <nav className="wrapper mb-3 mt-12 border-b pb-3" aria-label="Breadcrumb">
        <ol className="flex flex-wrap gap-2 text-sm text-gray-500">
          <li>
            <Link href={communityData.homeurl} className="link">
              Dubai Housing
            </Link>
          </li>
          <li>
            <FontAwesomeIcon icon={faSlashForward} />
          </li>
          <li>
            <Link href={communityData.communitiesurl} className="link">
              Our Communities
            </Link>
          </li>
          <li>
            <FontAwesomeIcon icon={faSlashForward} />
          </li>
          <li aria-current="page">{communityData.h1}</li>
        </ol>
      </nav>

      <section className="wrapper">
        <CommonAds projectAds={communityData} />
        <div className="mb-10">
          <small className="small">Welcome to the</small>
          <h2 className="mb-2 text-4xl">{communityData.h1}</h2>
          <TextComponent className="text-editor" itemObj={communityData.commdesc} />
        </div>
        <div className="mb-12 grid grid-cols-1 items-start gap-x-8 gap-y-8 sm:grid-cols-3 xl:grid-cols-4 2xl:gap-x-12">
          <div className="flex flex-col gap-10 sm:col-span-2 xl:col-span-3">
            <ProjectListing columnVal={communityData.commid} columnName="community_id" commurlName={communityData.commurlname} />
          </div>
          <div className="sticky top-6 sm:col-span-1">
            <SideProjectAds slideObj={resultComm.commonads} />
          </div>
        </div>
      </section>

      {/* Master Plan */}
      <section className="wrapper grid md:grid-cols-12 gap-x-8 pb-16">
        <div className="md:col-span-full">
          <h2 className="text-2xl md:text-4xl mb-3">{communityData.MasterHeading}</h2>
        </div>
        <MasterPlan masterImg={communityData.MasterImage} alt={communityData.h1} />
        <figcaption className="md:col-span-4 border md:rounded-lg rounded-b-lg">
          <div className="text-2xl h2 p-4 border-b">Master Plan Details</div>
          <div className="flex flex-col divide-y overflow-y-auto p-4 max-h-96">
            {resultComm.mplanlist.map((item, i) => <div key={i} className="flex gap-4 text-slate-700 py-5">
              <FontAwesomeIcon icon={`fa-regular ${item.iconId}`} className="text-2xl mt-1" />
              <div className="text-sm">
                <span className="block font-bold text-base">{item.heading}</span>{item.description}</div>
            </div>)}
          </div>
        </figcaption>
        <div className="col-span-full pt-10">
          <TextComponent itemObj={communityData.MasterDesc} />
        </div>
      </section>

      {resultComm.investData.length > 0 &&
        <section id="whySection" className="bg-gray-100 py-10">
          <div className="wrapper why">
            <h2 className="text-2xl md:text-4xl">Why Invest in {communityData.h1}</h2>
            <ul className="grid max-md:grid-flow-col overflow-x-auto md:grid-cols-3 lg:grid-cols-4 my-6 gap-4 pb-2">
              {resultComm.investData.map((whyItem, i) => <li key={i} className="border rounded-lg p-5 md:py-8 md:px-6 bg-white max-md:min-w-72">
                {whyItem.iconId && <FontAwesomeIcon icon={`fa-regular ${whyItem.iconId}`} className="block! text-3xl text-primary mb-3" />}{whyItem.heading}</li>)}
            </ul>
          </div>
        </section>
      }
      <NoWhatComponent whatContent={communityData.WhatContent} whatImage={communityData.footerimage} whatUrl={communityData.communitiesurl} buttonText="View All Communities" />
      <Footer footerProject={result.footerproject} whatsappMessage={communityData.h1} footerComm={result.footercomm} pageData={pagedata} staticInfo={result.staticpagedata} />
    </>
  );
}

async function getCommunityDetails(commurl) {
  const formData = new URLSearchParams();
  formData.append('commurl', commurl);
  formData.append('token1', process.env.token1);
  formData.append('token2', process.env.token2);
  const finalresult = await fetch(process.env.API_URL + 'communities/communityInnerPage/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: formData,
  });
  return finalresult.json();
}