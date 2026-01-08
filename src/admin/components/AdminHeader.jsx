import { faSignOut } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

const AdminHeader = () => {
  return (
  <>
    <div className='flex justify-between mx-15'>
      <div className='flex items-center'>
        <img src="https://cdn-icons-png.flaticon.com/512/3532/3532091.png" alt="" className='w-15' />
          <h1>Bookstore</h1>
        </div>  
     <button className='hover:text-xl cursor-pointer bg-black text-white h-8 mt-3 rounded-xl'><FontAwesomeIcon icon={faSignOut}/> Logout</button>
    </div>
    <div className='bg-black text-white'>
   <marquee behavior="" direction="">Welcome admin!! You are set to manage and monitor the system.Lets get to work</marquee>
    </div>
  </>

  )
}

export default AdminHeader