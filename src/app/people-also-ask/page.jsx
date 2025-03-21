import { Suspense } from 'react';
import Footer from "@/components/footer";
import Header from "@/components/header";
import getHomeCompleteData from "@/api/getHomeCompleteData";
import AskSearch from "@/components/AskSearch";
import PostSlides from "@/components/post-slides";
import AskListing from "@/components/AskListing";
import TextComponent from "@/components/TextComponent";
import LoadingCustom from '@/components/loading-custom';

export default async function AllPost() {
  const props = getHomeCompleteData();
  const result = await props;
  const pagedata = result.pagedata;

  const StaticPage = result.staticpagedata;

  const blogs = getPeopleAlsoAkkDetails();
  const resblog = await blogs;

  return <>
    <Header headerObj={pagedata} />
    <title>{pagedata.askseotitle}</title>
    <meta name="description" content={pagedata.askseodesc} />
    <link rel="canonical" href={pagedata.peoplealsoask} />
    <section className="wrapper max-w-5xl text-center py-16">
      <h1 className="text-3xl lg:text-[4vw] leading-tight"><span className="text-primary"><TextComponent itemObj={StaticPage.ask_h1.replace("classname", "className")} /></span></h1>
      <div className="mt-8 flex justify-center relative z-10">
        <AskSearch parentClass="mx-0 text-left" />
      </div>
    </section>
    <section className="overflow-hidden">
      <div className="wrapper border-t pb-16">
        <h3 className="text-2xl lg:text-3xl py-4 mb-5"><TextComponent itemObj={StaticPage.ask_slide_h3} /></h3>
        <PostSlides postItemSlide={resblog.firstTenAsks} />
      </div>
    </section>

    <section className="wrapper border-t pb-16">
      <h3 className="text-2xl lg:text-[3vw] leading-tight py-6"><TextComponent itemObj={StaticPage.ask_listingheading} /></h3>
      <Suspense fallback={<LoadingCustom />}>
        <AskListing />
      </Suspense>
    </section>
    <Footer footerProject={result.footerproject} footerComm={result.footercomm} pageData={pagedata} staticInfo={result.staticpagedata} />
  </>
}

async function getPeopleAlsoAkkDetails() {
  const formData = new URLSearchParams();
  formData.append('token1', process.env.token1);
  formData.append('token2', process.env.token2);
  const finalresult = await fetch(process.env.API_URL + 'ask-peoples/firstTenPropelask/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: formData,
  });
  return finalresult.json();
}