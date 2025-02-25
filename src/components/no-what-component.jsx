import Image from "next/image";
import noWhatImg from "/public/images/footer-illustration.png";
import ArrowLink from "./arrow-button";
import Link from "next/link";


export default function NoWhatComponent({ whatContent = false, whatImage = false, whatUrl = false, buttonText = false }) {
  return <>
    <section className="relative bg-white pt-16 md:pt-26">
      <Image src={whatImage} width={1400} height={600} className="w-full min-h-80 object-cover object-bottom" alt={buttonText} />
      <div className="absolute left-0 top-0 flex justify-center w-full">
        <div className="bg-white p-8 lg:pt-16 text-center rounded-full max-w-2xl">
          <div className="h2 text-3xl md:text-6xl text-primary">Not What</div>
          <div className="h2 py-3 text-xl lg:text-2xl">YOU ARE LOOKING FOR?</div>
          <p className="text-xl">{whatContent}</p>
          <div className="mt-6">
            <Link href={whatUrl} className="btn btn-primary px-4">{buttonText}</Link>
          </div>
        </div>
      </div>
    </section>
  </>
}