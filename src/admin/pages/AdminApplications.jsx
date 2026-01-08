import React, { useEffect, useState } from 'react'
import AdminHeader from '../components/AdminHeader'
import AdminSidebar from '../components/AdminSidebar'
import { getAllJobApplications } from '../../../services/allApi'
import { toast } from 'react-toastify'
import { BaseUrl } from '../../../services/baseUrl'

const AdminApplications = () => {
const[applicationData,setApplicationData]=useState([])

useEffect(()=>{
    getAllApplicationData()
},[])
    const getAllApplicationData=async()=>{
        try {
            let token=localStorage.getItem('token')
            let header={
                Authorization: `Bearer ${token}`
            }
            let apiResponse=await getAllJobApplications(header)
            if (apiResponse.status==200){
setApplicationData(apiResponse.data.allApplications)
            }else{
                toast(apiResponse.response.data.message)
            }
        } catch (error) {
            console.log(error)
            toast("Something went wrong in the server")
        }
    }
  return (
   <>
      <AdminHeader/>
      <div className='grid grid-cols-[2fr_5fr]'>

        <AdminSidebar/>
        <div>
            <h1 className='text-center text-2xl font-bold'> Job Applications</h1>
        {
            applicationData?.length>0  ? (
                <div className='grid grid-cols-2 gap-10 p-3'>
                     {
                        applicationData?.map((eachApp)=>(
                            <div className='border-2 bg-blue-100 p-10 text-blue-950 font-bold'>
                           <h1>Name:{eachApp.name}</h1>
                           <h1>Phone Number:{eachApp.phoneNo}</h1>
                           <h1>Qualification:{eachApp.qualification}</h1>
                           <h1>Job Role:{eachApp.jobRole}</h1>
                           <h1>Job Id:{eachApp.jobId}</h1>
                           <a href={`${BaseUrl}/uploads/${eachApp.resume}`} target='_blank' className='text-red-500'>Download Resume</a>
                            </div>
                        ))
                     }
                </div>
            )  :<h1>No applications</h1>
        }
       
              
      </div>
      </div>
   </>
  )
}

export default AdminApplications