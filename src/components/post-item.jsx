import Image from "next/image"
import Link from "next/link"
import BlogAuthor from "./blog-author"
export default function PostItem({ postItem }) {
  // const shorDes = 
  return <>
    <figure className="relative group">
      {/* Blog Image */}
      <div className="relative">
        <Image src={postItem.listingimage} width={408} height={462} className="w-full xl:max-w-100 rounded-2xl object-cover object-left-top transition-all group-hover:-translate-y-3 h-80" alt={postItem.name} />
        <div className="absolute bottom-2 left-5 z-20 flex pl-1 overflow-hidden group-hover:-translate-y-3 transition-all py-1 max-w-16">
          <BlogAuthor author={postItem} />
        </div>
      </div>
      <figcaption className="py-3 px-4">
        <div className="flex mb-3 mt-1">
          {/* Blog Category */}
          <Link href={postItem.caturl} className="border rounded-full inline-block py-1.5 px-3 text-sm relative z-20 bg-gray-200 hover:bg-gray-300">{postItem.catname}</Link>

        </div>
        {/*  */}
        <h3 className="font-serif mb-2 text-lg md:text-xl"><Link href={postItem.url} className="group-hover:text-primary group-hover:underline after:inset-0 after:absolute after:z-10">{postItem.name}</Link></h3>
        {/* Blog paragraph */}
        {postItem.shortdesc && <p>{postItem.shortdesc.split(" ").slice(postItem.shortdesc, 15).join(" ") + '...'}</p>}
      </figcaption>
    </figure>
  </>
}