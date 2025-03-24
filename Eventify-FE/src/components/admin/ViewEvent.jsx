import React, { useEffect } from 'react'
import SingleEvent from '../SingleEvent'
import { useNavigate, useParams } from 'react-router-dom'
import { deleteEvent, fetchEventById } from '../../redux/slices/eventSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useGlobalUI } from '../Global/GlobalUIContext';
import Loading from '../ui/Loading';
import { Edit, Trash2 } from 'lucide-react';



const ViewEvent = () => {
  const { id } = useParams();
  const { showSnackbar, showDialog } = useGlobalUI();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { selectedEvent, loading, error } = useSelector((state) => state.event);

  const event = selectedEvent;


  useEffect(() => {
    dispatch(fetchEventById(id));
  }, [id])

  // Delete row handler
  const onDeleteEvent = async (event) => {
    showDialog(
      "Confirm Deletion",
      `Are you sure you want to delete the : ${event.title} event?`,
      async () => {
        try {
          await dispatch(deleteEvent(id)).unwrap();
          showSnackbar("Event deleted successfully!", "success");
          navigate("/admin/manage-events");
        } catch (error) {
          showSnackbar(
            error.message || "Failed to delete Event.",
            "error"
          );
        }
      }
    );
  };


  if (loading) {
    return (
      <div className="h-full flex items-center justify-center">
        <Loading />
      </div>
    );
  }
  else if (error) {
    return (
      <div className="p-4 flex items-center justify-center">
        <p className="text-red-500">Error: {error}</p>
      </div>
    )
  }


  return (
    <div className='relative p-8 space-y-4'>
      <div className="absolute top-8 right-8 space-x-2">
        <button
          type="button"
          className="p-4 bg-blue-700 text-white py-2 rounded-lg hover:bg-blue-800"
          onClick={() => navigate(`/admin/manage-events/update/${id}`)}
        >
          <Edit />
        </button>
        <button
          type="button"
          onClick={() => onDeleteEvent(event)}
          className="p-4 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600"
        >
          <Trash2 />
        </button>

      </div>

      <SingleEvent />

      <div className="bg-white shadow-md p-4 rounded-lg">
        <h2 className="text-lg font-bold mb-2">Participants</h2>
        {event?.tickets.length > 0 ? (
          <table className="w-full text-right">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-2 text-left">Name</th>
                <th className="p-2">Tickets Count</th>
                <th className="p-2">Ticket Date</th>
                <th className="p-2">Total Price</th>
              </tr>
            </thead>
            <tbody>
              {event.tickets.map((ticket) => (
                <tr key={ticket._id} className="border-b">
                  <td className="p-2 text-left">{ticket.name}</td>
                  <td className="p-2">{ticket.numberOfTickets}</td>
                  <td className="p-2">{ticket.createdAt?.split("T")[0]}</td>
                  <td className="p-2">{ticket.totalPrice}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No tickets found.</p>
        )}
      </div>

    </div>
  )
}

export default ViewEvent
