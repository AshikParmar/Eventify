import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { fetchUserById } from "../../redux/slices/userListSlice";
import Loading from "../ui/Loading";
import { IoMdArrowBack } from "react-icons/io";

const ViewUserPage = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { selectedUser, loading, error } = useSelector((state) => state.userList);

    useEffect(() => {
        dispatch(fetchUserById(id));
    }, [id]);

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
        <div className="bg-gray-100 p-4">
            <button
                onClick={() => navigate(-1)}
                className="inline-flex gap-2 items-center mb-4 px-4 py-2 bg-blue-light text-black font-semibold rounded-lg hover:bg-blue-500 transition">
                <IoMdArrowBack className="w-5 h-5" /> Back
            </button>
            <div className="mb-4 p-4 bg-white rounded-lg shadow-lg">
                <h2 className="text-lg font-bold">User Details</h2>
                <p><strong>Name:</strong> {selectedUser?.username}</p>
                <p><strong>Email:</strong> {selectedUser?.email}</p>
                <p><strong>Joined:</strong> {selectedUser?.createdAt?.split("T")[0] || "N/A"}</p>
            </div>

            <div className="p-4 bg-white rounded-lg shadow-lg">
                <h2 className="text-lg font-bold mb-4">User Tickets</h2>
                {selectedUser?.myTickets.length > 0 ? (
                    <table className="w-full text-right">
                    <thead>
                      <tr className="bg-gray-200">
                        <th className="p-2 text-left">Event Name</th>
                        <th className="p-2">Tickets Count</th>
                        <th className="p-2">Ticket Date</th>
                        <th className="p-2">Total Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedUser.myTickets.map((ticket) => (
                        <tr key={ticket._id} className="border-b">
                          <td className="p-2 text-left">{ticket.eventName}</td>
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
    );
};

export default ViewUserPage;
