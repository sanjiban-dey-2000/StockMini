import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AppLayout from './components/layout/AppLayout'
import LandingPage from './pages/LandingPage'
import Feature from './pages/Feature'

const App = () => {

  const router=createBrowserRouter([
    {
      path:'/',
      element: <AppLayout/>,
      children:[
        {
          path:'/',
          element: <LandingPage/>,
        },
        {
          path:'/features',
          element: <Feature/>
        }
      ]
    }
  ])
  return (
    <RouterProvider router={router}/>
  )
}

export default App