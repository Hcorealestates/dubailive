import Image from "next/image";
import Header from "@/components/header";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas, far, fab } from '@awesome.me/kit-d4fc302733/icons';
library.add(fas, far, fab);
import BannerGradient from "@/components/banner-gradient";
import CommonSearch from "@/components/common-search";
import HomeTopProjects from "@/components/home-top-projects";
import Link from "next/link";
import { salesData, topCommunities, typesData, developersData, homeBlogData } from "../../data/data";
import HomeTopCommunities from "@/components/home-top-communities";
import ArrowLink from "@/components/arrow-link";
import DeveloperSlides from "@/components/developer-slides";
import BlogItem from "@/components/blog-item";
import Footer from "@/components/footer";
import TextComponent from "@/components/TextComponent";
import getHomeCompleteData from "@/api/getHomeCompleteData";


export default async function Home() {
  const props = getHomeCompleteData();
  const result = await props;
  const pagedata = result.pagedata;
  return <>
    <title>{pagedata.seotitle}</title>
    <meta name="description" content={pagedata.seodesc} />
    <link rel="canonical" href={pagedata.homeurl} />

    <Header headerObj={pagedata} />
    {/* Video Section */}
    <section className="relative">
      <Image src={pagedata.mobbabberimage} priority width={430} height={500} alt={pagedata.h1} className="sm:hidden w-full h-100 object-cover object-center" />
      <video width="320" height="240" preload="none" controls={false} loop muted autoPlay className="hidden sm:block h-120 md:h-140 w-full object-cover object-center">
        <source src={pagedata.video} type="video/mp4" />
      </video>
      <BannerGradient>
        <h1 className="text-4xl md:text-5xl mb-3 text-white">Dubai Housing</h1>
        <div className="md:text-lg mb-8 text-white">{pagedata.h1}</div>
        <CommonSearch parentClass="-mb-7 max-w-3xl mx-6" inputClasses="" />
      </BannerGradient>
    </section>

    {/* Top & Latest Searches */}
    <section className="pt-16 pb-16 relative max-w-6xl mx-auto px-6">
      <div className="flex gap-3 flex-wrap items-center md:justify-center"><span className="font-medium">Popular Search</span>
        <div className="flex gap-2 *:text-sm overflow-x-auto pb-2">
          {pagedata.popularsearch.map((item) => (
            <Link href={item.url} className="block py-1.5 border border-primary-800/20 rounded-full px-3 text-primary text-nowrap bg-primary/10 hover:bg-primary/80 hover:text-white" key={item.id}>{item.text}</Link>
          ))}
        </div>
      </div>

      <div className="flex gap-3 flex-wrap items-center mt-3 pt-5 border-t md:justify-center"><span className="font-medium">Latest Searches</span>
        <div className="flex gap-2 *:text-sm overflow-x-auto pb-2">
          {pagedata.latestsearch.map((item) => (
            <Link href={item.url} className="block py-1.5 border border-primary-800/20 rounded-full px-3 text-primary text-nowrap bg-primary/10 hover:bg-primary/80 hover:text-white" key={item.id}>{item.text}</Link>
          ))}
        </div>
      </div>
    </section>

    {/* Overview Section */}
    <section className="relative max-w-6xl mx-auto px-6 md:text-center">
      <h2 className="text-2xl md:text-3xl">{pagedata.h3}</h2>
      <p className="font-medium mb-4 md:text-center">{pagedata.h3_desc}</p>
      <TextComponent className="text-editor md:text-center" itemObj={pagedata.overview} />
    </section>

    <section className="relative pt-16 wrapper md:text-center overflow-hidden sm:overflow-visible">
      <h2 className="text-2xl md:text-3xl mb-2">{pagedata.popular_search_heading}</h2>
      <p className="mb-4">{pagedata.popular_search_desc}</p>
      <HomeTopProjects topProject={result.popProjects} />
      <div className="mt-5">
        <ArrowLink arrowLink={pagedata.allprojectsurl} arrowText="View More Projects" />
      </div>
    </section>

    {/* community Section */}
    <section className="relative pt-16 wrapper overflow-hidden sm:overflow-visible">
      <h2 className="text-left md:text-center text-2xl md:text-3xl mb-4">{pagedata.h2}</h2>
      <p className="text-left md:text-center mb-6">{pagedata.community_desc}</p>
      <HomeTopCommunities topCommunities={result.communities} />
      <div className="my-8">
        <ArrowLink arrowLink={pagedata.communitiesurl} arrowText="View All Communities" />
      </div>
    </section>

    { /*Section Property Types Like Apartments, Villas, etc.*/}
    <section className="relative pt-16 wrapper">
      <div className="grid max-sm:grid-cols-[repeat(auto-fit,minmax(290px,1fr))] sm:grid-cols-2 lg:grid-cols-3 gap-6 max-sm:grid-flow-col pb-4 overflow-x-auto">
        {result.explore.map(type => <figure key={type.id} className="border border-primary/[.4] rounded-xl p-4 md:p-8 relative text-center hover:bg-primary/[.1] transition duration-300 group flex-none max-sm:min-w-72">
          <Image src={type.listingimage} width={96} height={96} className="mx-auto" alt={type.tag_line} title={type.tag_line} />
          <figcaption>
            <h4 className="text-xl my-3">{type.tag_line}</h4>
            <p className="mb-4">{type.tag_desc}</p>
            <div className="flex justify-center">
              <Link href={type.url} className="bg-primary group-hover:bg-white border border-primary focus:outline-hidden text-white group-hover:text-primary font-semibold h-12 px-6  flex items-center justify-center rounded-lg before:absolute before:inset-0 shadow-xs shadow-primary transition duration-300">{type.button_text}</Link>
            </div>
          </figcaption>
        </figure>)}
      </div>
    </section>

    {/* Developer Section */}
    <section className="mt-16 bg-gray-400/10 py-20 md:text-center text-left">
      <div className="relative wrapper">
        <h4 className="text-2xl md:text-3xl mb-3">{pagedata.developer_heading}</h4>
        <p className="max-w-5xl mx-auto mb-6">{pagedata.developer_description}</p>
        <DeveloperSlides developerObj={result.developerdata} />
        <div className="mt-8">
          <ArrowLink arrowLink={pagedata.developersurl} arrowText="Explore More" />
        </div>
      </div>
    </section>
    {/* Home Blog section */}
    <section className="relative pt-16 wrapper">
      <h2 className="text-2xl md:text-3xl text-center mb-10">{pagedata.blog_heading}</h2>
      <div className="grid max-sm:grid-flow-col max-sm:grid-cols-[auto-fit__minmax(290px,1fr)] sm:grid-cols-2 lg:grid-cols-4 gap-6 overflow-x-auto w-auto pb-4">
        {result.blogs.map(blog => <figure key={blog.id} className="relative border-[5px] rounded-2xl bg-white hover:shadow-lg hover:shadow-primary/[.3] hover:border-primary/[.5] max-sm:min-w-[calc(100vw-5rem)]">
          <BlogItem blogItem={blog} />
        </figure>)
        }
      </div>
      <div className="my-8">
        <ArrowLink arrowLink={pagedata.posturl} arrowText="Explore More" />
      </div>
    </section >
    <Footer footerProject={result.footerproject} footerComm={result.footercomm} pageData={pagedata} staticInfo={result.staticpagedata} />
  </>;
}