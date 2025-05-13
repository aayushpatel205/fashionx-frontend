import React, { useEffect } from 'react'
import axiosInstance from '../axiosInstance'
import { useNavigate } from 'react-router-dom';

const ProtectedRoute = ({children}) => {
  const navigate = useNavigate();

  const verifyAdmin = async()=>{
    try {
      await axiosInstance.get(`/admin/auth/verify`);
    } catch (error) {
      navigate("/admin");
    }
  }
  useEffect(()=>{
    verifyAdmin();
  },[])

  return (
    <div>
      {children}
    </div>
  )
}

export default ProtectedRoute