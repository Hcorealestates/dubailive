"use client"
import Link from "next/link";
import Fancybox from "./fancyBox";
import Image from "next/image";

export default function MasterPlan({ }) {
  return <>
    <Fancybox
      className="md:col-span-8"
    >
      <Link href='/images/location-map.webp' data-fancybox="masterPlan" className="cursor-zoom-in">
        <Image src='/images/location-map.webp' width={600} height={500} alt='' className="w-full md:rounded-lg rounded-t-lg min-h-full" />
      </Link>
    </Fancybox>
  </>
}