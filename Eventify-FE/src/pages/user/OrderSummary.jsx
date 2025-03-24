
import React, { useEffect, useState } from "react";
import { IoMdArrowBack } from "react-icons/io";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

const OrderSummary = () => {
  const { events, loading, error } = useSelector((state) => state.event);
  const { id } = useParams();
  const navigate = useNavigate();

  const [event, setEvent] = useState(null);
  const [ticketCount, setTicketCount] = useState(1);
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);

  useEffect(() => {
    if (!id) return;
    const event = events.find(event => event._id === id);
    setEvent(event);
  }, [id]);


  const totalPrice = event?.price === "Free" ? 0 : event?.price * ticketCount;

  const handleCheckboxChange = (e) => {
    setIsCheckboxChecked(e.target.checked);
  };


  const handleProceed = () => {
    navigate(`/events/${event._id}/ordersummary/paymentsummary`, {
      state: { ticketCount, totalPrice }
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg font-semibold text-gray-500">Loading...</p>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg font-semibold text-red-500">Event not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="inline-flex gap-2 items-center mb-4 px-4 py-2 bg-blue-light text-black font-semibold rounded-md hover:bg-blue-500 transition">
        <IoMdArrowBack className="w-5 h-5" /> Back
      </button>

      {/* Main Container */}
      <div className="mt-8 flex flex-col lg:flex-row gap-6">
        {/* Terms & Conditions */}
        <div className="p-6 bg-white shadow-md rounded-md w-full lg:w-3/4">
          <h2 className="text-xl font-bold">Terms & Conditions</h2>
          <ul className="mt-4 space-y-3 text-gray-700 list-disc pl-5">
            <li>Refunds will be provided for cancellations made up to 14 days before the event.</li>
            <li>Tickets will be delivered to your registered email as e-tickets.</li>
            <li>Each person can purchase a maximum of 5 tickets.</li>
            <li>If an event is postponed, the ticket remains valid.</li>
            <li>In case of cancellation, attendees will be notified via email and refunded automatically.</li>
            <li>By using our app, you agree to our privacy policy.</li>
            <li>Review and accept terms before proceeding to payment.</li>
          </ul>
        </div>

        {/* Booking Summary */}
        <div className="p-6 bg-blue-100 shadow-md rounded-md w-full lg:w-1/4">
          <h2 className="text-lg font-bold">Booking Summary</h2>

          {/* Event Title & Price */}
          <div className="flex justify-between text-sm mt-4">
            <span className="text-gray-800">{event.title}</span>
            <span className="font-bold">INR {event.price}</span>
          </div>

          {/* Ticket Quantity Selector */}
          <div className="mt-4">
            <label className="text-sm font-medium">Select Tickets:</label>
            <select
              className="w-full mt-2 p-2 border border-gray-300 rounded-md"
              value={ticketCount}
              onChange={(e) => setTicketCount(Number(e.target.value))}
            >
              {[1, 2, 3, 4, 5].map((num) => (
                <option key={num} value={num}>
                  {num} {num === 1 ? "Ticket" : "Tickets"}
                </option>
              ))}
            </select>
          </div>

          <hr className="my-4 border-gray-300" />

          {/* Total Price */}
          <div className="flex justify-between text-sm font-bold">
            <span>SUB TOTAL</span>
            <span className="pr-2">INR {totalPrice}</span>
          </div>


          {/* Checkbox for Confirmation */}
          <div className="flex items-center gap-2 mt-4">
            <input type="checkbox" className="h-5 w-5" onChange={handleCheckboxChange} />
            <span className="text-sm">
              I have verified the Event name, date, and time before proceeding to payment. I accept the terms & conditions.
            </span>
          </div>

          {/* Proceed Button */}
          <button
            onClick={handleProceed}
            className={`mt-5 w-full py-3 font-bold rounded-md transition ${isCheckboxChecked ? "bg-blue-700 text-white hover:bg-blue-800" : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            disabled={!isCheckboxChecked}
          >
            Proceed
          </button>
        </div>
      </div>
    </div>

  );
}


export default OrderSummary;