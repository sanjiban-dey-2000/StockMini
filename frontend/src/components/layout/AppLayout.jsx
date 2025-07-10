import React from 'react'
import Footer from './Footer'
import Header from './Header'
import {Outlet} from "react-router-dom";
import {Toaster} from "react-hot-toast";

const AppLayout = () => {
  return (
    <>
        <Toaster position="top-center" reverseOrder={false}/> 
        <Header/>
        <div>
            <Outlet/>
        </div>
        <Footer/>
    </>
  )
}

export default AppLayout