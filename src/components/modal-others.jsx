'use client'
import { useState } from 'react'
import { Button, Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightLong, faXmark } from '@fortawesome/pro-regular-svg-icons';


export default function ModalOthers({ children, className = '', btnText }) {
  const [open, setOpen] = useState(false);
  return <>
    <Button
      onClick={() => setOpen(true)}
      className={`${className} relative inline-flex items-center  gap-2 group transition border-b border-b-primary uppercase font-semibold text-left`}
    >{btnText} <FontAwesomeIcon icon={faArrowRightLong} className=" group-hover:ml-5 duration-200" /></Button>
    <Dialog open={open} onClose={setOpen} className="relative z-50">
      <DialogBackdrop
        transition={true}
        className="fixed inset-0 bg-gray-700/90 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-leave:duration-200 data-enter:ease-out data-leave:ease-in"
      />
      {/* Modal body */}
      <div className="fixed inset-0 z-50 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-leave:duration-200 data-enter:ease-out data-leave:ease-in sm:my-8 w-full sm:max-w-2xl sm:data-closed:translate-y-0 sm:data-closed:scale-95"
          >

            <div className="bg-white p-6 pt-3 pb-0 pr-0">
              <div className="flex items-center">
                <Button
                  type="button"
                  data-autofocus
                  onClick={() => setOpen(false)}
                  className="bg-white font-semibold rounded-full flex justify-center items-center size-9 hover:bg-gray-200 active:ring-3 group ring-primary -ml-2"
                >
                  <FontAwesomeIcon icon={faXmark} className='text-xl' />
                </Button>
              </div>
              <div className="max-h-[calc(100vh-10rem)] overflow-y-auto">
                {children}

              </div>
            </div>

          </DialogPanel>

        </div>
      </div>
    </Dialog>
  </>
}
