import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Footer = () => {
  const user = useSelector(state => state.user.user);

  return (

    <footer className="bg-blue text-white shadow">
      <div className="container mx-auto flex flex-wrap text-center px-4 py-6">

        {/* About Us Section */}
        <div className="w-full md:w-1/3 mb-6">
          <h2 className="text-xl font-bold mb-2">About Us</h2>
          <p className="text-sm text-gray-200">
            Eventify is your ultimate destination to discover, explore, and participate in amazing events.
            From tech conferences to cultural festivals, we bring you the best experiences worldwide.
          </p>
        </div>

        {/* Contact Us Section */}
        <div className="w-full md:w-1/3 mb-6">
          <h2 className="text-xl font-bold mb-2">Contact Us</h2>
          <p className="text-sm text-gray-200">📍 SCE, Sola, Ahmedabad, Gujarat</p>
          <p className="text-sm text-gray-200">📞 +1 234 567 890</p>
          <p className="text-sm text-gray-200">📧 eventify.feedback@gmail.com</p>
        </div>

        {/* Quick Links Section */}
        <div className="w-full md:w-1/3 mb-6">
          <h2 className="text-xl font-bold mb-2">Quick Links</h2>
          <div className=''>
            <ul className="text-sm text-gray-200">
              {user ?
                <>
                  <li><Link to="/" className=" hover:underline">Home</Link></li>
                  <li><Link to="/Events" className=" hover:underline">Events</Link></li>
                </>
                :
                <>
                  <li><Link to="/login" className=" hover:underline">Log In</Link></li>
                  <li><Link to="/signup" className=" hover:underline">Register</Link></li>
                </>
              }
              <li><Link to="/about-us" className=" hover:underline">About Us</Link></li>
              <li><Link to="/contact-us" className=" hover:underline">Contact Us</Link></li>
            </ul>
          </div>
        </div>

        <div className="flex w-full mt-2 px-5 flex-col-reverse sm:flex-row gap-y-2 justify-between items-center">
          <div className="text-gray-200">© 2025 Eventify. All rights reserved.</div>
          <div className="flex space-x-4 text-gray-200">
            <a href="#" className=" hover:text-blue-700">Privacy Policy</a>
            <a href="#" className=" hover:text-blue-700">Terms</a>
            <Link to="/contact-us" className=" hover:text-blue-700">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
