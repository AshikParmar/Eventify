import React from 'react';

const AboutUs = () => {
  return (
    <div className='bg-gray-50 p-8'>
      <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">About Us</h1>
        <p className="text-gray-700 text-center mb-6">
          Welcome to <strong>Eventify</strong>, your go-to platform for seamless event management. We are dedicated to providing users with an easy and efficient way to organize, manage, and enhance their events.
        </p>
        <p className="text-gray-600 text-center mb-6">
          Our mission is to simplify event planning by offering innovative tools and features tailored for both individuals and businesses. Whether you're hosting a small meetup or a large conference, Eventify ensures a smooth and memorable experience for everyone involved.
        </p>
        <h3 className="text-xl font-semibold text-gray-800 mt-6">Why Choose Eventify?</h3>
        <ul className="list-disc list-inside text-gray-700 mt-4">
          <li>Easy-to-use event management tools</li>
          <li>Seamless collaboration for organizers</li>
          <li>Customizable event experiences</li>
          <li>24/7 support and assistance</li>
        </ul>
        <h3 className="text-xl font-semibold text-gray-800 mt-6">Stay Connected</h3>
        <p className="text-gray-600">Follow us on social media to stay updated with the latest features and announcements.</p>
        <ul className="text-blue-500 space-y-2 mt-2">
          <li><a href="https://facebook.com/eventify" className="hover:underline">Facebook</a></li>
          <li><a href="https://twitter.com/eventify" className="hover:underline">Twitter</a></li>
          <li><a href="https://instagram.com/eventify" className="hover:underline">Instagram</a></li>
        </ul>
      </div>
    </div>
  );
};

export default AboutUs;
