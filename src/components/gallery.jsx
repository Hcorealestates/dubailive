"use client";
import Link from "next/link";
import Image from "next/image";
import Fancybox from "./fancyBox";

export default function GalleryImage({ galleryObj }) {
  return <Fancybox
    options={{
      Carousel: {
        infinite: false,
      },
    }}
    className="grid sm:grid-cols-2 gap-6"
  >
    {galleryObj.map(gallery => <figure key={gallery.id}>
      <Link href={gallery.image} title={gallery.alt} data-fancybox="galleries" className="cursor-zoom-in">
        <Image src={gallery.image} width={600} height={500} alt={gallery.alt} className="w-full sm:h-60 lg:h-80 object-cover rounded-xl" />
      </Link>
    </figure>)}
  </Fancybox>
}