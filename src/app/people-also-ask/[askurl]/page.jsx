export const revalidate = 5 * 60
import { notFound } from 'next/navigation';
import Footer from "@/components/footer";
import Header from "@/components/header";
import getHomeCompleteData from "@/api/getHomeCompleteData";
import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSlashForward } from "@fortawesome/pro-regular-svg-icons";
import SideProjectAds from "@/components/side-project-ads";
import { adsSlides, blogData } from "../../../../data/data";
import ProgressBar from "@/components/progress-bar";
import { faFacebook, faInstagram, faInstagramSquare, faLinkedin, faTelegram, faWhatsapp, faXTwitter, faYoutube } from "@fortawesome/free-brands-svg-icons";
import ShortClips from "@/components/short-clips";
import { tableContentData } from "../../../../data/data";
import PostHashMenu from "@/components/post-hash-menu";
import PostItem from "@/components/post-item";
import BlogAuthor from "@/components/blog-author";
import TextComponent from "@/components/TextComponent";

export default async function AskSingle({ params }) {
  const props = getHomeCompleteData();
  const result = await props;
  const pagedata = result.pagedata;
  const StaticPage = result.staticpagedata;
  // const mightAlso = blogData.slice(0, 4);


  const singleAsk = getSingleAskDetail(params.askurl);
  const askRes = await singleAsk;
  if (askRes.message != 'success') {
    notFound();
  }
  const askData = askRes.singleask;
  return <>
    <main>
      <title>{askData.seotitle}</title>
      <meta name="description" content={askData.seodesc} />
      <link rel="canonical" href={askData.url} />
      <ProgressBar />
      {/* Top Ads */}
      <section className="bg-primary/15 py-6 lg:py-10">
        <figure className="wrapper">
          <a href={askRes.blogads.url} target="_blank" className="block border border-primary">
            <Image src={askRes.blogads.mobimg} priority className="block sm:hidden w-screen" width={400} height={300} alt={askRes.blogads.alt} />
            <Image src={askRes.blogads.img} className="hidden sm:block  w-screen" width={1294} height={334} alt={askRes.blogads.alt} />
          </a>
        </figure>
      </section>
      <Header headerObj={pagedata} />

      <section className="px-4 py-3 sticky top-0 bg-black text-center text-xs md:text-base font-semibold text-white z-30">
        {StaticPage.clickme_heading} <Link href={StaticPage.clickme_url} className="link">Click Me!</Link>
      </section>

      <section className="wrapper text-center py-16">
        {/* Project Breadcrumb */}
        <nav aria-label="Breadcrumb">
          <ol className="flex gap-2 text-sm justify-center text-gray-500 mb-7">
            <li>
              <Link href={askData.homeurl} className="link">Dubai Housing</Link>
            </li>
            <li><FontAwesomeIcon icon={faSlashForward} /></li>
            <li>
              <Link href={askRes.askurl} className="link">People Also Ask
              </Link>
            </li>
            <li><FontAwesomeIcon icon={faSlashForward} /></li>
            <li aria-current="page">{askData.name}</li>
          </ol>
        </nav>

        <div className="mb-6">
          <Link href={askData.blogcaturl} className="border rounded-full inline-block py-1.5 px-3 text-sm bg-gray-200 hover:bg-gray-300">{askData.blogcatname}</Link>
        </div>

        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl mb-8">{askData.name}</h1>
        </div>
        <div className="max-w-6xl mx-auto">
          <p className="text-2xl text-gray-600">{askData.shortdesc}</p>
        </div>
        <div className="flex justify-center mt-10">
          <BlogAuthor author={{
            authorimage: askData.authorimage,
            authorname: askData.authorname,
            designation: 'Super Creator'
          }} />
        </div>
      </section>

      {/* Left, Middle & Right slide */}
      <section className="wrapper grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-x-12 pb-16">
        <div className="md:col-span-3">
          {/* Instagram Section */}
          <div className="shadow-lg border border-black/10 rounded-lg">
            <div className="flex justify-between items-center px-2 py-2">
              <div className="flex gap-x-3">
                <div className="border border-[var(--instagram)] size-12 rounded-full flex justify-center items-center">
                  <Image
                    alt="Dubai Housing"
                    src="/images/logo.svg"
                    width={60} height={60}
                    className=""
                  />
                </div>
                <div className="self-center">
                  <div className="h2 text-lg">Dubai Housing</div>
                  <div className="text-xs">Real Estate</div>
                </div>
              </div>
              <Link href="" target="_blank" className="text-[var(--instagram)] text-4xl"><FontAwesomeIcon icon={faInstagram} className="" /></Link>
            </div>
            {/* Instagram Videos */}
            <ShortClips InstVides={askRes.InstaVideo} />
          </div>

          {/* Table of Content */}
          <div className="mt-8 sticky top-16 mb-12">
            <div className="h2 text-2xl mb-5">Contents</div>
            <div className="border-r flex flex-col *:text-sm">
              <a href={`#${askData.hashUrl}`} title={askData.name} className="p-3 ">{askData.name}</a>
            </div>
          </div>
        </div>

        {/* Middle Section */}
        <div className="md:col-span-6 blog-middle">
          <article id={`#${askData.hashUrl}`} className="pt-16 article -mt-10">
            {askData.fulldesc && <TextComponent className="text-editor" itemObj={askData.fulldesc} />}
          </article>
        </div>

        <div className="md:col-span-3">
          <div className="sticky top-20">
            <SideProjectAds slideObj={askRes.commonads} />
          </div>
        </div>
      </section>

      {/* You might also like */}
      <section className="pb-16 pt-10">
        <div className="wrapper">
          <div className="h2 text-4xl mb-10">You might also like</div>
          <div className="flex gap-5 *:min-w-72 md:*:w-1/4 overflow-x-auto">
            {askRes.relatedpost.slice(0, 4).map(item => <div key={item.id}> <PostItem postItem={item} />{item.short_description = false}</div>)}
          </div>
        </div>
      </section>
    </main>
    <Footer whatsappMessage={askData.name} footerProject={result.footerproject} footerComm={result.footercomm} pageData={pagedata} staticInfo={result.staticpagedata} />
  </>
}
async function getSingleAskDetail(askurl) {
  const formData = new URLSearchParams();
  formData.append('askurl', askurl);
  formData.append('token1', process.env.token1);
  formData.append('token2', process.env.token2);
  const finalresult = await fetch(process.env.API_URL + 'ask-peoples/askInnerPage/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: formData,
  });
  return finalresult.json();
}