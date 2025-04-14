import React from "react";
import { Card, CardContent } from "@mui/material";
import { Calendar, MapPin } from "lucide-react";

const TicketCard = ({ ticket }) => {
  return (
    <Card className="w-full md:w-lg shadow-md rounded-lg overflow-hidden">
      <div className="grid grid-cols-1 sm:grid-cols-4 h-full">
        {/* Date Section - Full width on mobile, 1/4 on larger screens */}
        <div className="bg-blue-600 text-white p-3 sm:col-span-1 flex sm:flex-col items-center justify-center text-center">
          <div className="flex sm:flex-col items-center sm:items-center space-x-4 sm:space-x-0">
            <div className="text-center">
              <p className="text-xs uppercase">Starts</p>
              <p className="text-xl font-bold">{new Date(ticket.eventDate).getDate()}</p>
              <p className="text-sm">{new Date(ticket.eventDate).toLocaleString("en-US", { month: "short" })}</p>
            </div>
            <div className="sm:mt-1">
              <p className="text-lg font-bold sm:text-base">
                {new Date(ticket.eventDate).toLocaleString("en-US", { 
                  weekday: window.innerWidth < 640 ? "short" : "long" 
                })}
              </p>
              <p className="text-sm">{new Date(ticket.eventDate).getFullYear()}</p>
              <p className="text-xs flex items-center justify-center gap-1 sm:mt-1">
                <Calendar className="w-3 h-3" /> {ticket.eventStartTime}
              </p>
            </div>
          </div>
        </div>

        {/* Ticket Info - Full width on mobile, 2/4 on larger screens */}
        <CardContent className="p-3 sm:p-4 sm:col-span-2 flex flex-col justify-center items-center">
          <h2 className="text-lg font-bold text-blue-700 text-center sm:text-left">{ticket.eventName}</h2>
          <p className="text-gray-600 text-sm line-clamp-2 text-center sm:text-left mb-2">
            {ticket.event?.description || "Add description..."}
          </p>

          <div className="flex items-center justify-center sm:justify-start gap-1 text-blue-700 text-sm">
            <MapPin className="w-4 h-4" />
            <p className="truncate">{ticket.event?.venue || "Assign venue"}</p>
          </div>

          <div className="text-sm mt-2">
            <p><span className="font-bold">Name:</span> {ticket.name}</p>
            <p><span className="font-bold">Email:</span> <span className="">{ticket.email}</span></p>
          </div>

          <div className="flex justify-center sm:justify-start mt-3 text-gray-600 text-sm">
            <div className="border-r pr-3 mr-3">
              <p className="font-bold">{ticket.totalPrice === 0 ? "Free" : `$${ticket.totalPrice}`}</p>
              <p>Price</p>
            </div>
            <div>
              <p className="font-bold">{ticket.numberOfTickets || 0}</p>
              <p>Tickets</p>
            </div>
          </div>
        </CardContent>

        {/* QR Code - Full width on mobile, 1/4 on larger screens */}
        <div className="border-t sm:border-t-0 sm:col-span-1 flex items-center justify-center p-3">
          <img
            src={ticket.qr}
            alt="Ticket QR"
            className="h-28 w-28 sm:h-24 sm:w-24 object-contain"
          />
        </div>
      </div>
    </Card>
  );
};

export default TicketCard;