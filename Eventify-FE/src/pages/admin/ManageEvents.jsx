import React, { useEffect, useState } from "react";
import Button from "../../components/ui/button";
import { Plus, Edit, Trash2, FileText } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { deleteEvent, fetchEvents } from "../../redux/slices/eventSlice";
import { NavLink } from "react-router-dom";
import { useGlobalUI } from "../../components/Global/GlobalUIContext";
import Loading from "../../components/ui/Loading";

const ManageEvents = () => {
  const { showSnackbar, showDialog } = useGlobalUI();
  const { events, loading, error } = useSelector((state) => state.event);
  const dispatch = useDispatch();

  const [searchQuery, setSearchQuery] = useState("");
  const [filterProperty, setFilterProperty] = useState("type");
  const [filterValue, setFilterValue] = useState("");

  useEffect(()=>{

    const fetchingData = async() => {
      try{
        const response = await dispatch(fetchEvents());
  
        // console.log(response);
      }catch(e){
        console.log(e?.message);
      }
    }

    fetchingData();
  }, []);

  // Get unique values for the selected property
  const getUniqueValues = (property) => {
    return [...new Set(events.map((event) => event[property]))].filter(Boolean);
  };

  // Filter events based on searchQuery or selected filter
  const filteredEvents = events.filter((event) => {
    const matchesSearch = event?.type?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterValue ? event[filterProperty] === filterValue : true;
    return matchesSearch && matchesFilter;
  });

  // Delete row handler
  const onDeleteEvent = async (event) => {
    showDialog(
      "Confirm Deletion",
      `Are you sure you want to delete the : ${event.title} event?`,
      async () => {
        try {
          await dispatch(deleteEvent(event._id)).unwrap();
          showSnackbar("Event deleted successfully!", "success");
          dispatch(fetchEvents());
        } catch (error) {
          showSnackbar(error.message || "Failed to delete Event.", "error");
        }
      }
    );
  };

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center">
        <Loading title="Loading..." />
      </div>
    );
  } else if (error) {
    return (
      <div className="h-[80%] flex items-center justify-center">
        <p className="text-red-500">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold mb-4">Manage Events</h2>

      {/* Search and Filter Controls */}
      <div className="flex justify-between items-center mb-4">
        
        {/* Search Input */}

        <div className="space-x-2">
        <input
          type="text"
          placeholder="Search event..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border p-2 rounded-lg "
        />

        {/* Property Selector */}
        <select
          value={filterProperty}
          onChange={(e) => {
            setFilterProperty(e.target.value);
            setFilterValue(""); // Reset selected value when changing property
          }}
          className="border p-2 rounded-lg"
        >
          <option value="type">Type</option>
          <option value="venue">Venue</option>
          <option value="status">Status</option>
        </select>

        {/* Value Selector */}
        <select
          value={filterValue}
          onChange={(e) => setFilterValue(e.target.value)}
          className="border p-2 rounded-lg"
        >
          <option value="">All</option>
          {getUniqueValues(filterProperty).map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </select>
        </div>
        <NavLink to="/admin/manage-events/create">
          <Button className="bg-blue-600 text-white flex items-center">
            <Plus className="mr-2" /> Add New Event
          </Button>
        </NavLink>
      </div>

      {/* Events Table */}
      <table className="w-full bg-white shadow-md rounded-lg">
        <thead className="bg-gray-200 text-left">
          <tr>
            <th className="p-3">ID</th>
            <th className="p-3">Title</th>
            <th className="p-3">Date</th>
            <th className="p-3">Venue</th>
            <th className="p-3">Price</th>
            <th className="p-3">Slots</th>
            <th className="p-3">Status</th>
            <th className="text-center p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredEvents.length > 0 ? (
            filteredEvents.map((event, id) => (
              <tr key={event._id} className="border-b w-full">
                <td className="p-3">{id + 1}.</td>
                <td className="p-3">{event.title}</td>
                <td className="p-3">{event.date}</td>
                <td className="p-3">{event.venue}</td>
                <td className="p-3">{event.price}</td>
                <td className="p-3">{event.totalSlots}</td>
                <td className="p-3">{event.status}</td>
                <td className="p-3 flex justify-center space-x-2">
                  <NavLink to={`/admin/manage-events/view/${event._id}`}>
                    <Button className="bg-green-500 hover:bg-green-600 text-white">
                      <FileText />
                    </Button>
                  </NavLink>
                  <NavLink to={`/admin/manage-events/update/${event._id}`}>
                    <Button className="bg-blue-500 hover:bg-blue-600 text-white">
                      <Edit />
                    </Button>
                  </NavLink>
                  <Button
                    onClick={() => onDeleteEvent(event)}
                    className="bg-red-500 hover:bg-red-600 text-white"
                  >
                    <Trash2 />
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" className="text-center p-4 text-gray-700">
                No events found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ManageEvents;
