"use client";
import { useState, useEffect } from "react";
import { Link, Button, Element, Events, animateScroll as scroll, scrollSpy } from 'react-scroll';

export default function PostHashMenu({ navLink }) {
  const [activeId, setActiveId] = useState("");
  useEffect(() => {
    Events.scrollEvent.register('begin', (to, element) => {
    });

    
    Events.scrollEvent.register('end', (to, element) => {
    });

    
    scrollSpy.update();
    return () => {
      Events.scrollEvent.remove('begin');
      Events.scrollEvent.remove('end');
    };
  }, []);

  return <>
    {navLink.map(navItem => <Link key={navItem.id} activeClass="active"
      to="test1"
      spy={true}
      smooth={true}
      offset={50}
      duration={500}
      href={`#${navItem.hashUrl}`} title={`${navItem.shortdesc}`} className={`p-3 ${activeId === navItem.id ? 'bg-primary/40' : ''}`}>{navItem.shortdesc}</Link>)}
  </>
}