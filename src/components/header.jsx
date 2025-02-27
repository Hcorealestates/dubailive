"use client"
import { usePathname } from 'next/navigation';
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'
import Image from 'next/image'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBarsStaggered, faXmark } from '@fortawesome/pro-regular-svg-icons';
function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}


export default function Header({ headerObj = false }) {
  const pathname = usePathname();
  const cleanedText = pathname.replace(/\/$/, '');
  const navigation = [
    { name: 'Dubai Housing', href: headerObj.homeurl, current: true },
    { name: 'New projects', href: headerObj.allprojectsurl, current: false },
    { name: 'Communities', href: headerObj.communitiesurl, current: false },
    { name: 'Why Invest', href: headerObj.whyinvest, current: false },
    { name: 'Blogs', href: headerObj.posturl, current: false },
    { name: 'People Also Ask', href: headerObj.peoplealsoask, current: false },
  ]

  return (
    <Disclosure as="nav" className="bg-gray-50/[.9] border-b">
      <div className="wrapper">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center lg:hidden">
            {/* Mobile menu button*/}
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 hover:bg-primary-700 hover:text-white focus:outline-hidden focus:ring-2 focus:ring-inset focus:ring-slate-500">
              <span className="absolute inset-0 border border-slate-400 rounded-md" />
              <span className="sr-only">Open main menu</span>
              <div className="block group-data-open:hidden "><FontAwesomeIcon icon={faBarsStaggered} className="size-6" /></div>
              <div className="hidden group-data-open:block"><FontAwesomeIcon icon={faXmark} className="size-6" /></div>
            </DisclosureButton>
          </div>
          <div className="flex flex-1 items-center lg:justify-between justify-center">
            <div className="flex shrink-0 items-center">
              <Link href="/">
                <Image
                  alt="Dubai Housing"
                  src="/images/logo.svg"
                  width={150} height={50}
                  className="h-12 w-auto"
                  priority
                />
              </Link>
            </div>
            <div className="hidden lg:ml-6 lg:block">
              <div className="flex space-x-4 items-center">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    aria-current={item.current ? 'page' : undefined}
                    className={classNames(
                      (item.href.includes(cleanedText) && cleanedText !== '') || (item.name === 'Dubai Housing' && cleanedText === '') ? 'underline underline-offset-[24px] decoration-[3px] decoration-primary text-primary ' : '', 'font-semibold'
                    )}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <DisclosurePanel className="lg:hidden">
        <div className="space-y-1 px-2 pb-3 pt-2">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              aria-current={item.current ? 'page' : undefined}
              className={classNames(
                (item.href.includes(pathname)) ? 'bg-primary-700/20 text-primary' : 'hover:bg-primary-700/20',
                'block rounded-md px-3 py-2 text-base font-semibold',
              )}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </DisclosurePanel>
    </Disclosure>
  )
}
