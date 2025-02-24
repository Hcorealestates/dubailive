import { Suspense } from 'react'
import BannerGradient from "@/components/banner-gradient";
import CommonSearch from "@/components/common-search";
import CommonAds from "@/components/common-ads";
import Footer from "@/components/footer";
import Header from "@/components/header";
import Pagination from "@/components/pagination";
import { faSlashForward } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from '@fortawesome/fontawesome-svg-core';
import { far, fab } from '@awesome.me/kit-d4fc302733/icons';
library.add(far, fab);
import Image from "next/image";
import Link from "next/link";
import { communitiyAds, projectsData, adsSlides, masterPlanDetails, whyAmenities } from "../../../data/data";
import getHomeCompleteData from "@/api/getHomeCompleteData";
import ProjectId from "@/components/project-id";
import SideProjectAds from "@/components/side-project-ads";
import MasterPlan from "@/components/master-plan";
import TextComponent from "@/components/TextComponent";
import NoWhatComponent from "@/components/no-what-component";
import ProjectListing from "@/components/ProjectListing";
import LoadingCustom from '@/components/loading-custom';

export default async function Projects() {
  const props = getHomeCompleteData();
  const result = await props;
  const pagedata = result.pagedata;

  const StaticPage = result.staticpagedata;
  return (
    <>
      <Header headerObj={pagedata} />
      <title>{pagedata.prolistingseotitle}</title>
      <meta name="description" content={pagedata.prolistingseodesc} />
      <link rel="canonical" href={pagedata.allprojectsurl} />
      <section className="relative">
        <Image
          src={pagedata.listingmobilebannerimage}
          width={639}
          height={350}
          alt={StaticPage.prolist_h1}
          className="block h-72 sm:h-[350px] md:h-[500px] object-cover object-center sm:hidden"
        />
        <Image
          src={pagedata.listingmainbannerimage}
          width={1400}
          height={650}
          alt={StaticPage.prolist_h1}
          className="hidden sm:h-[350px] md:h-[450px] w-full sm:block"
        />
        <BannerGradient>
          <h1 className="mb-8 text-center text-3xl md:text-5xl text-white">
            {StaticPage.prolist_h1}
          </h1>
          <CommonSearch parentClass="-mb-7 max-w-3xl mx-6" />
        </BannerGradient>
      </section>
      <nav className="wrapper mb-3 mt-12 border-b pb-3" aria-label="Breadcrumb">
        <ol className="flex flex-wrap gap-2 text-sm text-gray-500">
          <li>
            <Link href={pagedata.homeurl} className="link">
              Dubai Housing
            </Link>
          </li>
          <li>
            <FontAwesomeIcon icon={faSlashForward} />
          </li>
          <li aria-current="page">{StaticPage.prolist_name} For Sale</li>
        </ol>
      </nav>

      <section className="wrapper">
        <CommonAds projectAds={StaticPage.projectOffer} />

        <div className="mb-12 grid grid-cols-1 items-start gap-x-8 gap-y-8 sm:grid-cols-3 xl:grid-cols-4 2xl:gap-x-12">
          <div className="flex flex-col gap-10 sm:col-span-2 xl:col-span-3">
            <Suspense fallback={<LoadingCustom />}>
              <ProjectListing columnVal="" columnName="" commurlName="projects" />
            </Suspense>
          </div>
          <div className="sticky top-6 sm:col-span-1">
            <SideProjectAds slideObj={result.commonads} />
          </div>
        </div>
      </section>
      <Footer footerProject={result.footerproject} footerComm={result.footercomm} pageData={pagedata} staticInfo={result.staticpagedata} />
    </>
  );
}