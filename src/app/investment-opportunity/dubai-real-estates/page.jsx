import getHomeCompleteData from "@/api/getHomeCompleteData";
import Footer from "@/components/footer";
import Header from "@/components/header";
import Modal from "@/components/Modal";
import WhyHotProjectSlider from "@/components/why-hot-project-slider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from '@fortawesome/fontawesome-svg-core'
import { far, fas } from '@awesome.me/kit-d4fc302733/icons'
import { whyApartments, apartmentCategory, villasCategory } from "../../../../data/chart-data";
import TextComponent from "@/components/TextComponent";

library.add(far, fas)
import Image from "next/image";
import BarCharts from "@/components/bar-charts";
import PieCharts from "@/components/pie-charts";
// import ProjectItem from "@/components/project-item";
import SideProjectAds from "@/components/side-project-ads";
import NotFound from "../../not-found";

export default async function WhyInvestInDubai() {
  const props = getHomeCompleteData();
  const result = await props;
  const pagedata = result.pagedata;


  const singleInvest = getSingleInvestmentetail();
  const investRes = await singleInvest;
  const InvestData = investRes.investDetails;

  return <>

    <Header headerObj={pagedata} />
    {investRes.message == 'success' ?
      <main>
        <title>{InvestData.seotitle}</title>
        <meta name="description" content={InvestData.seodesc} />
        <link rel="canonical" href={InvestData.url} />
        <section className="relative bg-linear-to-b from-primary/20">
          <div className="absolute bottom-0 left-0 -z-1 max-w-[30vw]">
            <Image src={InvestData.teftimg} className="md:w-full" alt="Left Building" width={330} height={330} />
          </div>
          <div className="absolute bottom-0 right-0 -z-1 max-w-[30vw]">
            <Image src={InvestData.rightimg} className="md:w-full" alt="Right Building" width={330} height={330} />
          </div>
          <div className="wrapper text-center py-16 flex flex-col justify-center md:min-h-[500px] h-[75vh] max-h-[650px]">
            <div className="max-w-2xl mx-auto">
              <h1 className="text-3xl md:text-5xl mb-3">{InvestData.name}</h1>
              <p className="mb-6 text-lg">{InvestData.shortdesc}</p>
              <Modal className="rounded-full" projectName={InvestData.name}>Enquire Now</Modal>
            </div>
          </div>
        </section>

        <section className="wrapper py-10">
          <div className="h2 text-center text-2xl md:text-4xl pb-5">Hot Projects</div>
          <WhyHotProjectSlider topProject={InvestData.selectedProject} />
        </section>


        <section className="wrapper py-10 text-center">
          <h3 className="md:text-4xl text-2xl mb-3">{InvestData.secondhead}</h3>
          <p className="max-w-3xl mx-auto mb-6">{InvestData.seconddesc}</p>
          {investRes.highlights.length > 0 &&
            <ul className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {investRes.highlights.map(items =>
                <li className="border border-primary/20 bg-primary/10 p-6 rounded-lg" key={items.id}>
                  <FontAwesomeIcon icon={`fa-regular ${items.iconId}`} className="text-4xl text-primary/80" />
                  <h4 className="text-xl mb-4 mt-2">{items.heading}</h4>
                  <p className="">{items.description}</p>
                </li>
              )}
            </ul>
          }
        </section>


        <section className="wrapper py-10">
          <h3 className="text-3xl mb-4">{InvestData.thirdhead}</h3>
          <p className="mb-6">{InvestData.thirddesc}</p>
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="border p-4">
              <div className="font-serif text-2xl mb-4">Top 5 performing location (Sales volume) <small className="block text-primary">Apartments</small></div>
              <div className="text-xs capitalize">
                <BarCharts chartData={whyApartments} />
              </div>
              {/* Data taken from Where  */}
              <div className="flex gap-4 justify-between text-xs border-t pt-2">
                <span>Data from dxbinteract</span>
                <span>December 2023</span>
              </div>
            </div>
            <div className="border p-4">
              <div className="font-serif text-2xl mb-4">Top 5 performing location (Sales volume) <small className="block text-primary">Villas</small></div>
              <div className="text-xs capitalize">
                <BarCharts chartData={whyApartments} />
              </div>
              {/* Data taken from Where  */}
              <div className="flex gap-4 justify-between text-xs border-t pt-2">
                <span>Data from dxbinteract</span>
                <span>December 2023</span>
              </div>
            </div>
          </div>

          <div className="py-10">
            <div className="h2 text-3xl mb-3">Increase in Rental Prices</div>
            <div className="flex flex-col md:flex-row gap-6">
              <div className="bg-primary/10 p-6 rounded-md grow relative">
                <div className="flex border-b border-primary/20 items-center text-2xl gap-6 pb-2 mb-3"><FontAwesomeIcon icon="fa-regular fa-building-memo" />
                  <div>AED 69K <span className="block text-sm">Apartments</span></div>
                </div>
                <div className="text-center *:text-xl *:text-primary"><FontAwesomeIcon icon="fa-solid fa-arrow-up" /> 20% vs. Dec, 2023</div>
                <div className="absolute text-sm left-0 -bottom-8">Data form dxbinteract</div>
              </div>
              <div className="bg-primary/10 p-6 rounded-md grow relative">
                <div className="flex border-b border-primary/20 items-center text-2xl gap-6 pb-2 mb-3"><FontAwesomeIcon icon="fa-regular fa-building-memo" />
                  <div>AED 69K <span className="block text-sm">Apartments</span></div>
                </div>
                <div className="text-center *:text-xl *:text-primary"><FontAwesomeIcon icon="fa-solid fa-arrow-up" /> 20% vs. Dec, 2023</div>
                <div className="absolute text-sm left-0 -bottom-8">Data form dxbinteract</div>
              </div>
            </div>
          </div>

          <div className="pt-20 grid gap-8 lg:grid-cols-2">
            <div className="border p-4">
              <div className="font-serif text-2xl mb-4">Dubai property sales value by category</div>
              <PieCharts chartData={apartmentCategory} />
              {/* Data taken from Where  */}
              <div className="flex gap-4 justify-between text-xs border-t pt-2">
                <span>Data from dxbinteract</span>
                <span>December 2023</span>
              </div>
            </div>
            <div className="border p-4">
              <div className="font-serif text-2xl mb-4">Dubai property sales value by category</div>
              <PieCharts chartData={villasCategory} />
              {/* Data taken from Where  */}
              <div className="flex gap-4 justify-between text-xs border-t pt-2">
                <span>Data from dxbinteract</span>
                <span>December 2023</span>
              </div>
            </div>
          </div>
        </section>

        <section className="wrapper py-10">
          <div className="grid gap-8 md:grid-cols-2">
            <div className="border p-6">
              {InvestData.foura && <TextComponent itemObj={InvestData.foura} />}
            </div>
            <div className="border p-6">
              {InvestData.fourb && <TextComponent itemObj={InvestData.fourb} />}
            </div>
          </div>
        </section>

        <section className="wrapper py-16">
          <div className="grid grid-cols-1 gap-10 lg:gap-16 sm:grid-cols-12">
            <div className="lg:col-span-9 md:col-span-7 sm:col-span-6">
              <div className="text-editor">
                {InvestData.last && <TextComponent itemObj={InvestData.last} />}
              </div>
            </div>
            <div className="lg:col-span-3 md:col-span-5  sm:col-span-6">
              <div className="">
                <SideProjectAds slideObj={investRes.commonads} />
              </div>
            </div>
          </div>
        </section>
      </main>
      : <NotFound />
    }
    <Footer whatsappMessage={InvestData.name} footerProject={result.footerproject} footerComm={result.footercomm} pageData={pagedata} staticInfo={result.staticpagedata} />
  </>
}

async function getSingleInvestmentetail() {
  const formData = new URLSearchParams();
  formData.append('investurl', 'dubai-real-estates');
  formData.append('token1', process.env.token1);
  formData.append('token2', process.env.token2);
  const finalresult = await fetch(process.env.API_URL + 'InvestmentOpportunities/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: formData,
  });
  return finalresult.json();
}