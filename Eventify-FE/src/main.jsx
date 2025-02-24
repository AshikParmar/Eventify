import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import Home from './pages/public/Home.jsx'
// import LogIn from './pages/user/LogIn.jsx'
// import SignUp from './pages/user/SignUp.jsx'
import Events from './pages/public/Events.jsx'
import SingleEvent from './components/SingleEvent.jsx'

import { Provider } from 'react-redux'
import { store } from './redux/store.js'
import LoginPage from './pages/public/LoginPage.jsx'
import SignupPage from './pages/public/SignupPage.jsx'
// import TicketPage from './pages/user/TicketPage.jsx'
// import OrderSummary from './pages/user/OrderSummary.jsx'
// import PaymentSummary from './pages/user/PaymentSummary.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='' element={<App />} >
      <Route path='/' element={<Home />}/>
      <Route path='/user/login' element={<LoginPage/>}/>
      <Route path='/user/signup' element={<SignupPage/>}/>
      {/* <Route path='/userprofile' element={<TicketPage />}/> */}
      {/* <Route path='/wallet' element={<TicketPage />}/> */}
      <Route path='/events' element={<Events/>}/>
      <Route path="/events/:id" element={<SingleEvent />} />
      {/* <Route path='/event/:id/ordersummary' element = {<OrderSummary />} /> */}
      {/* <Route path='/event/:id/ordersummary/paymentsummary' element = {<PaymentSummary />} /> */}
    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}></RouterProvider>
    </Provider>
  </StrictMode>,
   
)
