"use client";
import { useState, useEffect } from "react";
import { Link, Button, Element, Events, animateScroll as scroll, scrollSpy } from 'react-scroll';

export default function PostHashMenu({ navLink }) {
  const [activeId, setActiveId] = useState("");

  // useEffect is used to perform side effects in functional components.
  // Here, it's used to register scroll events and update scrollSpy when the component mounts.
  useEffect(() => {

    // Registering the 'begin' event and logging it to the console when triggered.
    Events.scrollEvent.register('begin', (to, element) => {
      // console.log('begin', to, element);
    });

    // Registering the 'end' event and logging it to the console when triggered.
    Events.scrollEvent.register('end', (to, element) => {
      // console.log('end', to, element);
    });

    // Updating scrollSpy when the component mounts.
    scrollSpy.update();

    // Returning a cleanup function to remove the registered events when the component unmounts.
    return () => {
      Events.scrollEvent.remove('begin');
      Events.scrollEvent.remove('end');
    };
  }, []);

  return <>

    {/* activeClass="active" 
      to="test1" 
      spy={true} 
      smooth={true} 
      offset={50} 
      duration={500} 
      onSetActive={handleSetActive} */}
    {navLink.map(navItem => <Link key={navItem.id} activeClass="active"
      to="test1"
      spy={true}
      smooth={true}
      offset={50}
      duration={500}
      // onSetActive={handleSetActive}
      href={`#${navItem.hashUrl}`} title={`${navItem.shortdesc}`} className={`p-3 ${activeId === navItem.id ? 'bg-primary/40' : ''}`}>{navItem.shortdesc}</Link>)}
  </>
}