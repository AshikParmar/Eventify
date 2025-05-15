import React from "react";
import { Link } from "react-router-dom";

const PaymentSuccess = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50">
      <h1 className="text-3xl font-bold text-green-700 mb-4">Payment Successful!</h1>
      <p className="mb-6">Thank you for your purchase. Your tickets have been emailed to you.</p>
      <Link to="/user/my-tickets" className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700">
        View My Tickets
      </Link>
    </div>
  );
}

export default PaymentSuccess;