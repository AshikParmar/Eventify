import React from 'react'
import SingleEvent from '../SingleEvent'
import { useNavigate, useParams } from 'react-router-dom'
import { deleteEvent } from '../../redux/slices/eventSlice';
import { useDispatch } from 'react-redux';

const ViewEvent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

   // Delete row handler
    const onDeleteEvent = async (id) => {
      // showDialog(
      //   "Confirm Deletion",
      //   `Are you sure you want to delete the : ${event.title} event?`,
      //   async () => {
      try {
        await dispatch(deleteEvent(id)).unwrap();
        // showSnackbar("Event deleted successfully!", "success");
        navigate(-1);
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
    <div className='h-screen'>
     
        <SingleEvent />
  
      <div className="-mt-22 flex justify-center gap-6">
      <button
          type="button"
          className="w-40 bg-blue-700 text-white py-2 rounded-lg hover:bg-blue-800"
          onClick={()=> navigate(`/admin/manage-events/update/${id}`)}
        >
          Update
        </button>
        <button
          type="button"
          onClick={() => onDeleteEvent(id)}
          className="w-40 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600"
        >
          Delete
        </button>
       
      </div>
    </div>
  )
}

export default ViewEvent
