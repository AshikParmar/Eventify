
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { useSelector } from "react-redux";
import { useGlobalUI } from "../../components/Global/GlobalUIContext";
import { useNavigate } from "react-router-dom";

const CalendarPage = () => {
 const { showDialog } = useGlobalUI();
 const navigate = useNavigate();
 const { events } = useSelector(state => state.event);

 const formattedEvents = events?.map(event => ({
    id: event._id, 
    title: event.title,
    start: event.date,
    // end: event.isSingleDay ? event.date : `${event.endDate}T${event.endTime}`,
    // backgroundColor: event.isSingleDay ? "#1976D2" : "#008077",
    // textColor: "#fff",
  }));

  return (
    <div className="p-4 m-4 md:m-8 md:mx-32 rounded-lg shadow-xl bg-gray-100 ">
      <h2 className="text-xl font-bold mb-4">Event Calendar</h2>

      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={formattedEvents}
        initialDate={new Date()}
        height="auto"
        eventBackgroundColor="#1976D2"
        eventTextColor="#fff"
        eventClick={(eventInfo)=>{
           showDialog(
                 `Event: ${eventInfo.event.title}`,
                 `Do you want to view more details about "${eventInfo.event.title}"?`,
                 () => {
                   navigate(`/events/${eventInfo.event.id}`)
                 }
               );
        }}
        
      />
    </div>
  );
}

export default CalendarPage;
