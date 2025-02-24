import { notFound, redirect } from 'next/navigation';
import { Fragment } from "react";
import Footer from "@/components/footer";
import Header from "@/components/header";
import getHomeCompleteData from "@/api/getHomeCompleteData";
import CommonSearch from "@/components/common-search";
import Image from "next/image";
import BannerGradient from "@/components/banner-gradient";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSlashForward } from "@fortawesome/pro-regular-svg-icons";
import DeveloperItem from "@/components/developer-list";
import DeveloperLogo from "@/components/developer-logo";
import DeveloperProject from "@/components/developer-project";
import ArrowLink from "@/components/arrow-link";
import TextComponent from "@/components/TextComponent";

export default async function DeveloperSingle({ params }) {
  const formData = new URLSearchParams();
  formData.append('token1', process.env.token1);
  formData.append('token2', process.env.token2);
  formData.append('type', 'developer');
  formData.append('url', params.developerurl);
  const redirectUrl = await fetch(process.env.API_URL + 'users/redirection/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: formData,
  });
  const resultRedirect = await redirectUrl.json();

  if (resultRedirect.message == 'success') {
    redirect(resultRedirect.new_url);
  }
  const props = getHomeCompleteData();
  const result = await props;
  const pagedata = result.pagedata;


  const developers = getDeveloperDetails(params.developerurl);
  const resultDev = await developers;
  const developerData = resultDev.developers;
  const message = resultDev.message;

  if (message === 'record not found') {
    notFound();
  }

  return <>
    <Header headerObj={pagedata} />
    <title>{developerData.seotitle}</title>
    <meta name="description" content={developerData.seodesc} />
    <link rel="canonical" href={developerData.url} />
    {/* Banner and Search Section */}
    <section className="relative">
      {/* pagedata.commbanner */}
      <Image
        src={developerData.mobilebannerimage}
        width={639}
        height={450}
        alt={developerData.h1}
        className="block max-h-[450px] object-cover object-center sm:hidden"
      />
      <Image
        src={developerData.mainbannerimage}
        width={1400}
        height={650}
        alt={developerData.h1}
        className="hidden max-h-[500px] w-full sm:block object-cover object-top"
      />
      <BannerGradient>
        <h1 className="text-3xl md:text-5xl mb-8 text-center text-white">{developerData.h1}</h1>
        <div className="flex justify-center flex-wrap gap-6 sm:gap-10 bg-white p-4 mb-8 rounded-lg text-center">
          <div className="max-w-48">
            <DeveloperLogo developerLogo={{
              devimage: developerData.devimage,
              name: developerData.h1
            }} />
          </div>
          <div className="flex sm:gap-10 divide-x *:px-4">
            <div className=" text-gray-700">
              <span className="block text-primary text-3xl font-bold">{developerData.total_projects}+</span>
              Projects
            </div>
            <div className=" text-gray-700">
              <span className="block text-primary text-3xl font-bold">{developerData.total_community}+</span>
              Communities
            </div>
          </div>
        </div>
        <CommonSearch parentClass="-mb-7 max-w-3xl mx-6" />
      </BannerGradient>
    </section>


    <section className="wrapper">
      {/* Developers Breadcrumb */}
      <nav aria-label="Breadcrumb">
        <ol className="flex gap-2 text-gray-500 mt-14 pb-3 border-b mb-6">
          <li>
            <Link href={developerData.homeurl} className="link">Dubai Housing</Link>
          </li>
          <li><FontAwesomeIcon icon={faSlashForward} /></li>
          <li>
            <Link href={developerData.devurl} className="link">Developers</Link>
          </li>
          <li><FontAwesomeIcon icon={faSlashForward} /></li>
          <li aria-current="page">{developerData.name}</li>
        </ol>
      </nav>

      {/* Developer Single Overview */}
      <div className="pb-8">
        <h2 className="text-3xl mb-4">{developerData.h2}</h2>
        <div className="*:mb-6">
          <TextComponent className="text-editor" itemObj={developerData.full_desc} />
        </div>
      </div>


      {/* Community Projects Listing */}
      <div className="pb-16">
        {/* Community Heading */}
        {developerData.communities.map((community, index) => <Fragment key={index}>
          <div className="relative flex items-center mb-8">
            <div className="bg-white inline-block pr-4">
              <small className="text-gray-500 ">Community of</small> <h3 className="text-2xl leading-5">{community.comname}</h3>
            </div>
            <div className="h-px mt-6 bg-gray-200 grow"></div>
          </div>

          {/* Community List */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 pb-2">
            {community.projectondev.map(project =>
              <DeveloperProject className="" devProject={project} key={project.id} />)}
          </div>
          <div className="mt-6 mb-14">
            <ArrowLink arrowLink={community.comurl} arrowText={`More about ${community.comname}`} />
          </div>
        </Fragment>)}
      </div>
    </section>
    <Footer whatsappMessage={developerData.h1} footerProject={result.footerproject} footerComm={result.footercomm} pageData={pagedata} staticInfo={result.staticpagedata} />
  </>
}

async function getDeveloperDetails(devurl) {
  const formData = new URLSearchParams();
  formData.append('devurl', devurl);
  formData.append('token1', process.env.token1);
  formData.append('token2', process.env.token2);
  const finalresult = await fetch(process.env.API_URL + 'developers/developerInnerPage/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: formData,
  });
  return finalresult.json();
}
