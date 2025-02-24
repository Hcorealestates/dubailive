import Image from "next/image";
import errorHome from "/public/images/error-home.webp"
import error404 from "/public/images/error-404.webp"
import Link from "next/link";
import getHomeCompleteData from "@/api/getHomeCompleteData";
import Footer from "@/components/footer";
import Header from "@/components/header";

export default async function NotFound() {
  const props = getHomeCompleteData();
  const result = await props;
  const pagedata = result.pagedata;
  return <>
    <Header headerObj={pagedata} />
    <title>Not Found</title>
    <div className="wrapper py-20 text-center">
      <Image src={errorHome} width={400} height={400} alt="404" className="mx-auto" />
      <Image src={error404} width={250} height={300} alt="404" className="mx-auto -mt-8" />
      <div className="text-3xl sm:text-4xl uppercase font-serif ">OOPS! PAGE NOT FOUND!</div>
      <div className="text-lg py-4 text-gray-600">The page you are looking for was moved, removed, renamed or might never existed.</div>
      <Link href="/" className=" inline-block px-4 py-3 bg-primary-900 text-white hover:bg-primary-700 rounded-full">Go Back Home</Link>
    </div>
    <Footer footerProject={result.footerproject} footerComm={result.footercomm} pageData={pagedata} staticInfo={result.staticpagedata} />
  </>
}