'use client'
import { useState } from 'react'
import { Button, Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/pro-regular-svg-icons';
import FormCommon from './form-common';

export default function Modal({ children, className = '', projectName }) {
  const [open, setOpen] = useState(false);
  return <>
    <Button
      onClick={() => setOpen(true)}
      className={`${className} btn btn-primary`}
    >{children}</Button>
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
               className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-leave:duration-200 data-enter:ease-out data-leave:ease-in sm:my-8 w-full sm:max-w-lg sm:data-closed:translate-y-0 sm:data-closed:scale-95"
            >

            <div className="bg-white p-8 pt-6">
              <div className="flex justify-between items-center mb-6">
                <div className="text-2xl md:text-3xl font-semibold font-serif">Send Us Your Query</div>
                <Button
                  type="button"
                  data-autofocus
                  onClick={() => setOpen(false)}
                  className="bg-white font-semibold rounded-full flex justify-center items-center size-10 hover:bg-gray-200 active:ring-3 group ring-primary"
                >
                  <FontAwesomeIcon icon={faXmark} className='text-xl group-hover:scale-125' />
                </Button>
              </div>
              <FormCommon projectName={projectName} />
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  </>
}
