
import getHomeCompleteData from "@/api/getHomeCompleteData";
import Footer from "@/components/footer";
import FormCommon from "@/components/form-common";
import Header from "@/components/header";
import { faEnvelope, faLocationDot, faPhone, faThumbsUp } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TextComponent from "@/components/TextComponent";

export default async function ContactUs() {
  const props = getHomeCompleteData();
  const result = await props;
  const pagedata = result.pagedata;
  const staticInfo = result.staticpagedata;

  return <>
    <Header headerObj={pagedata} />
    <title>Contact Us</title>
    <meta name="description" content='Contact Us' />
    <link rel="canonical" href={pagedata.contacturl} />
    <section className="wrapper py-10 md:py-25 min-h-[75vh] grid md:grid-cols-2 gap-8 md:gap-12">
      <div className="border rounded-2xl p-8">
        <h1 className="text-2xl md:text-3xl mb-3">Contact Us</h1>
        <TextComponent itemObj={staticInfo.contactus} />
        {/* contact info */}
        <div className="border-t mt-5 flex flex-col divide-y">
          {staticInfo.address && <div className="pl-10 py-4">
            <FontAwesomeIcon className="text-2xl -ml-10 float-left mt-2 text-gray-500" icon={faLocationDot} />
            <span className="block text-gray-500 text-xl">Address </span>{staticInfo.address}
          </div>}
          {staticInfo.callnumberstatic && <div className="pl-10 py-4 relative text-editor">
            <FontAwesomeIcon className="text-2xl -ml-10 float-left mt-2 text-gray-500" icon={faPhone} />
            <span className="block text-gray-500 text-xl">Phone </span> <a href={`tel:+${staticInfo.callnumberstatic.split(' ').join('')}`}>{`+${staticInfo.callnumberstatic}`}</a>
          </div>}
          {staticInfo.email && <div className="pl-10 pt-4 relative text-editor">
            <FontAwesomeIcon className="text-2xl -ml-10 float-left mt-2 text-gray-500" icon={faEnvelope} />
            <span className="block text-gray-500 text-xl">Email </span> <a href={`mailto:${staticInfo.email}`}>{staticInfo.email}</a>
          </div>}
        </div>
      </div>
      <div className="border rounded-2xl p-8">
        <div className="h2 text-center text-xl md:text-2xl mb-4">EXPRESS YOUR INTEREST!</div>
        <FormCommon projectName="Dubai Housing" />
      </div >
    </section >
    <Footer footerProject={result.footerproject} footerComm={result.footercomm} pageData={pagedata} staticInfo={result.staticpagedata} />
  </>
}
