import React, { useEffect, useState } from "react";
import TicketCard from "../../components/TicketCard";
import { getUserTickets } from "../../redux/services/eventJoin";

const MyTickets = () => {
    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTickets = async () => {
            setLoading(true);
            try {
                const res = await getUserTickets();
                // console.log(res)
                setTickets(res.tickets);
            } catch (err) {
                setError(err.message || "Failed to load tickets");
            } finally {
                setLoading(false);
            }
        };

        fetchTickets();
    }, []);

    return (
        <div>
            <h2 className="text-xl font-semibold mb-4">My Tickets</h2>

            {loading && <p>Loading...</p>}
            {error && <p className="text-red-500">{error}</p>}
            
            <div className="flex flex-wrap gap-4">
                {tickets?.length > 0 ? (
                    tickets.map((ticket) => <TicketCard key={ticket._id} ticket={ticket} />)
                ) : (
                    <div className="text-gray-500 text-center w-full py-4">
                        No Tickets Found
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyTickets;
