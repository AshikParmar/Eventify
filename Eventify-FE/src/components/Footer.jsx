import React from 'react'

const Footer = () => {
  return (

    <footer className="bg-blue text-white shadow">
      <div className="container mx-auto flex flex-wrap justify-between px-4 py-6">
        
        {/* About Us Section */}
        <div className="w-full md:w-1/2 lg:w-1/3 mb-6">
          <h2 className="text-xl font-bold mb-2">About Us</h2>
          <p className="text-sm text-gray-200">
            Eventify is your ultimate destination to discover, explore, and participate in amazing events. 
            From tech conferences to cultural festivals, we bring you the best experiences worldwide.
          </p>
        </div>

        {/* Contact Us Section */}
        <div className="w-full md:w-1/2 lg:w-1/3 mb-6">
          <h2 className="text-xl font-bold mb-2">Contact Us</h2>
          <p className="text-sm text-gray-200">📍 SCE, Sola, Ahmedabad, Gujarat</p>
          <p className="text-sm text-gray-200">📞 +1 234 567 890</p>
          <p className="text-sm text-gray-200">📧 support@eventify.com</p>
        </div>

        {/* Quick Links Section */}
        <div className="w-full lg:w-1/3 mb-6">
          <h2 className="text-xl font-bold mb-2">Quick Links</h2>
          <div className='grid grid-cols-2'>
            <ul className="text-sm text-gray-200">
              <li><a href="#" className="hover:underline">Home</a></li>
              <li><a href="#" className="hover:underline">Events</a></li>
              <li><a href="#" className="hover:underline">Login</a></li>
            </ul>
            <ul className="text-sm text-gray-200">
              <li><a href="#" className="hover:underline">Register</a></li>
              <li><a href="#" className="hover:underline">About Us</a></li>
              <li><a href="#" className="hover:underline">Contact Us</a></li>
            </ul>
          </div>
        </div>
          
        <div className="flex w-full mt-2 px-5 flex-col-reverse sm:flex-row gap-y-2 justify-between items-center">
          <div className="text-gray-200">© 2025 Eventify. All rights reserved.</div>
          <div className="flex space-x-4 text-gray-200">
            <a href="#" className=" hover:text-blue-700">Privacy Policy</a>
            <a href="#" className=" hover:text-blue-700">Terms</a>
            <a href="#" className=" hover:text-blue-700">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
