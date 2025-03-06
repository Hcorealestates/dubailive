"use client"
import { FacebookShareButton, FacebookIcon, TwitterShareButton, XIcon, LinkedinShareButton, LinkedinIcon, WhatsappShareButton, WhatsappIcon, TelegramShareButton, TelegramIcon } from "react-share";

export default function ShareBtns({ shareUrl }) {
  return <>
    <FacebookShareButton url={shareUrl}>
      <FacebookIcon size={36} borderRadius={5} />
    </FacebookShareButton>

    <TwitterShareButton url={shareUrl}>
      <XIcon size={36} borderRadius={5} />
    </TwitterShareButton>

    <LinkedinShareButton url={shareUrl}>
      <LinkedinIcon size={36} borderRadius={5} />
    </LinkedinShareButton>

    <WhatsappShareButton url={shareUrl}>
      <WhatsappIcon size={36} borderRadius={5} />
    </WhatsappShareButton>

    <TelegramShareButton url={shareUrl}>
      <TelegramIcon size={36} borderRadius={5} />
    </TelegramShareButton>
  </>;
}