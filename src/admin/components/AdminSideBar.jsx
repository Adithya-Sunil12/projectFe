import { faBook, faCalendar, faDashboard, faEllipsis, faHome } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Link } from 'react-router-dom'

const AdminSidebar = () => {
  return (
    <div style={{minHeight:'100vh'}} className='bg-gray-400 h-100'>
      <h1 className='font-bold text-center text-2xl p-5'>Admin Dashboard <FontAwesomeIcon icon={faDashboard}/></h1>
      <hr />
      <div  className='text-center p-15'>
        <Link to={'/admin-home'} className='text-xl my-5' style={{display:'block'}}>Home <FontAwesomeIcon icon={faHome}/></Link>
        <hr />
         <Link to={'/admin-books'} className='text-xl my-5'style={{display:'block'}} >All Books/All users <FontAwesomeIcon icon={faBook}/></Link>
        <hr />
         <Link to={'/admin-careers'}  className='text-xl my-5' style={{display:'block'}}>Careers <FontAwesomeIcon icon={faCalendar}/></Link>
        <hr />
           <Link to={'/admin-applications'} className='text-xl my-5' style={{display:'block'}}>View Job Applications <FontAwesomeIcon icon={faEllipsis}/></Link>
        <hr />
         <Link to={'/admin-settings'} className='text-xl my-5' style={{display:'block'}}>Settings <FontAwesomeIcon icon={faEllipsis}/></Link>
        <hr />
      </div>
    </div>
  )
}

export default AdminSidebar