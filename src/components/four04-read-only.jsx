"use client";
import Image from 'next/image';
import { useEffect } from 'react'

export default function Four04ReadOnly() {
  useEffect(() => {
    const allEl = document.querySelectorAll('nav, section, footer');
    allEl.forEach(element => {
      element.style.position = 'absolute';
      element.style.width = '1px';
      element.style.height = '1px';
      element.style.padding = '0px';
      element.style.margin = '-1px';
      element.style.overflow = 'hidden';
      element.style.clip = 'rect(0,0,0,0)';
      element.style.whiteSpace = 'nowrap';
      element.style.borderWidth = '0px';
    });

  }, [])
  return <>
    <div className="h-screen w-full fixed top-0 left-0 bg-white z-10000 flex items-center justify-center max-h-screen overflow-hidden px-6">
      <Image src="/images/unknown-bg.svg" className="max-w-full sm:w-130 md:w-160" width={320} height={70} priority alt='Unknown Image' />
    </div>
  </>
}