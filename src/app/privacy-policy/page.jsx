import getHomeCompleteData from "@/api/getHomeCompleteData";
import Footer from "@/components/footer";
import Header from "@/components/header";
import TextComponent from "@/components/TextComponent";

export default async function PrivacyPolicy() {
  const props = getHomeCompleteData();
  const result = await props;
  const pagedata = result.pagedata;
  return <>
    <Header headerObj={pagedata} />
      <title>Privacy Policy</title>
      <meta name="description" content='Privacy Policy' />
      <meta name="robots" content="noindex, nofollow" />
      <link rel="canonical" href={pagedata.ppolicyurl} />
      <section className="wrapper py-12 min-h-[70vh] flex flex-col justify-center">
        <div className="text-3xl font-serif mb-4">Privacy Policy</div>
        <TextComponent itemObj={result.staticpagedata.privacy_policy} className="text-editor" />
      </section>
    <Footer footerProject={result.footerproject} footerComm={result.footercomm} pageData={pagedata} staticInfo={result.staticpagedata} />
  </>
}