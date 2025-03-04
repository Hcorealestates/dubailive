import { notFound, redirect } from 'next/navigation';
import Footer from "@/components/footer";
import Header from "@/components/header";
import { faRulerCombined, faSlashForward } from "@fortawesome/pro-light-svg-icons";
import { faColumns3, faDownload, faKey, faMoneyFromBracket } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from '@fortawesome/fontawesome-svg-core';
import { all } from '@awesome.me/kit-d4fc302733/icons';
library.add(...all)
import Image from 'next/image'
import Link from "next/link";
import Modal from "@/components/Modal";
import FloorPlan from "@/components/floor-plan";
import GalleryImage from "@/components/gallery";
import TextComponent from "@/components/TextComponent";
import SimilarProjects from "@/components/similar-projects";
import ProjectSticky from "@/components/project-sticky";
import Overview from "@/components/overview";
import getHomeCompleteData from "@/api/getHomeCompleteData";
import ModalOthers from "@/components/modal-others";
import NoWhatComponent from "@/components/no-what-component";
import TailwindAccordion from "@/components/tailwind-accordion";
import Four04ReadOnly from '@/components/four04-read-only';

export default async function ProjectPage({ params }) {
  const formData = new URLSearchParams();
  formData.append('token1', process.env.token1);
  formData.append('token2', process.env.token2);
  formData.append('type', 'project');
  formData.append('url', params.projecturl);
  const redirectUrl = await fetch(process.env.API_URL + 'users/redirection/', {
    next: { revalidate: 60 },
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
  const properties = getProjectDetails(params.projecturl);
  const resultProp = await properties;

  if (resultProp.message === 'record not found') {
    notFound();
  }
  const prop = resultProp.prop;
  const props = getHomeCompleteData();
  const result = await props;
  const pagedata = result.pagedata;
  const floorPlanData = resultProp.floorplan;
  const is404 = prop.is404;
  return <>
    {is404 === 'yes' && <Four04ReadOnly />}
    <Header headerObj={pagedata} />
    <title>{prop.seotitle}</title>
    <meta name="description" content={prop.seodesc} />
    <link rel="canonical" href={prop.canonical} />
    <section className="relative">
      <Image src={prop.mobilebannerimage} width={639} height={650} alt={prop.mainbanneralt} className="block sm:hidden object-cover object-center max-h-[600px]" priority />
      <Image src={prop.mainbannerimage} width={1600} height={750} alt={prop.mainbanneralt} className="hidden sm:block w-full max-lg:min-h-150" />
      {/* Project Information */}
      <div className="left-0 top-0 absolute w-full min-h-full z-10 flex flex-col justify-center items-center bg-white/[.85] px-6 text-center">
        <Image src={prop.logo} priority width={300} height={90} className="max-h-16 w-auto md:max-h-24 max-w-40" alt={prop.logoalt} />
        <h1 className="text-3xl md:text-5xl max-w-2xl mx-auto mt-3"><TextComponent itemObj={prop.h1} /></h1>
        {prop.proprice && <div className="py-6 text-sm">Price (AED)<span className="block text-3xl border-b border-primary/[.5] font-bold">{prop.proprice}  {prop.proprice !== 'On Request' && <span>M<sup>&#42;</sup></span>}</span></div>}
        <ul className="flex flex-wrap justify-center divide-x divide-primary/[.4] *:px-3 text-xl my-4">
          {prop.propbed && <li>{prop.propbed} <span>BR</span></li>}
          {prop.propertytypename && <li>{prop.propertytypename}</li>}
        </ul>
        {prop.offertext && <div className="bg-primary-600/[.25] px-3 py-2 my-6 rounded-lg border border-primary-600/[.3]">{prop.offertext}</div>}
        <div className="hidden md:block">
          <Modal btnClasses="" projectName={prop.h1}>Enquire Now</Modal>
        </div>
      </div>
      {/* Project Breadcrumb */}
      <div className="hidden md:block absolute z-10 w-full bottom-3">
        <nav className="wrapper" aria-label="Breadcrumb">
          <ol className="flex gap-2 text-sm text-gray-500">
            <li>
              <Link href={prop.homeurl} className="link">Dubai Housing</Link>
            </li>
            <li><FontAwesomeIcon icon={faSlashForward} /></li>
            <li>
              <Link href={prop.communitiesurl} className="link">Our  Communities</Link>
            </li>
            <li><FontAwesomeIcon icon={faSlashForward} /></li>
            <li aria-current="page">{prop.propname}</li>
          </ol>
        </nav>
      </div>
    </section>

    {/* Sticky Project info */}
    <ProjectSticky prop={prop} />
    {/* Highlight Section */}
    {resultProp.highlights.length > 0 &&
      <section className="lg:py-28 py-12 bg-primary/[.1]">
        <div className="wrapper grid md:grid-cols-9 gap-8">
          <figure className="relative md:col-span-5 lg:col-span-3 before:absolute before:w-full before:h-full before:left-6 before:top-6 before:bg-primary/[.3] before:-z-10 *:rounded-xl before:rounded-xl mr-6">
            {/* Highlight Banner */}
            {prop.highlightimage && <Image src={prop.highlightimage} width={450} height={600} className="w-full object-cover object-center md:min-h-full" alt={prop.highlightalt} />}
            <figcaption className="absolute inset-0 z-10 bg-linear-to-t from-black to-black/[.5] flex items-end p-12">
              <span className="absolute top-4 left-4 w-[calc(100%-33px)] h-[calc(100%-33px)] border border-white/[.4] rounded-xl z-[-2]"></span>
              <div className="text-white text-2xl md:text-4xl font-serif"><small className="block text-sm font-sans font-normal">Key Highlights of </small>{prop.propname}</div>
            </figcaption>
          </figure>

          {resultProp.highlights.length > 0 &&
            <div className=" max-md:mt-12 grid md:col-span-4 lg:col-span-6 lg:grid-cols-2 gap-6">
              {/* Highlight Items */}
              {resultProp.highlights.map(items => <div key={items.id} className="border border-dashed border-primary/[.2] bg-white/[.3] p-4 rounded-lg flex gap-6 items-center">
                <FontAwesomeIcon icon={`fa-regular ${items.iconId}`} className="text-2xl" />
                <div className="">
                  <div className="text-lg font-semibold font-serif text-primary">{items.heading}</div>{items.description}</div>
              </div>)}
            </div>
          }
        </div>
      </section>
    }

    {/* Configuration */}
    <section className="wrapper py-12 md:py-16 grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 text-center text-gray-600 max-sm:*:border">
      {prop.propsize &&
        <div className="flex flex-col p-4 md:p-6 grow text-xs">
          <FontAwesomeIcon icon={faRulerCombined} className="text-2xl block mb-2" />
          Sizes (Sq. Ft.)
          <span className="text-xl md:text-4xl font-bold">{prop.propsize}</span>
        </div>
      }
      {prop.bookingamount &&
        <div className="flex flex-col p-4 md:p-6 grow text-xs">
          <FontAwesomeIcon icon={faMoneyFromBracket} className="text-2xl block mb-2" />
          Booking Amount
          <span className="text-xl md:text-4xl font-bold">{prop.bookingamount}</span>
        </div>
      }
      {prop.paymentplan &&
        <div className="flex flex-col p-4 md:p-6 grow text-xs">
          <FontAwesomeIcon icon={faColumns3} className="text-2xl block mb-2" />
          Payment Plan
          <span className="text-xl md:text-4xl font-bold">{prop.paymentplan}</span>
        </div>
      }
      {prop.possession &&
        <div className="flex flex-col p-4 md:p-6 grow text-xs">
          <FontAwesomeIcon icon={faKey} className="text-2xl block mb-2" />
          Possession
          <span className="text-xl md:text-4xl font-bold">{prop.possession}</span>
        </div>
      }
    </section>
    {/* grid control */}
    <section className='grid border'>
      {/* Overview Section */}
      <div className="bg-gray-50 py-16 order-1">
        <div className="wrapper max-w-5xl">
          <small className="text-base text-gray-500">Overview</small>
          {prop.h2 && <h2 className="text-2xl lg:text-4xl">{prop.h2}</h2>}
          {prop.overhead && <span className="font-semibold block my-3 text-primary md:text-xl">{prop.overhead}</span>}
          <Overview overviewshortObj={prop.overshortdesc} overviewDesc={prop.overdesc} />
        </div>
      </div>

      {/* eBrochure Section */}
      <div className="relative">
        {/* {prop.ebroucherimagemobile && <Image src={prop.ebroucherimagemobile} width={640} height={650} className="block md:hidden w-full" alt={prop.ebroucheralt} />} */}
        {prop.ebroucherimage && <Image src={prop.ebroucherimage} width={640} height={650} quality={100} className="hidden md:block w-full" alt={prop.ebroucheralt} />}
        <div className="lg:absolute bg-white/[.85] min-h-full lg:w-1/2 lg:top-0 lg:left-0 xl:p-16 flex flex-col justify-center p-6">
          {prop.ebrohead && <h2 className="text-2xl md:text-4xl">{prop.ebrohead}</h2>}
          <TextComponent className="mb-6 ebrochure" itemObj={prop.ebrodesc} />
          <Modal className="self-start px-6 rounded-full" projectName={prop.h1}><FontAwesomeIcon icon={faDownload} /> eBrochure</Modal>
        </div>
      </div>
    </section>

    {/* Payment Plan */}
    {prop.pplandesc && <section className="wrapper max-w-5xl py-12 md:py-28">
      <div className="lg:text-center">
        {prop.pplanhead && <h3 className="text-2xl lg:text-4xl mb-6 font-serif">
          <small className="text-base text-gray-500 block">Payment Plan of </small>
          {prop.pplanhead}</h3>}
      </div>
      <TextComponent itemObj={prop.pplandesc} className="payment flex flex-wrap gap-6 *:grow relative *:bg-primary/[.1] *:p-6 *:border-b-2 *:border-primary/[.6] *:text-5xl/8" />
    </section>}


    {/* Amenities Section */}
    <section className="bg-gray-50 py-12 md:py-28 lg:text-center">
      <div className="wrapper max-w-5xl">
        <small className="text-base text-gray-500">Amenities of</small>
        {prop.amenityhead && <h3 className="text-2xl lg:text-4xl mb-4">{prop.amenityhead}</h3>}
        {prop.amenitydesc && <TextComponent itemObj={prop.amenitydesc} className='mb-5' />}
        <div className="grid sm:grid-cols-4 sm:grid-flow-row grid-flow-col overflow-auto gap-5 mt-4 pb-2">
          {resultProp.amenities.splice(0, 4).map((amenity, index) =>
            <div key={index} className="flex  flex-col gap-2 grow bg-primary/[.1] p-6 rounded-sm text-sm text-primary/[.9] text-center text-nowrap">
              <FontAwesomeIcon icon={`fa-regular ${amenity.iconId}`} className="text-4xl" />
              {amenity.heading}
            </div>
          )}
        </div>
        <div className="mt-6">
          <ModalOthers btnText="See More Amenities">
            <div className="text-xl py-4">More Amenities</div>
            {resultProp.amenities.map((amenity, index) =>
              <div className="flex border-t" key={index}>
                <div className="py-5 flex gap-4 items-center">
                  <FontAwesomeIcon icon={`fa-regular ${amenity.iconId}`} className="text-2xl text-gray-700" />
                  {amenity.heading}
                </div>
              </div>
            )}
          </ModalOthers>
        </div>
      </div>
    </section>

    {/* Location Section */}
    <section className="wrapper  py-12 md:py-28">
      <div className="lg:text-center mb-8 mx-auto max-w-5xl">
        {prop.locationhead && <h4 className="text-2xl lg:text-4xl mb-6 font-serif">
          <small className="text-base text-gray-500 block">Location of </small>
          {prop.locationhead}</h4>}
        {prop.locationdesc && <TextComponent itemObj={prop.locationdesc} />}
      </div>
      <ul className="grid gap-5 sm:grid-flow-row sm:grid-cols-2 md:grid-cols-4 grid-flow-col max-sm:overflow-auto pb-2">
        {resultProp.localities.map((location) =>
          <li className="border p-4 pl-14 text-sm rounded-lg text-gray-700" key={location.id}>
            <FontAwesomeIcon icon={location.iconId} className="text-xl md:text-2xl -ml-10 float-left mt-2" />
            <span className="block md:text-xl font-semibold text-nowrap">{location.heading}</span> <span className='  text-nowrap'>{location.description}</span>
          </li>
        )}
      </ul>
    </section>

    <section className='grid'>

    </section>

    {/* Floor Plan Section */}
    {floorPlanData.length > 0 && <><div className="bg-gray-100 py-16">
      <div className="lg:text-center wrapper max-w-4xl pb-40">
        {prop.floorhead && <h4 className="text-2xl lg:text-4xl mb-6 font-serif"><small className="text-base text-gray-500 block">Floor Plans of </small>
          {prop.floorhead}</h4>}
        {prop.floordesc && <TextComponent itemObj={prop.floordesc} />}
      </div>
    </div>
      <div className="wrapper relative z-1 -mt-60 md:pb-20">
        <FloorPlan floorPlanObj={floorPlanData} projectName={prop.h1} />
      </div>
    </>}


    {/* Gallery Section */}
    {resultProp.gallery.length > 0 && <div className="flex flex-col lg:flex-row gap-6 p-6">
      <div className="lg:w-1/2 border lg:h-[calc(100vh-6rem)] relative lg:sticky lg:top-20 bg-white overflow-hidden">
        <Image src="/images/gallery-bg.svg" width={1000} height={800} alt={`Gallery images of ${prop.propname}`} className="lg:min-h-screen min-w-full object-cover" />
        <div className=" absolute inset-0 w-full min-h-full flex justify-center items-center">
          <h4 className="text-2xl lg:text-4xl bg-white p-4"><small className="block font-sans font-normal text-base">Gallery images of </small>{prop.propname}</h4>
        </div>
      </div>
      <GalleryImage galleryObj={resultProp.gallery} />
    </div>}

    {/* FAQ Section */}
    {resultProp.faq.length > 0 &&
      <section className="py-24 wrapper max-w-4xl">
        <div className="text-center">
          <div className="h2 text-4xl">Have a question?</div>
          <p className="mb-4 mt-2">We will tell you everything you need to know about Emaar Porto View</p>
        </div>
        <div className="flex flex-col gap-6">
          {resultProp.faq.map(faq => <TailwindAccordion key={faq.id} faqItem={faq} />)}
        </div>
      </section>
    }

    {/* Sechdule Section */}
    <section className="wrapper">
      <div className="border">
        <div className="overflow-hidden md:max-h-[550px] flex flex-col md:flex-row gap-10 items-center">
          <div className="relative max-md:-mt-[55vw] md:-ml-[15vw] before:absolute before:top-0 before:-right-6 before:w-full before:h-full before:bg-primary/[.5] before:rounded-full">
            <Image src={prop.mobilebannerimage} width={500} height={600} alt={prop.mainbanneralt} className="relative object-cover rounded-full md:max-h-[600px] md:w-[45vw]" />
          </div>
          <div className="px-6 pb-6 md:p-6 md:ml-32">
            <small className="text-base text-gray-500">Arrange Property Viewing today</small>
            <div className="font-serif text-2xl md:text-4xl">Don&apos;t Miss The Property Tour</div>
            <div className="py-4">Click below to Schedule</div>
            <Modal btnClasses="rounded-full py-1.5" projectName={prop.h1}>Schedule Now</Modal>
          </div>
        </div>
      </div>
    </section>

    {/* Ask Anything Section */}
    <section className="wrapper pt-16 lg:pt-20">
      <div className="bg-primary/[.8] p-8 md:p-16 rounded-3xl flex flex-col gap-8 md:flex-row md:items-center">
        <div className="text-white">
          <div className="h2 text-2xl lg:text-4xl mb-3 text-primary-50">Ask Anything Anytime</div>
          <div className='text-primary-200'>With a simple chat conversation, we resolve every query of yours- Enjoy Instant Support to grab Asset</div>
        </div>
        <div className="md:order-first ">
          <Modal btnClasses="rounded-full text-nowrap" projectName={prop.h1}>Ask Any Question</Modal>
        </div>
      </div>
    </section>
    {/* Similar Properties */}
    {prop.relatedProjects.length > 0 &&
      <section className="wrapper pt-16 overflow-hidden">
        <div className="h2 text-2xl lg:text-4xl">Similar Properties</div>
        <SimilarProjects similarObj={prop.relatedProjects} />
      </section>
    }
    <NoWhatComponent whatContent={prop.not_what} whatImage={prop.FooterImage} whatUrl={prop.projectsurl} buttonText="View All Properties" />
    <Footer footerProject={result.footerproject} footerComm={result.footercomm} pageData={pagedata} staticInfo={result.staticpagedata} prop={prop} whatsappMessage={prop.h1} />
  </>
}
async function getProjectDetails(projectid) {
  const formData = new URLSearchParams();
  formData.append('propurl', projectid);
  formData.append('token1', process.env.token1);
  formData.append('token2', process.env.token2);
  const finalresult = await fetch(process.env.API_URL + 'properties/promotionpage/', {
    next: { revalidate: 60 },
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: formData,
  });
  return finalresult.json();
}