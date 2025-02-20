import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import Home from './pages/user/Home.jsx'
import LogIn from './pages/user/LogIn.jsx'
import SignUp from './pages/user/SignUp.jsx'
import Events from './pages/user/Events.jsx'
import SingleEvent from './components/SingleEvent.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='' element={<App />} >
      <Route path='/' element={<Home />}/>
      <Route path='/user/login' element={<LogIn/>}/>
      <Route path='/user/signup' element={<SignUp/>}/>
      <Route path='/events' element={<Events/>}/>
      <Route path="/events/:id" element={<SingleEvent />} />
    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </StrictMode>,
   
)
