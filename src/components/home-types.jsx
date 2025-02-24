"use client"
import Image from "next/image";
import Link from "next/link";
export default function HomeTypes({ typeObject }) {
  return <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
    {typeObject.map(type => <figure key={type.id} className="border rounded-xl p-8 relative text-center hover:bg-primary/[.05] transition ">
      <Image src={type.typeImg} width={96} height={96} className="h-24 w-auto mx-auto" alt={type.typeName} title={type.typeName} />
      <figcaption>
        <h4 className="text-xl my-3">{type.typeName}</h4>
        <p className="mb-4">{type.descrip}</p>
        <Link href={type.typeUrl} className="bg-primary hover:bg-white border-2 border-primary focus:outline-hidden text-white hover:text-primary font-semibold h-12 px-6  flex items-center justify-center rounded-lg before:absolute before:inset-0 shadow-sm shadow-primary">Discover More</Link>
      </figcaption>
    </figure>)}
  </div>
}