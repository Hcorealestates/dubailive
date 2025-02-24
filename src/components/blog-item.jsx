import Image from "next/image"
import Link from "next/link"
export default function BlogItem({ blogItem }) {
  return <>
    <Image src={blogItem.listingimage} width={350} height={420} className="w-full rounded-xl" alt={blogItem.name} />
    <figcaption className="py-3 px-4">
      <h6 className="text-xl font-serif mb-2">{blogItem.name}</h6>
      <Link href={blogItem.url} className="before:inset-0 before:absolute text-blue-500">Read More..</Link>
    </figcaption>
  </>
}