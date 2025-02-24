import CommonSearch from "./common-search";
export default function BannerGradient({ children }) {
  return <>
    <div className="left-0 top-0 absolute w-full min-h-full z-10 flex flex-col justify-end items-center bg-linear-to-b from-black/10 to-black/90  px-6">
      {children}
    </div>
  </>
}