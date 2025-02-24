import Image from "next/image";
export default function DeveloperLogo({ developerLogo, className = 'w-auto h-14 max-w-full mx-auto' }) {
   return <>
      <Image src={developerLogo.devimage} width={150} height={56} alt={developerLogo.name} className={`${className} `} />
   </>
}