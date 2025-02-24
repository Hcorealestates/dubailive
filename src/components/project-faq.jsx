"use client"
import { faChevronDown } from '@fortawesome/pro-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'
import TextComponent from '@/components/TextComponent'

export default function ProjectFaq({ projectfaq }) {
  return <>
    <div className="flex flex-col gap-6">
      {projectfaq.map((singlefaq) => (
        <Disclosure as="div" className="p-4 border rounded-lg" key={singlefaq.id} defaultOpen={singlefaq.defaultOpen}>
          <DisclosureButton className="group flex w-full items-center justify-between text-left">
            <span className="text-lg font-semibold group-data-open:text-primary">{singlefaq.question}</span>
            <FontAwesomeIcon icon={faChevronDown} className="group-data-open:rotate-180" /></DisclosureButton>
          <DisclosurePanel className="mt-2"><TextComponent itemObj={singlefaq.answer} className="faq" /></DisclosurePanel>
        </Disclosure>
      ))}
    </div>
  </>
}