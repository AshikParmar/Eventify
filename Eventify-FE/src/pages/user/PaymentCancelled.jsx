import { Link } from "react-router-dom";

const PaymentCancelled = () => {
  return (
     <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50">
      <h1 className="text-3xl font-bold text-red-700 mb-4">Payment Cancelled</h1>
      <p className="mb-6">Your payment was not completed. You can try again or contact support.</p>
      <Link to="/events" className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700">
        Browse Events
      </Link>
    </div>
  );
}

export default PaymentCancelled;