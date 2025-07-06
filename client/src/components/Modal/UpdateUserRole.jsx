import { Button, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { useState } from 'react'


 const  UpdateUserRole =() =>{
 
 let[isOpen,setIsOpen] = useState(false)
  
  function close() {
    setIsOpen(false)
  }

  return (
    <>
    
 <span
          onClick={() => setIsOpen(true)}
          className='relative cursor-pointer inline-block px-3 py-1 font-semibold text-green-900 leading-tight'
        >
          <span
            aria-hidden='true'
            className='absolute inset-0 bg-green-200 opacity-50 rounded-full'
          ></span>
          <span className='relative'>Update Role</span>
         
        </span>
    <Dialog
        open={isOpen}
        as='div'
        className='relative z-10 focus:outline-none'
        onClose={close}
      >
        <div className='fixed inset-0 z-10 w-screen overflow-y-auto'>
          <div className='flex min-h-full items-center justify-center p-4'>
            <DialogPanel
              transition
              className='w-full max-w-md rounded-xl bg-white/5 p-6 backdrop-blur-2xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0 shadow-xl'
            >
              <DialogTitle
                as='h3'
                className='text-base/7 font-medium text-black'
              >
                Update User Role
              </DialogTitle>
              <form >
                <div>
                  <select
                    // value={updatedRole}
                    // onChange={e => setUpdatedRole(e.target.value)}
                    className='w-full my-3 border border-gray-200 rounded-xl px-2 py-3'
                    name='role'
                    id=''
                  >
                    <option value='customer'>Customer</option>
                    <option value='seller'>Seller</option>
                    <option value='admin'>Admin</option>
                  </select>
                </div>
                <div className='flex justify-between mt-5'>
                  <button
                    type='submit'
                    className='bg-green-400 py-2 px-3 cursor-pointer text-gray-700 rounded-xl '
                  >
                    Update
                  </button>
                  <button
                    onClick={close}
                    type='button'
                    className='bg-red-400 py-2 px-3 cursor-pointer text-gray-700 rounded-xl'
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
   
  )
}

export default UpdateUserRole