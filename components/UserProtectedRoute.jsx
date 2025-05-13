import React, { useEffect } from "react";
import axiosInstance from "../axiosInstance";
import { Outlet, useNavigate } from "react-router-dom";

const UserProtectedRoute = () => {
    const navigate = useNavigate();
    const verifyUser = async()=>{
        try {
            await axiosInstance.get("user/auth/verify");
        } catch (error) {
            navigate("/login");
        }
    }

    useEffect(()=>{
        verifyUser();
    },[])
  return <Outlet/>;
};

export default UserProtectedRoute;
