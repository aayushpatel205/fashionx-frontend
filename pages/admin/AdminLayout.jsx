import React from 'react'
import AdminNavbar from '../../components/AdminNavbar'
import { Outlet } from 'react-router-dom'

const AdminLayout = () => {
  return (
    <div className='h-screen w-full'>
        <AdminNavbar/>
        <Outlet/>
    </div>
  )
}

export default AdminLayout