import { Suspense } from 'react';
import Footer from "@/components/footer";
import Header from "@/components/header";
import getHomeCompleteData from "@/api/getHomeCompleteData";
import CommonSearch from "@/components/common-search";
import Image from "next/image";
import BannerGradient from "@/components/banner-gradient";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSlashForward } from "@fortawesome/pro-regular-svg-icons";
import DeveloperList from "@/components/developer-list";
import LoadingCustom from '@/components/loading-custom';

export default async function AllDevelopers() {
  const props = getHomeCompleteData();
  const result = await props;
  const pagedata = result.pagedata;
  return <>
    <Header headerObj={pagedata} />
    <title>{pagedata.devseotitle}</title>
    <meta name="description" content={pagedata.devseodesc} />
    <link rel="canonical" href={pagedata.developersurl} />
    <main className="bg-gray-100">
      <section className="relative">
        {/* pagedata.commbanner */}
        <Image
          src={result.staticpagedata.devmobbanner}
          width={639}
          height={350}
          alt={result.staticpagedata.dev_h1}
          className="block max-h-[300px] object-cover object-center sm:hidden"
        />
        <Image
          src={result.staticpagedata.devbanner}
          width={1400}
          height={650}
          alt={result.staticpagedata.dev_h1}
          className="hidden max-h-[500px] w-full sm:block object-cover object-top"
        />
        <BannerGradient>
          <h1 className="text-3xl md:text-5xl mb-8 text-center text-white">{result.staticpagedata.dev_h1}</h1>
          <CommonSearch parentClass="-mb-7 max-w-3xl mx-6" />
        </BannerGradient>
      </section>

      <section className="wrapper">
        {/* Developers Breadcrumb */}
        <nav aria-label="Breadcrumb">
          <ol className="flex gap-2 text-gray-500 mt-10 pb-3 border-b mb-6">
            <li>
              <Link href={pagedata.homeurl} className="link">Dubai Housing</Link>
            </li>
            <li><FontAwesomeIcon icon={faSlashForward} /></li>
            <li aria-current="page">Dubai Developers</li>
          </ol>
        </nav>

        {/* Developer Overview */}
        <div className="pb-8">
          <h2 className="text-3xl mb-4">{result.staticpagedata.dev_h2}</h2>
          <p>{result.staticpagedata.devdescription}</p>
          <div className="mt-10 grid grid-cols-1 gap-12">
            <Suspense fallback={<LoadingCustom />}>
              <DeveloperList />
            </Suspense>
          </div>
        </div>
      </section>
    </main>
    <Footer footerProject={result.footerproject} footerComm={result.footercomm} pageData={pagedata} staticInfo={result.staticpagedata} />
  </>
}