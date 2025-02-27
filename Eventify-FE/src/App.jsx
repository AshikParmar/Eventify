import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/public/Home";
import Events from "./pages/public/Events";
import SingleEvent from "./components/SingleEvent";
import LoginPage from "./pages/public/LoginPage";
import SignupPage from "./pages/public/SignupPage";
import { useSelector } from "react-redux";
import Dashboard from "./pages/admin/Dashboard";
import ManageEvents from "./pages/admin/ManageEvents";
import Settings from "./pages/admin/Settings";
import Sidebar from "./pages/admin/Sidebar";
import CreateEvent from "./components//admin/CreateEvent";
import UpdateEvent from "./components/admin/UpdateEvent";
import ViewEvent from "./components/admin/ViewEvent";
// import ProtectedRoute from "./AllRoutes/ProtectedRoute";

function App() {

  const user = useSelector(state => state.user.user);


  return (
    <Router>
      {
        user?.role === "Admin" ?
         
          <div className="flex">
            <Sidebar />
            <div className="flex-1 bg-gray-100 h-screen overflow-y-auto">
              <Navbar />
              <Routes>
                 {/* private Routes */}
                <Route path="/admin/dashboard" element={<Dashboard />} />
                <Route path="/admin/manage-events" element={<ManageEvents />} />
                <Route path="/admin/manage-events/create" element={<CreateEvent />} />
                <Route path="/admin/manage-events/update/:id" element={<UpdateEvent />} />
                <Route path="/admin/manage-events/view/:id" element={<ViewEvent />} />
                <Route path="/admin/settings" element={<Settings />} />
                <Route path="/*" element={<Navigate to="/admin/dashboard" />} />
              </Routes>
            </div>
          </div>
          :
          <div className="min-h-screen">
            <Navbar />
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/user/login" element={<LoginPage />} />
              <Route path="/user/signup" element={<SignupPage />} />
              <Route path="/events" element={<Events />} />
              <Route path="/events/:id" element={<SingleEvent />} />
              <Route path="/*" element={<Navigate to="/" />} />

            </Routes>
            <Footer />
          </div>
      }

    </Router>
  );
}

export default App;
