import Image, { getImageProps } from 'next/image'

export default function ProjectBanner({mainbannerimage,mainbanneralt,mobilebannerimage }){

    const common = { alt: mainbanneralt, sizes: '100vw' }
    const {
        props: { srcSet: desktop },
    } = getImageProps({
        ...common,
        width: 1440,
        height: 875,
        quality: 80,
        src: mainbannerimage,
    })
    const {
        props: { srcSet: mobile, ...rest },
    } = getImageProps({
        ...common,
        width: 639,
        height: 534,
        quality: 70,
        src: mobilebannerimage,
    })

    return <>
        <picture>
            <source media="(min-width: 640px)" srcSet={desktop} />
            <source media="(min-width: 639px)" srcSet={mobile} />
            <img {...rest} className="w-full h-auto sm:min-h-[650px] object-cover object-bottom" alt="mainbanneralt" />
         </picture>
    </>
}