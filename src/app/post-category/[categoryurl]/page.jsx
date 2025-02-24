import Footer from "@/components/footer";
import Header from "@/components/header";
import getHomeCompleteData from "@/api/getHomeCompleteData";
import TextComponent from "@/components/TextComponent";
import CommonSearch from "@/components/common-search";
import BlogByCatListing from "@/components/BlogByCatListing";
import NotFound from "../../not-found";

export default async function PostCategory({ params }) {
  const props = getHomeCompleteData();
  const result = await props;
  const pagedata = result.pagedata;
  const StaticPage = result.staticpagedata;


  const singleBlogCat = getSingleBlogCatDetail(params.categoryurl);
  const blogCatRes = await singleBlogCat;
  const blogCatData = blogCatRes.blogCatdata;

  return <>
    <Header headerObj={pagedata} />
      {blogCatRes.message == 'success' ?
        <>
          <title>{blogCatData.seotitle}</title>
          <meta name="description" content={blogCatData.seodesc} />
          <link rel="canonical" href={blogCatData.url} />
          <main>
            <section className="wrapper pb-16">
              <h3 className="text-2xl lg:text-[3vw] leading-tight py-6"><TextComponent itemObj={StaticPage.blogcat_listingheading} /></h3>
              <BlogByCatListing CatId={blogCatData.id} />
            </section>
          </main>
          </>
        : <NotFound />
      }
    <Footer footerProject={result.footerproject} footerComm={result.footercomm} pageData={pagedata} staticInfo={result.staticpagedata} />
  </>;
}

async function getSingleBlogCatDetail(postcaturl) {
  const formData = new URLSearchParams();
  formData.append('blogcaturl', postcaturl);
  formData.append('token1', process.env.token1);
  formData.append('token2', process.env.token2);
  const finalresult = await fetch(process.env.API_URL + 'blog-categories/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: formData,
  });
  return finalresult.json();
}