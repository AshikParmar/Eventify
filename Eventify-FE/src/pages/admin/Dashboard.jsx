import React, { useState, useEffect } from "react";
import Card from "../../components/ui/card";
import { Plus, Calendar, Users, Activity, CloudHail } from "lucide-react";
import TotalEvents from "../../components/dashboardTables/TotalEventsTable";
import UsersList from "../../components/dashboardTables/UsersList";
import UpcomingEvents from "../../components/dashboardTables/UpcomingEventsTable";
import { useSelector,useDispatch } from "react-redux";
import { fetchEvents } from "../../redux/slices/eventSlice";
import { fetchUsers } from "../../redux/slices/userListSlice";

const Dashboard = () => {

  const { events , ucEvents } = useSelector((state) => state.event);
  const { users } = useSelector((state) => state.userList);
  // console.log("events", events);
  // console.log("ucEvents",ucEvents);

  const [activeTable, setActiveTable] = useState("upcoming");
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(fetchEvents());
    dispatch(fetchUsers());
 }, [])

  const renderTable = () => {
    switch (activeTable) {
      case "events":
        return <TotalEvents/>;
      case "users":
        return <UsersList/>;
      case "upcoming":
        return <UpcomingEvents/>;
      default:
        return <UpcomingEvents/>;
    }
  };


  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold">Admin Dashboard</h2>

    
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div onClick={()=>setActiveTable("events")}><Card title="Total Events" value={events.length} icon={<Calendar />} /></div>
        <div onClick={()=>setActiveTable("users")}><Card title="Users Enrolled" value={users.length} icon={<Users />} /></div>
        <div onClick={()=>setActiveTable("upcoming")}><Card title="Upcoming Events" value={ucEvents.length} icon={<Activity />} /></div>
      </div>

      {/* Quick Actions */}
      {/* <div className="flex space-x-4">
        <button className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center">
          <Plus className="mr-2" /> Add New Event
        </button>
        <button className="bg-gray-700 text-white px-4 py-2 rounded-md">
          Manage Users
        </button>
      </div> */}

      {renderTable()}
      
    </div>
  );
};

export default Dashboard;
