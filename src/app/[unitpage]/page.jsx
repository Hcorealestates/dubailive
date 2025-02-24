import { notFound } from 'next/navigation';
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
import NotFound from "../not-found";

export default async function UnitSingle({ params }) {
   const validPages = ['apartments-for-sale-in-dubai', 'villas-for-sale-in-dubai','townhouses-for-sale-in-dubai','penthouses-for-sale-in-dubai','studio-for-sale-in-dubai','duplex-for-sale-in-dubai','luxury-properties-for-sale-in-dubai'];
   if (!validPages.includes(params.unitpage)) {
      notFound();
   }
  
   const props = getHomeCompleteData();
   const result = await props;
   const pagedata = result.pagedata;

   const unitdata = getUnitPageDetails(params.unitpage);
   const resultUnit = await unitdata;
   const unitpData = resultUnit.unitdetails;

   return (
      <>
      <Header headerObj={pagedata} />
      {resultUnit.message == 'success' ?
         <>
         <title>{unitpData.seotitle}</title>
         <meta name="description" content={unitpData.seodesc} />
         <link rel="canonical" href={unitpData.url} />
         <section className="relative">
           <Image
             src={unitpData.mobilebannerimage}
             width={639}
             height={350}
             alt={unitpData.h1}
             className="block max-h-[300px] object-cover object-center sm:hidden"
           />
           <Image
             src={unitpData.mainbannerimage}
             width={1400}
             height={650}
             alt={unitpData.h1}
             className="hidden max-h-[400px] w-full sm:block"
           />
           <BannerGradient>
             <h1 className="mb-8 text-center text-3xl md:text-5xl text-white">
               {unitpData.h1}
             </h1>
             <CommonSearch parentClass="-mb-7 max-w-3xl mx-6" />
           </BannerGradient>
         </section>
         <nav className="wrapper mb-3 mt-12 border-b pb-3" aria-label="Breadcrumb">
           <ol className="flex flex-wrap gap-2 text-sm text-gray-500">
             <li>
               <Link href={unitpData.homeurl} className="link">
                 Dubai Housing
               </Link>
             </li>
             <li>
               <FontAwesomeIcon icon={faSlashForward} />
             </li>
             <li aria-current="page">{unitpData.h1}</li>
           </ol>
         </nav>

         <section className="wrapper">
           <CommonAds projectAds={unitpData} />
           <div className="mb-10">
             <h2 className="mb-2 text-4xl">{unitpData.h2}</h2>
             <TextComponent itemObj={unitpData.overview} />
           </div>
           <div className="mb-12 grid grid-cols-1 items-start gap-x-8 gap-y-8 sm:grid-cols-3 xl:grid-cols-4 2xl:gap-x-12">
             <div className="flex flex-col gap-10 sm:col-span-2 xl:col-span-3">
               <h2 className="mb-2 text-4xl">{unitpData.h3}</h2>
               <ProjectListing columnVal={unitpData.uniturlname} columnName="search_type_url" commurlName={unitpData.uniturlname} />
             </div>
             <div className="sticky top-6 sm:col-span-1">
               <SideProjectAds slideObj={resultUnit.commonads} />
             </div>
           </div>
         </section>
         </>
        : <NotFound />
      }
      <Footer footerProject={result.footerproject} footerComm={result.footercomm} pageData={pagedata} staticInfo={result.staticpagedata} />
    </>
  );
}

async function getUnitPageDetails(uniturl) {
   const formData = new URLSearchParams();
   formData.append('uniturl', uniturl);
   formData.append('token1', process.env.token1);
   formData.append('token2', process.env.token2);
   const response = await fetch(process.env.API_URL + 'pages/unitPageDetails/', {
      method: 'POST',
      headers: {
         'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData,
   });

   return await response.json();
   
}