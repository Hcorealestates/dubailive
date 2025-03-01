"use client"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import Image from 'next/image';
import 'swiper/css';
import 'swiper/css/navigation';
import Modal from './Modal'
import { faDownload } from '@fortawesome/pro-regular-svg-icons'
import Link from 'next/link';
import Fancybox from './fancyBox';

export default function FloorPlan({ floorPlanObj, projectName }) {
  return <>
    <TabGroup className="mt-10">
      <TabList className="flex gap-2 justify-center overflow-auto pb-2">
        {floorPlanObj.map(({ unitName }) => (
          <Tab
            key={unitName}
            className="rounded-lg px-3 sm:px-4 py-2 sm:py-3 sm:text-xl font-semibold focus:outline-hidden data-selected:bg-primary/80 data-hover:bg-primary/50 data-selected:data-hover:bg-primary/80 data-focus:outline-1 data-selected:text-white data-focus:outline-primary border border-primary/20 flex gap-1 items-center text-nowrap"
          >{unitName}
          </Tab>
        ))}
      </TabList>
      <TabPanels className="mt-2 rounded-lg py-2">
        {floorPlanObj.map(({ unitName, unitDetails }) => (
          <TabPanel key={unitName} className="">
            <Fancybox
              options={{
                Carousel: {
                  infinite: false,
                },
              }}
            >
              <Swiper

                slidesPerView={1}
                spaceBetween={16}
                modules={[Navigation]}
                navigation={{ clickable: true }}
                className=""
              >
                {unitDetails.map(unit =>
                  <SwiperSlide tag='figure' key={unit.id}
                    className="flex! flex-col md:flex-row md:gap-6">
                    <Link data-fancybox="floorPlan" href={unit.floorImage} title={unit.floorName} className="border cursor-zoom-in bg-white grow">
                      <Image src={unit.floorImage} width={900} height={150} alt={unit.floorName} className="h-60 sm:h-96 lg:h-[550px] w-full p-4 object-cover object-top" />
                    </Link>
                    <figcaption className="sm:order-first flex flex-col sm:min-w-80 justify-center p-6 border bg-white">
                    <div className="text-xl mb-4 text-left">{unit.floorName}</div>
                      {unit.balconyArea || unit.suiteArea || unit.totalArea ? <ul className="flex flex-col divide-y *:flex *:justify-between *:py-2">
                        {unit.balconyArea ? <li>Balcony Area <span>{unit.balconyArea} Sq. Ft.</span></li> : null}
                        {unit.suiteArea ? <li>Suite Area <span>{unit.suiteArea} Sq. Ft.</span></li> : null}
                        {unit.totalArea ? <li>Total Area <span>{unit.totalArea} Sq. Ft.</span></li> : null}
                      </ul> : null}
                      <Modal className="mt-8 rounded-full" projectName={projectName}> Get All Floor Plan <FontAwesomeIcon icon={faDownload} /></Modal>
                    </figcaption>
                  </SwiperSlide>)}
              </Swiper>
            </Fancybox>
          </TabPanel>
        ))}
      </TabPanels>
    </TabGroup>
  </>
}