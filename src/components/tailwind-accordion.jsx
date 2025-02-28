"use client"
import { faChevronDown, faChevronsDown } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";
import TextComponent from "./TextComponent";

export default function TailwindAccordion({ faqItem }) {
  return <>
    <Disclosure as="div" className="p-4 border group-data-open:border-primary rounded-lg bg-primary/10">
      <DisclosureButton className="group flex w-full items-center justify-between text-left">
        <h5 className="md:text-lg font-semibold group-data-open:text-primary">{faqItem.question}</h5>
        <FontAwesomeIcon icon={faChevronDown} className="group-data-open:rotate-180" /></DisclosureButton>
      <DisclosurePanel className="mt-2"><TextComponent itemObj={faqItem.answer} className="faq" /></DisclosurePanel>
    </Disclosure>
  </>
}