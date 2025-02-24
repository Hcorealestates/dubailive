"use client"
import { useState, useEffect } from "react";
export default function ProgressBar() {
  const [scrollProgress, setScrollProgress] = useState(0);
  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - (window.innerHeight + 450);
      const progress = (scrollTop / docHeight) * 100;
      setScrollProgress(progress);
    };
    // Attach the scroll event listener
    window.addEventListener("scroll", updateScrollProgress);
    // Clean up the event listener
    return () => window.removeEventListener("scroll", updateScrollProgress);
  }, []);
  return <>
    <div className="fixed top-0 z-50 left-0 h-1 bg-primary-600"
      style={{ width: `${scrollProgress}%` }}
    />
  </>
}