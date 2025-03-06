import React, { useEffect, useState } from "react";
import { IoMdArrowBack } from "react-icons/io";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
// import Qrcode from "qrcode";
import axios from "axios";

const PaymentSummary = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { events, loading, error } = useSelector((state) => state.event);
  const { user } = useSelector((state) => state.user); // Assuming user is stored in Redux

  const [event, setEvent] = useState(null);
  const [ticketDetails, setTicketDetails] = useState(null);

  useEffect(() => {
    if (!id) return;
    const selectedEvent = events.find((event) => event._id === id);
    setEvent(selectedEvent);
  }, [id]);

  useEffect(() => {
    if (event && user) {
      setTicketDetails({
        userid: user._id,
        eventid: event._id,
        ticketDetails: {
          name: user.username,
          email: user.email,
          eventName: event.title,
          eventDate: event.date,
          eventStartTime: event.startTime,
          ticketPrice: event.price,
          qr: "",
        },
      });
    }
  }, [event, user]);

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

  //! Helper function to generate QR code
  async function generateQRCode(name, eventName) {
    try {
      return await Qrcode.toDataURL(`Event Name: ${eventName} \n Name: ${name}`);
    } catch (error) {
      console.error("Error generating QR code:", error);
      return null;
    }
  }

  //! Create Ticket Function
  const createTicket = async (e) => {
    e.preventDefault();
    try {
      const qrCode = await generateQRCode(
        ticketDetails.ticketDetails.name,
        ticketDetails.ticketDetails.eventname
      );

      const updatedTicketDetails = {
        ...ticketDetails,
        ticketDetails: {
          ...ticketDetails.ticketDetails,
          qr: qrCode,
        },
      };

      await axios.post(`/tickets`, updatedTicketDetails);
      alert("Ticket Created");
      setRedirect(true);
    } catch (error) {
      console.error("Error creating ticket:", error);
    }
  };



  return (
    <div className="min-h-screen p-6 bg-gray-50">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="inline-flex gap-2 items-center px-4 py-2 bg-gray-200 text-blue-700 font-bold rounded-md hover:bg-gray-300 transition"
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
              name="name"
              value={ticketDetails?.ticketDetails.name || ""}
              disabled
              className="w-full p-3 border rounded-md bg-gray-100"
            />
            <input
              type="email"
              name="email"
              value={ticketDetails?.ticketDetails.email || ""}
              disabled
              className="w-full p-3 border rounded-md bg-gray-100"
            />
          </div>

          {/* <h2 className="text-xl font-bold mt-8">Payment Option</h2>
          <div className="mt-4">
            <button
              type="button"
              className="px-8 py-3 text-black bg-blue-100 border rounded-md cursor-not-allowed"
              disabled
            >
              Credit / Debit Card
            </button>
          </div>

          <div className="mt-6 space-y-4">
            <input
              type="text"
              name="nameOnCard"
              placeholder="Name on Card"
              value="A.B.S.L. Perera"
              disabled
              className="w-full p-3 border rounded-md bg-gray-100"
            />
            <input
              type="text"
              name="cardNumber"
              placeholder="Card Number"
              value="5648 3212 7802"
              disabled
              className="w-full p-3 border rounded-md bg-gray-100"
            />
            <div className="flex space-x-4">
              <input
                type="text"
                name="expiryDate"
                placeholder="Expiry Date (MM/YY)"
                value="12/25"
                disabled
                className="w-1/2 p-3 border rounded-md bg-gray-100"
              />
              <input
                type="text"
                name="cvv"
                placeholder="CVV"
                value="532"
                disabled
                className="w-1/4 p-3 border rounded-md bg-gray-100"
              />
            </div>
          </div> */}

          {/* Make Payment Button */}
          <div className="mt-8">
            <p className="text-lg font-semibold pb-2">Total: INR. {event.price}</p>
            <button
              onClick={createTicket}
              className="w-full py-3 text-white font-bold bg-blue-700 hover:bg-blue-800 rounded-md transition"
            >
              Make Payment
            </button>
          </div>
        </div>

        {/* Order Summary */}
        <div className="p-6 bg-blue-100 shadow-md rounded-md w-full lg:w-1/4">
          <h2 className="text-lg font-bold mb-4">Order Summary</h2>
          <div className="text-sm">
            <p className="font-semibold">{event.title}</p>
            <p className="text-xs">{event.date}, {event.startTime}</p>
            <p className="text-xs pb-2">1 Ticket</p>
            <hr className="my-4 border-gray-300" />
            <p className="font-bold">INR {event.price}</p>
            <p className="font-bold">Sub total: {event.price}</p>
          </div>
        </div>
      </div>
    </div>
  );
}


export default PaymentSummary