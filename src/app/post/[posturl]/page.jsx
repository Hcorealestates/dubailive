export const revalidate = 5 * 60
import { notFound, redirect } from 'next/navigation';
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
import NotFound from "../../not-found";

export default async function PostSingle({ params }) {

  const formData = new URLSearchParams();
  formData.append('token1', process.env.token1);
  formData.append('token2', process.env.token2);
  formData.append('type', 'post');
  formData.append('url', params.posturl);
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
  const StaticPage = result.staticpagedata;

  const singleBlog = getSingleBlogDetail(params.posturl);
  const blogRes = await singleBlog;
  if (blogRes.message != 'success') {
    notFound();
  }
  const blogData = blogRes.singlepost;
  return <>
    <main>
      <title>{blogData.seotitle}</title>
      <meta name="description" content={blogData.seodesc} />
      <link rel="canonical" href={blogData.url} />
      <ProgressBar />
      {/* Top Ads */}
      <section className="bg-primary/15 py-6 lg:py-10">
        <figure className="wrapper">
          <a href={blogRes.blogads.url} target="_blank" className="block border border-primary">
            <Image src={blogRes.blogads.mobimg} priority className="block sm:hidden w-screen" width={400} height={300} alt={blogRes.blogads.alt} />
            <Image src={blogRes.blogads.img} className="hidden sm:block  w-screen" width={1294} height={334} alt={blogRes.blogads.alt} />
          </a>
        </figure>
      </section>
      <Header headerObj={pagedata} />

      <section className="px-4 py-3 sticky top-0 bg-black text-center text-xs md:text-base font-semibold text-white z-30">
        {StaticPage.clickme_heading} <Link href={StaticPage.clickme_url} className="link">Click Me!</Link>
      </section>

      <section className="wrapper text-center py-8 md:py-16">
        {/* Project Breadcrumb */}
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap gap-2 text-sm justify-center text-gray-500 mb-7">
            <li>
              <Link href={blogData.homeurl} className="link">Dubai Housing</Link>
            </li>
            <li><FontAwesomeIcon icon={faSlashForward} /></li>
            <li>
              <Link href={blogRes.blogurl} className="link">Posts</Link>
            </li>
            <li><FontAwesomeIcon icon={faSlashForward} /></li>
            <li aria-current="page">{blogData.name}</li>
          </ol>
        </nav>

        <div className="mb-6">
          <Link href={blogData.blogcaturl} className="border rounded-full inline-block py-1.5 px-3 text-sm bg-gray-200 hover:bg-gray-300">{blogData.blogcatname}</Link>
        </div>

        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl lg:text-5xl mb-4 md:mb-8">{blogData.name}</h1>
        </div>
        <div className="max-w-6xl mx-auto">
          <p className="text-lg md:text-2xl text-gray-600">{blogData.shortdesc}</p>
        </div>
        <div className="flex justify-center mt-10">
          <BlogAuthor author={{
            authorimage: blogData.authorimage,
            authorname: blogData.authorname,
            authorposition: 'Creative Content Writer'
          }} />
        </div>
      </section>

      {/* Left, Middle & Right slide */}
      <section className="wrapper grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-x-12 pb-16">
        <div className="md:col-span-3">
          {/* Instagram Section */}
          <div className="shadow-lg border border-black/10 rounded-lg">
            <div className="flex justify-between items-center px-2 py-2 relative">
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
            <ShortClips InstVides={blogRes.InstaVideo} />
          </div>

          {/* Table of Content */}
          <div className="mt-8 sticky top-16 mb-12">
            <div className="h2 text-2xl mb-5">Contents</div>
            <div className="border-r flex flex-col *:text-sm">
              <PostHashMenu navLink={blogRes.singlepostdesc} />
            </div>
          </div>
        </div>

        {/* Middle Section */}
        <div className="md:col-span-6 blog-middle">
          {blogData.bannerimage && <Image src={blogData.bannerimage} width={650} height={440} className="max-w-full rounded-lg block mb-6 w-full max-h-[450px] object-center object-cover" alt={blogData.name} />}
          {/* Top First Description */}
          {blogData.fulldesc && <TextComponent className="text-editor" itemObj={blogData.fulldesc} />}

          {/* Projects In Dubai For You to Pick: */}
          <div className="mt-8 bg-primary/5 p-7 rounded-lg border border-primary/10">
            <h3 className="text-2xl mb-6">Other Exclusive Projects In Dubai For You to Pick:</h3>
            <div className="flex gap-4 flex-wrap *:text-sm">
              {blogRes.ProponPost.map(single =>
                <Link className="bg-primary/50 no-underline! text-white! hover:bg-primary block px-3 py-2 rounded-full" href={single.url} target="_blank" key={single.id}>{single.name}</Link>
              )}
            </div>
          </div>

          {/* Article Section */}
          {blogRes.singlepostdesc.map(articleItem => <article key={articleItem.id} id={articleItem.hashUrl} className="pt-16 text-editor">
            <h2>{articleItem.shortdesc}</h2>
            {articleItem.headingBanner && <figure className="mb-4">
              <Image src={articleItem.headingBanner} alt={articleItem.shortdesc} title={articleItem.shortdesc} className="w-full md:h-96 rounded-lg" width={700} height={400} />
            </figure>}
            {articleItem.fulldesc && <TextComponent className="text-editor" itemObj={articleItem.fulldesc} />}
          </article>)}


          {/* Projects In Dubai For You to Pick: */}
          <div className="mt-8 bg-primary/5 p-7 rounded-lg border border-primary/10">
            <h3 className="text-2xl mb-6">Top Communities:</h3>
            <div className="flex gap-4 flex-wrap *:text-sm">
              {blogRes.CommonPost.map(single =>
                <Link className="bg-primary/50 no-underline! text-white! hover:bg-primary block px-3 py-2 rounded-full" href={single.url} target="_blank" key={single.id}>{single.name}</Link>
              )}
            </div>
          </div>

          {blogRes.postfaq && blogRes.postfaq.length > 0 && (
            <div className="faqs pt-10">
              <h2 className="text-2xl text-primary">Frequently Asked Questions (FAQs)</h2>
              {/* FAQs List */}
              <div className="flex flex-col divide-y">
                {blogRes.postfaq.map(faq =>
                  <div className="py-5" key={faq.id}>
                    <div className="question font-semibold before:content-['Q.'] flex gap-x-2 mb-1">{faq.question}</div>
                    <div className="answer before:content-['A.'] flex gap-x-2">
                      {faq.answer && <TextComponent itemObj={faq.answer} />}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
        <div className="md:col-span-3">
          <div className="sticky top-20">
            <SideProjectAds slideObj={adsSlides} />
          </div>
        </div>
      </section>

      {/* You might also like */}
      {blogRes.relatedpost.length > 0 &&
        <section className="pb-16 pt-10">
          <div className="wrapper">
            <div className="h2 text-4xl mb-10">You might also like</div>
            <div className="flex gap-5 *:min-w-72 md:*:w-1/4 overflow-x-auto">
              {blogRes.relatedpost.slice(0, 4).map(item => <div key={item.id}> <PostItem postItem={item} />{item.short_description = false}</div>)}
            </div>
          </div>
        </section>
      }
    </main>
    <Footer whatsappMessage={blogData.name} footerProject={result.footerproject} footerComm={result.footercomm} pageData={pagedata} staticInfo={result.staticpagedata} />
  </>
}
async function getSingleBlogDetail(posturl) {
  const formData = new URLSearchParams();
  formData.append('blogurl', posturl);
  formData.append('token1', process.env.token1);
  formData.append('token2', process.env.token2);
  const finalresult = await fetch(process.env.API_URL + 'blogs/blogInnerPage/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: formData,
  });
  return finalresult.json();
}