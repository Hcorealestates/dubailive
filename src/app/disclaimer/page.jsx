import getHomeCompleteData from "@/api/getHomeCompleteData";
import Footer from "@/components/footer";
import Header from "@/components/header";
import TextComponent from "@/components/TextComponent";

export default async function Disclaimer() {
  const props = getHomeCompleteData();
  const result = await props;
  const pagedata = result.pagedata;
  return <>
    <Header headerObj={pagedata} />
      <title>Disclaimer</title>
      <meta name="description" content='Disclaimer' />
      <meta name="robots" content="noindex, nofollow" />
      <link rel="canonical" href={pagedata.disclaimerurl} />
      <section className="wrapper py-12 min-h-[70vh] flex flex-col justify-center">
        <div className="text-3xl font-serif mb-4">Disclaimer</div>
        <TextComponent itemObj={result.staticpagedata.disclaimer} className="text-editor" />
      </section>
    <Footer footerProject={result.footerproject} footerComm={result.footercomm} pageData={pagedata} staticInfo={result.staticpagedata} />
  </>
}