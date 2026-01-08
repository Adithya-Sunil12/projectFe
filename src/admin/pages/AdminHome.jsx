import React, { useEffect, useState } from 'react'
import AdminHeader from '../components/AdminHeader'
import AdminSideBar from '../components/AdminSideBar'
import { toastTheme } from 'flowbite-react'
import { getAllBooks, getAllJobs, getAllUsers } from '../../../services/allApi'

const AdminHome = () => {
const box={
    width:'180px',
    height:'120px'
}
const[jobCount,setJobCount]=useState(0)
const[bookCount,setbookCount]=useState(0)
const[userCount,setuserCount]=useState(0)
useEffect(()=>{
  getJobCount(),
  getBookCount(),
  getUserCount()
},[])
const getJobCount=async()=>{
               try {
                let token=localStorage.getItem('token')
                let header={
                  Authorization:`Bearer ${token}`
                }
                let apiResponse=await getAllJobs(header)
                setJobCount(apiResponse.data.length)
             console.log(apiResponse)
               } catch (error) {
                console.log(error)
                toast.error('Something went wrong in the server')
               }
}
const getBookCount=async()=>{
  try {
    let token=localStorage.getItem('token')
      let header={
                  Authorization:`Bearer ${token}`
                }
     let apiResponse=await getAllBooks(header, "")
     console.log(apiResponse) 
         setbookCount(apiResponse.data.AllBooks.length)
  } catch (error) {
    console.log(error)
    toast.error("Something went wromg in the server")
  }
}

const getUserCount=async()=>{
  try {
    let token=localStorage.getItem('token')
      let header={
                  Authorization:`Bearer ${token}`
                }
     let apiResponse=await getAllUsers(header, "")
     console.log(apiResponse) 
      setuserCount(apiResponse.data.length)
  } catch (error) {
    console.log(error)
    toast.error("Something went wrong in the server")
  }
}
  return (
    <>
    <AdminHeader/>
    <div className='grid grid-cols-[2fr_5fr]'>
        <AdminSideBar/>
        <div>
         <div className='flex justify-between mx-10 mt-5'>
          <div style={box} className='border bg-blue-600 rounded-2xl'>
             <h1 className='mt-10 ms-10 font-bold text-zinc-900'>
              Total Books:{bookCount}
             </h1>
          </div>
             <div style={box} className='border bg-red-600 rounded-2xl'>
             <h1 className='mt-10 ms-10 font-bold text-zinc-900'>
              Total Users:{userCount}
             </h1>
          </div>
             <div style={box} className='border bg-green-600 rounded-2xl'>
             <h1 className='mt-10 ms-10 font-bold text-zinc-900 '>
              Total Job Openings:{jobCount}
             </h1>
          </div>
         </div>
        </div>
    </div>
    </>
  )
}

export default AdminHome