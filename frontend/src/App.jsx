import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AppLayout from './components/layout/AppLayout'
import LandingPage from './pages/LandingPage'
import Feature from './pages/Feature'
import Services from './pages/Services'
import Testimonials from './pages/Testimonials'
import ErrorPage from './pages/ErrorPage'
import Signup from './pages/Signup'
import Login from './pages/Login'
import DashboardLayout from './components/layout/DashboardLayout'
import DashboardHome from './pages/DashboardHome'

const App = () => {

  const router=createBrowserRouter([
    {
      path:'/',
      element: <AppLayout/>,
      errorElement: <ErrorPage/>,
      children:[
        {
          path:'/',
          element: <LandingPage/>,
        },
        {
          path:'/features',
          element: <Feature/>
        },
        {
          path:'/services',
          element:<Services/>
        },
        {
          path:'/testimonials',
          element: <Testimonials/>
        },
        {
          path:'/signup',
          element: <Signup/>
        },
        {
          path:'/login',
          element: <Login/>
        }
      ]
    },
    {
      path:"/dashboard",
      element: <DashboardLayout/>,
      errorElement: <ErrorPage/>,
      children:[
        {
          index:true,
          element: <DashboardHome/>
        },
        {

        },
      ]
    }
  ])
  return (
    <RouterProvider router={router}/>
  )
}

export default App