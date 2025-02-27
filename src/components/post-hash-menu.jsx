"use client";
import { useEffect } from "react";
import { Link, Events, scrollSpy } from 'react-scroll';

export default function PostHashMenu({ navLink }) {
  useEffect(() => {
    scrollSpy.update();
    return () => {
      Events.scrollEvent.remove('begin');
      Events.scrollEvent.remove('end');
    };
  }, []);
  return <>
    {navLink.map(navItem => <Link key={navItem.id} activeClass="bg-primary/10 font-semibold text-primary"
      to={navItem.hashUrl}
      spy={true}
      smooth={true}
      offset={-50}
      duration={10}
      href={`#${navItem.hashUrl}`} title={`${navItem.shortdesc}`} className="p-3">{navItem.shortdesc}</Link>)}
  </>
}