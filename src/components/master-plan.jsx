"use client"
import Link from "next/link";
import Fancybox from "./fancyBox";
import Image from "next/image";

export default function MasterPlan({ masterImg, alt }) {
  return <>
    <Fancybox
      className="md:col-span-8"
    >
      <Link href={masterImg} data-fancybox="masterPlan" className="cursor-zoom-in">
        <Image src={masterImg} width={600} height={500} alt={alt} className="w-full md:rounded-lg rounded-t-lg min-h-full" />
      </Link>
    </Fancybox>
  </>
}