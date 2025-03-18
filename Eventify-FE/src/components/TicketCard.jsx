import React from "react";
import { Card, CardContent } from "@mui/material";
import { Calendar, MapPin } from "lucide-react";

const TicketCard = ({ ticket }) => {
  return (
    <Card className="w-full md:w-lg shadow-md rounded-lg overflow-hidden">
      <div className="grid grid-cols-4 h-full">
        {/* Left - Date Section */}
        <div className="bg-blue-600 text-white p-4 col-span-1 flex flex-col items-center justify-center text-center">
          <p className="text-sm uppercase">Starts</p>
          <p className="text-lg font-bold">
            {new Date(ticket.eventDate).toLocaleString("en-US", { weekday: "long" })}
          </p>
          <p className="text-2xl font-bold">{new Date(ticket.eventDate).getDate()}</p>
          <p className="text-sm">{new Date(ticket.eventDate).toLocaleString("en-US", { month: "long" })}</p>
          <p className="text-sm">{new Date(ticket.eventDate).getFullYear()}</p>
          <p className="text-xs mt-2 flex items-center gap-1">
            <Calendar className="w-4 h-4" /> {ticket.eventStartTime}
          </p>
        </div>

        {/* Middle - Ticket Info */}
        <CardContent className="col-span-2 flex flex-col justify-center items-center text-center p-4">
          <h2 className="text-xl font-bold text-blue">{ticket.eventName}</h2>
          <p className="text-gray-600 text-sm line-clamp-2 h-[40px] overflow-hidden">{ticket.event?.description || "Add description..."}</p>

          <div className="flex items-center justify-center gap-2 mt-2 text-blue-700">
            <MapPin className="w-5 h-5" />
            <p>{ticket.event?.venue || "Assign venue"}</p>
          </div>

          <div className="text-left">
            <h3><span className="font-bold">Name: </span>{ticket.name}</h3>
            <h3><span className="font-bold">Email: </span>{ticket.email}</h3>
          </div>

          <div className="flex justify-center mt-3 text-gray-600 text-sm">
            <div className="border-r-2 p-2">
              <p className="font-bold">{ticket.totalPrice || 0}</p>
              <p>Price</p>
            </div>
            <div className="p-2">
              <p className="font-bold">{ticket.numberOfTickets || 0}</p>
              <p>Tickets</p>
            </div>
          </div>
        </CardContent>

        {/* Right - QR Code */}
        <div className="col-span-1 flex items-center justify-center p-2">
          <img
            src={ticket.qr}
            alt="Ticket QR"
            className="h-32 w-32 object-contain rounded-md"
          />
        </div>
      </div>
    </Card>
  );
};

export default TicketCard;
