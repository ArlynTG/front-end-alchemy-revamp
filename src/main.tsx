
import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App.tsx'
import './index.css'
import { Toaster } from 'sonner'

// Import pages
import SignupTest from './pages/SignupTest.tsx'
import Onboarding from './pages/Onboarding.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/signup-test',
    element: <SignupTest />,
  },
  {
    path: '/onboarding',
    element: <Onboarding />,
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
    <Toaster />
  </React.StrictMode>,
)
