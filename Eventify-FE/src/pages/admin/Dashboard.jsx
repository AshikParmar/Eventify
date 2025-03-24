import React, { useState, useEffect } from "react";
import Card from "../../components/ui/card";
import { Calendar, Users, Activity } from "lucide-react";
import TotalEvents from "../../components/admin/dashboardTables/TotalEventsTable";
import UsersList from "../../components/admin/dashboardTables/UsersList";
import UpcomingEvents from "../../components/admin/dashboardTables/UpcomingEventsTable";
import { useSelector,useDispatch } from "react-redux";
import { fetchEvents } from "../../redux/slices/eventSlice";
import { fetchUsers } from "../../redux/slices/userListSlice";

const Dashboard = () => {

  const { events , pendingEvents } = useSelector((state) => state.event);
  const { users } = useSelector((state) => state.userList);

  const [activeTable, setActiveTable] = useState("");
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
      <h2 className="text-2xl font-bold">Dashboard</h2>

    
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div onClick={()=>setActiveTable("events")}><Card title="Total Events" value={events?.length} icon={<Calendar />} /></div>
        <div onClick={()=>setActiveTable("users")}><Card title="Users Enrolled" value={users?.length} icon={<Users />} /></div>
        <div onClick={()=>setActiveTable("upcoming")}><Card title="Upcoming Events" value={pendingEvents?.length} icon={<Activity />} /></div>
      </div>


      {renderTable()}
      
    </div>
  );
};

export default Dashboard;
