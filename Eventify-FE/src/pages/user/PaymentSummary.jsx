import React, { useEffect, useState } from "react";
import { IoMdArrowBack } from "react-icons/io";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useGlobalUI } from '../../components/Global/GlobalUIContext';
import { createCheckoutSession, joinEvent } from "../../redux/services/eventJoin";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const PaymentSummary = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { showSnackbar } = useGlobalUI();

  const { events, loading } = useSelector((state) => state.event);
  const { user } = useSelector((state) => state.user);

  const [event, setEvent] = useState(null);
  const { ticketCount, totalPrice } = location.state || { ticketCount: 1, totalPrice: 0 };
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (id) {
      const selectedEvent = events.find((e) => e._id === id);
      setEvent(selectedEvent);
    }
  }, [id, events]);

  const handleJoinOrPay = async (e) => {
    e.preventDefault();

    if (!event || !user) {
      alert("Event or user details are missing.");
      return;
    }

    const eventDate = new Date(event.date);
    const currentDate = new Date();

    if (eventDate <= currentDate) {
      showSnackbar("You cannot enroll in past events!", "error");
      return;
    }

    setIsProcessing(true);

    try {
      console.log(("totalPrice",totalPrice))
      if (totalPrice === 0) {
        // Free Event — Direct Join
        const response = await joinEvent(user._id, event._id, ticketCount, 0);

        if (!response.success) {
          showSnackbar(response.message, "error");
        } else {
          showSnackbar(response.message || "Successfully joined!", "success");
          navigate("/user/my-tickets");
        }

      } else {
        // Paid Event — Stripe Checkout
        const stripe = await stripePromise;

      if (!stripe) {
        showSnackbar("Stripe failed to load", "error");
        return;
      }

      // Call the createCheckoutSession service function
      const { success, sessionId, message } = await createCheckoutSession({
        eventId: event._id,
        userId: user._id,
        amount: event.price,
        quantity: ticketCount,
      });

      if (success && sessionId) {
        const result = await stripe.redirectToCheckout({ sessionId });

        if (result.error) {
          showSnackbar(result.error.message || "Payment failed", "error");
        }
      } else {
        showSnackbar(message || "Failed to create checkout session", "error");
      }
    }
    } catch (error) {
      showSnackbar(error.message || "Something went wrong", "error");
    } finally {
      setIsProcessing(false);
    }
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
        className="inline-flex gap-2 items-center mb-4 px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition"
      >
        <IoMdArrowBack className="w-5 h-5" /> Back
      </button>

      <div className="mt-8 flex flex-col lg:flex-row gap-6">
        {/* Payment Details Section */}
        <div className="p-6 bg-white shadow-md rounded-md w-full lg:w-3/4">
          <h2 className="text-xl font-bold">Your Details</h2>
          <div className="mt-4 space-y-4">
            <input
              type="text"
              value={user?.username || ""}
              disabled
              className="w-full p-3 border rounded-md bg-gray-100"
            />
            <input
              type="email"
              value={user?.email || ""}
              disabled
              className="w-full p-3 border rounded-md bg-gray-100"
            />
          </div>

          {/* Payment Button */}
          <div className="mt-8">
            <p className="text-lg font-semibold pb-2">Total: INR. {totalPrice}</p>
            <button
              onClick={handleJoinOrPay}
              className={`w-full py-3 text-white font-bold rounded-md transition ${
                isProcessing ? "bg-gray-500 cursor-not-allowed" : "bg-blue-700 hover:bg-blue-800"
              }`}
              disabled={isProcessing}
            >
              {isProcessing ? "Processing..." : totalPrice === 0 ? "Join Event" : "Make Payment"}
            </button>
          </div>
        </div>

        {/* Order Summary */}
        <div className="p-6 bg-blue-100 shadow-md rounded-md w-full lg:w-1/4">
          <h2 className="text-lg font-bold mb-4">Order Summary</h2>
          <div className="text-sm">
            <p className="font-semibold">{event.title}</p>
            <p className="text-xs">{event.date}, {event.startTime}</p>
            <p className="text-xs pb-2">{ticketCount} Ticket</p>
            <hr className="my-4 border-gray-300" />
            <p className="font-bold">INR {event.price}</p>
            <p className="font-bold">Sub total: {totalPrice}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSummary;
