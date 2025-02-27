import React, { useEffect } from "react";
import Button from "../../components/ui/button";
import { Plus, Edit, Trash2, FileText } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { deleteEvent, fetchEvents } from "../../redux/slices/eventSlice";
import { NavLink, useNavigate } from "react-router-dom";

const ManageEvents = ({ set }) => {
  const navigate = useNavigate();

  const { events, loading, error } = useSelector((state) => state.event);

  const dispatch = useDispatch();

  const fetchData = () => {
    dispatch(fetchEvents());
  }
  useEffect(() => {
    fetchData();
  }, [])


  // Delete row handler
  const onDeleteEvent = async (event) => {
    // showDialog(
    //   "Confirm Deletion",
    //   `Are you sure you want to delete the : ${event.title} event?`,
    //   async () => {
    try {
      await dispatch(deleteEvent(event._id)).unwrap();
      showSnackbar("Event deleted successfully!", "success");

      fetchData();
    } catch (error) {
      showSnackbar(
        error.message || "Failed to delete Event.",
        "error"
      );
    }
  }
  //   );
  // };



  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold mb-4">Manage Events</h2>
      <NavLink
        to="/admin/manage-events/create">
        <Button
          className="mb-4 bg-blue-600 text-white flex items-center">
          <Plus className="mr-2" /> Add New Event
        </Button>
      </NavLink>
      <table className="w-full bg-white shadow-md rounded-lg">
        <thead className="bg-gray-200 text-left">
          <tr>
            <th className="p-3">ID</th>
            <th className="p-3">Title</th>
            <th className="p-3">Date</th>
            <th className="p-3">venue</th>
            <th className="p-3">Price</th>
            <th className="p-3">Slots</th>
            <th className="p-3">Status</th>
            <th className="text-center p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {events.map((event, id) => (
            <tr
              key={event._id}
              className="border-b w-full"
            >
              <td className="p-3">{id + 1}.</td>
              <td className="p-3">{event.title}</td>
              <td className="p-3">{event.date}</td>
              <td className="p-3">{event.venue}</td>
              <td className="p-3">{event.price}</td>
              <td className="p-3">{event.totalSlots}</td>
              <td className="p-3">{event.status}</td>

              <td className="p-3 flex justify-center space-x-2  ">
                <NavLink to={`/admin/manage-events/view/${event._id}`}>
                  <Button className="bg-green-500 hover:bg-green-600 text-white cursor-pointer">
                    <FileText />
                  </Button>
                </NavLink>

                <NavLink to={`/admin/manage-events/update/${event._id}`}>
                  <Button
                    className="bg-blue-500 hover:bg-blue-600 text-white cursor-pointer "
                  >
                    <Edit />
                  </Button>
                </NavLink>

                <Button
                  onClick={() => onDeleteEvent(event)}
                  className="bg-red-500 hover:bg-red-600 text-white cursor-pointer">
                  <Trash2 />
                </Button>

              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageEvents;
