import Image from "next/image"
export default function BlogAuthor({ author }) {
   return <>
      <figure className="flex gap-3 items-center">
         <div className="size-14 border rounded-full border-primary/50  ring-4 ring-primary/30  hover:ring-primary/70 flex items-center justify-center">
            {author.authorimage && <Image src={author.authorimage} alt={author.authorname} width={56} height={56} className=" bg-white size-14 min-w-14 rounded-full hover:scale-90" title={author.authorname} />}
         </div>
         <figcaption className="text-left text-sm">
            <span className="block h2 text-base">{author.authorname}</span>
            <span className="block">{author.authorposition}</span>
            { /*author.authorname*/}
         </figcaption>
      </figure>
   </>
}