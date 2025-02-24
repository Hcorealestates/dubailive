"use client"
import { useState, useEffect } from 'react';
import TextComponent from "@/components/TextComponent";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightLong } from '@fortawesome/pro-regular-svg-icons';
export default function Overview({ overviewshortObj = false, overviewDesc }) {
  const [overview, setOverview] = useState(true);
  const [btnText, setBtnText] = useState(`Keep Reading ...`);
  return <>
    <TextComponent itemObj={overviewshortObj} className="relative text-editor" />
    {overview && <button data-text={btnText} className='link' onClick={() => setOverview(false)}>{btnText}
      {/* <FontAwesomeIcon icon={faArrowRightLong} /> */}
    </button>}
    <TextComponent itemObj={overviewDesc} className={`mt-4 text-editor  more ${overview ? 'hidden' : 'block'}`} />
  </>
}