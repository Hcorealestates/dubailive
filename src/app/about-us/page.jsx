import getHomeCompleteData from "@/api/getHomeCompleteData";
import Footer from "@/components/footer";
import Header from "@/components/header";
import { faCheck, faSlashForward } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import { missionVissionData } from "../../../data/data";
import TailwindAccordion from "@/components/tailwind-accordion";
import Modal from "@/components/Modal";
import TextComponent from "@/components/TextComponent";
import NotFound from "../not-found";

export default async function AboutUs() {
	const props = getHomeCompleteData();
	const result = await props;
	const pagedata = result.pagedata;
	const aboutusdata = getAboutUsPageDetails();
	const resultAbout = await aboutusdata;
	const aboutData = resultAbout.aboutdetails;
	return <>
		<Header headerObj={pagedata} />
		{resultAbout.message == 'success' ?
			<main>
				<title>{aboutData.seotitle}</title>
				<meta name="description" content={aboutData.seodesc} />
				<link rel="canonical" href={aboutData.url} />
				{/* Banner Section */}
				<section className="relative">
					<Image src="/images/about.avif" width={1550} height={750} className="none sm:block w-full md:min-h-100 min-h-60" alt="About Us Main Banner" />
					<div className="absolute z-10 inset-0 flex flex-col justify-end sm:justify-center">
						<div className="mx-auto md:max-w-2xl bg-white/60 p-6 md:p-10 sm:rounded-md">
							<small className="block text-sm uppercase   text-center mb-4">Crafting A Wonderful Experience For Our Prospective Clients </small>
							<h1 className="text-2xl md:text-4xl lg:text-5xl text-center font-semibold font-serif text-gray-800">Embarking On Our Real Estate Journey From Over 2 Decades</h1>
						</div>
					</div>
				</section>


				<section className="wrapper">
					{/* Breadcrumb Section */}
					<nav className="py-6" aria-label="Breadcrumb">
						<ol className="flex gap-2 text-sm text-gray-500">
							<li>
								<Link href={aboutData.homeurl} className="link">Dubai Housing</Link>
							</li>
							<li><FontAwesomeIcon icon={faSlashForward} /></li>
							<li aria-current="page">About Us</li>
						</ol>
					</nav>

					<div className="mx-auto max-w-6xl pt-8 md:py-30">
						<div className="md:text-center relative before:absolute before:w-0.5 before:h-16 before:bg-primary before:block md:before:-top-1/2 md:before:left-1/2 md:before:-translate-x-1/2">
							<small className="block text-xs md:text-sm uppercase mb-2 px-4">Welcome to Dubai Housing</small>
							<h2 className="text-2xl md:text-4xl mb-6  px-4 max-w-3xl md:mx-auto">Step Into The Sumptuous World Of Aristocratic Properties</h2>
							<div className="text-xl">Showcasing A Wide Array Of Real Estate Creations That Are Further Segregated Into Exquisite Niches, Namely Mansions, Townhouses, Penthouses, Villas, Duplexes, Apartments, And Studios Along With Offering Personalized Guidance To Our Interested Clients Is Our Forte. This Results In Making Our Clients, A Part Of Lucrative Investment Opportunities. As Investors Analyse Grand Options, With Regard To Exploring Exotic Skylines Of Downtown Dubai, Waterfront As Well As Beachstyle Living, And Many Other Exquisite Styles, All Crafted With Cutting-Edge Technology And Filled With Magnificent Amenities And Services.
							</div>
						</div>
					</div>
				</section>

				{/* Our story */}
				<section className="wrapper">
					<div className="pt-8 grid lg:grid-cols-5 lg:gap-10 gap-6">
						<div className="col-span-1 lg:col-span-2">
							<div className="relative">
								<Image src="/images/overview.webp" width={400} height={600} alt="" className="w-full rounded-lg" />
							</div>
						</div>
						<div className="col-span-1 lg:col-span-3 feature">
							<h3 className="text-4xl mb-6"><small className="block text-sm uppercase">Our Heritage</small> Dubai Housing</h3>
							<TextComponent itemObj={aboutData.overview} className="text-editor lg:text-lg space-y-6" />

							{/* <ul className="pt-4 flex flex-col *:text-base">
								<li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda, laudantium.</li>
								<li>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Inventore.</li>
								<li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente, quidem?</li>
								<li>Lorem ipsum dolor sit amet consectetur.</li>
								<li>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quasi, magni consequuntur.</li>
							</ul> */}
						</div>
					</div>
				</section>

				{/* Our Details */}
				<section className="wrapper pt-20">
					<h3 className="text-left md:text-center  text-2xl md:text-3xl py-8">Our Accomplishments</h3>
					<div className="grid md:grid-cols-4 gap-6">
						{/* Item  */}
						<div className="border p-6 rounded-lg">
							<div className="flex gap-x-6 justify-between mb-6">
								<div className="text-sm font-bold">
									<span className="block text-4xl text-primary">20+</span>
									Years Of Expertise
								</div>
								<Image src="/images/about-icon/years-of-expertise.svg" width={45} height={45} alt="" className=" self-start" />
							</div>
							<div className="">Showcasing Our Excellence, Catering To Every Kind Of Need And Want Of Our Clientele</div>
						</div>
						{/* Item  */}
						<div className="border p-6 rounded-lg">
							<div className="flex gap-x-6 justify-between mb-6">
								<div className="text-sm font-bold">
									<span className="block text-4xl text-primary">50+</span>
									Awards And Recognitions
								</div>
								<Image src="/images/about-icon/awards.svg" width={45} height={45} alt="" className=" self-start" />
							</div>
							<div className="">Attaining Highly Acclaimed Rewards In Real Estate Of Dubai, Gaining Global Acknowledgement
							</div>
						</div>
						{/* Item  */}
						<div className="border p-6 rounded-lg">
							<div className="flex gap-x-6 justify-between mb-6">
								<div className="text-sm font-bold">
									<span className="block text-4xl text-primary">50+</span>
									Affiliated Developers
								</div>
								<Image src="/images/about-icon/affiliated-developers.svg" width={45} height={45} alt="" className=" self-start" />
							</div>
							<div className="">Collaboration With High-End Real Estate Developers, Enhancing Our Credibility In Dubai&apos;s Market
							</div>
						</div>
						<div className="border p-6 rounded-lg">
							<div className="flex gap-x-6 justify-between mb-6">
								<div className="text-sm font-bold">
									<span className="block text-4xl text-primary">1000+</span>
									Gratified Clients
								</div>
								<Image src="/images/about-icon/gratified-clients.svg" width={45} height={45} alt="" className=" self-start" />
							</div>
							<div className="">Ensuing Our Motive Of Making Our Client&apos;s Dreams Come True
							</div>
						</div>
					</div>
				</section>

				{/* Team Section */}
				<section className="wrapper text-center pt-16 md:pt-28">
					<h3 className="h2 text-2xl md:text-4xl mb-3">Our Team of Experienced Realtors</h3>
					<div className="text-editor md:max-w-5xl mx-auto  md:*:text-center!">
						<p>Specializing In The Real Estate Sector For More Than 20 Years, Our Experts Provide Best Solutions As They Address Your Requirements In A Very Individualized Manner. Identifying The Needs And Acting Accordingly Is The Top Priority Of Our Investors Which Makes Them Unique And Highly Credible Among Potential Investors And Home Buyers.
						</p>
					</div>
					<Image src="/images/arrow.png" width={93} height={72} className="mx-auto inline-block mt-3" alt="Arrow" />

					<div className="mt-8 grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 md:gap-12">
						{/* Member */}
						{resultAbout.team.map((team, i) => <figure key={i} className="bg-primary/10 pt-8 rounded-t-xl mb-10">
							<Image src={team.image} width={210} quality={100} height={210} className="mx-auto" alt={team.name} />
							<figcaption className="bg-white p-2 space-y-1">
								<div className="font-serif text-xl">{team.name}</div>
								<div className="text-gray-700">{team.description}</div>
							</figcaption>
						</figure>)}
					</div>
				</section>

				{/* Award Section */}
				<section className="mt-20 md:py-10 relative bg-primary/5">
					<div className="absolute top-0 left-0 max-w-12 md:max-w-20">
						<Image src="/images/tree-leave.svg" width={83} height={173} alt="tree-leave" />
					</div>
					<div className="wrapper py-28 text-center">
						<div className="mx-auto max-w-4xl">
							<h2 className="text-3xl mb-2">Renowned Recognitions Gained By Dubai Housing</h2>
							<p className="mb-8">Commencing Forward Victoriously Makes Dubai Housing A Trusted Channel Partner For Significant Developers Of Dubai And Potential Investors. Our Rewards Are The Proof Of Our Authentic And Credible Practices, Making Dubai Housing A Promising Choice For Investors.</p>
						</div>
						<div className="grid md:grid-cols-4 gap-8">
							{resultAbout.award.map((item, i) => <figure key={i} className="border border-primary-700/30 bg-white rounded-lg p-6 pb-0">
								<Image src={item.image} width={150} quality={100} height={150} className="mx-auto" alt={item.name} />
								<figcaption className="p-4">{item.name}</figcaption>
							</figure>)}
						</div>
					</div>
				</section>


				{/* Mission & Vission */}
				<section className="py-10 md:py-28">
					<div className="wrapper">
						<h3 className="md:text-3xl text-2xl text-left md:text-center mb-3">Find Answers To All Your Questions With Honey Money Real Estates Our Team</h3>
						<div className="text-editor mb-8 md:*:text-center!">
							<p>We Are A Team Of Highly Qualified Experts In Real Estate Market, Offering Amazing Solutions In A Simple Manner.</p>
						</div>
						<div className="grid md:grid-cols-3 gap-8">
							{missionVissionData.map((solution, i) => <div key={i} className="border p-5 rounded-lg">
								<h5 className="text-xl mb-3 text-primary border-b">{solution.heading}</h5>
								<div className="">{solution.description}</div>
							</div>)}
						</div>
					</div>
				</section>

				<section className="bg-primary/10 py-20">
					<div className="wrapper grid md:grid-cols-2 gap-10">
						{/* Left Side */}
						<div className="">
							<small>FAQ</small>
							<div className="h2 text-2xl md:text-4xl">Having Queries? We Are There To Resolve Them!!</div>
						</div>
						{/* Accordion Right */}
						<div className="flex flex-col gap-4">
							{resultAbout.aboutFaq.map((faq, i) => <TailwindAccordion key={i} faqItem={faq} />)}
						</div>
					</div>

					{/* Ask Question Section */}
					<div className="wrapper">
						<figure className="bg-white rounded-xl mt-16 flex flex-wrap md:flex-nowrap justify-between gap-10">
							<div className=""><Image src="/images/question.svg" width={500} height={250} alt="" /></div>
							<figcaption className="flex flex-col justify-center p-6 md:12 max-w-lg">
								<div className="h2 text-2xl md:text-3xl mb-4">Wondering Where To Ask Questions?</div>
								<div className=" mb-8">No Need To Fret, Our Expert Advisors Are There To Guide You!!</div>
								<Modal className=" self-start" projectName="Dubai Housing">Ask Any Questions</Modal>
							</figcaption>
						</figure>
					</div>
				</section>
			</main>
			: <NotFound />
		}
		<Footer footerProject={result.footerproject} footerComm={result.footercomm} pageData={pagedata} staticInfo={result.staticpagedata} />
	</>
}

async function getAboutUsPageDetails() {
	const formData = new URLSearchParams();
	formData.append('token1', process.env.token1);
	formData.append('token2', process.env.token2);
	const finalresult = await fetch(process.env.API_URL + 'pages/aboutUsPage/', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
		},
		body: formData,
	});
	return finalresult.json();
}