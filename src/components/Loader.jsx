import React from 'react'
import loaderImage from '../assets/loader.gif'

const Loader = () => {
  return (
    <div className='flex justify-center'>
        <img src={loaderImage} alt="" className='w-150'/>
    </div>
  )
}

export default Loader