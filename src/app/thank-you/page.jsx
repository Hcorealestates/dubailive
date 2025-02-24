import getHomeCompleteData from "@/api/getHomeCompleteData";
import Footer from "@/components/footer";
import Header from "@/components/header";
import { faThumbsUp } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default async function ThankYou() {
  const props = getHomeCompleteData();
  const result = await props;
  const pagedata = result.pagedata;
  return <>
    <Header headerObj={pagedata} />
    <section className="wrapper py-12 min-h-[75vh] flex flex-col justify-center items-center text-center">
      <FontAwesomeIcon className="text-3xl md:text-6xl lg:text-8xl text-primary/80" icon={faThumbsUp} />
      <div className="text-3xl md:text-6xl font-serif mb-4 uppercase mt-4 text-primary">Thank You</div>
      <div className="text-xl max-w-2xl">We at www.dubaihousing-ae.com would like to thank you for your interest in our services and contacting us.</div>
    </section>
    <Footer footerProject={result.footerproject} footerComm={result.footercomm} pageData={pagedata} staticInfo={result.staticpagedata} />
  </>
}