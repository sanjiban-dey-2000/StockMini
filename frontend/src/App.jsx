import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AppLayout from './components/layout/AppLayout'
import LandingPage from './pages/LandingPage'

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
      ]
    }
  ])
  return (
    <RouterProvider router={router}/>
  )
}

export default App