import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateEvent } from "../../redux/slices/eventSlice";
import { useNavigate, useParams } from "react-router-dom";
import { X } from "lucide-react";
import { useGlobalUI } from "../Global/GlobalUIContext";
import Loading from "../ui/Loading";

const UpdateEvent = () => {

    const { showSnackbar } = useGlobalUI();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams(); // Get event ID from URL params
    const [imagePreview, setImagePreview] = useState(null);
    const fileInputRef = useRef(null);

    const eventTypes = [
        "Technical",
        "Cultural",
        "Sports",
        "Hackathon",
        "Workshop",
        "Seminar",
        "Quiz Competition",
        "Coding Competition",
        "Other"
    ];

    const { events, loading, error } = useSelector((state) => state.event);
    let existingEvent = {};
    useEffect(() => {
        existingEvent = events.find((event) => event._id === id);
    }, [])


    const [formData, setFormData] = useState({
        title: "",
        type: "",
        venue: "",
        date: "",
        startTime: "",
        endTime: "",
        duration: "",
        price: "",
        totalSlots: "",
        availableSlots: "",
        description: "",
        image: null,
    });

    useEffect(() => {
        existingEvent = events.find((event) => event._id === id);
        if (existingEvent) {
            setFormData(existingEvent);
            setImagePreview(existingEvent.image);
        }
    }, []);

    const handleChange = (e) => {
        if (e.target.name === "image") {
            const file = e.target.files[0];

            if (file) {
                setFormData({ ...formData, image: file });

                const reader = new FileReader();
                reader.onloadend = () => {
                    setImagePreview(reader.result); // Set preview URL correctly
                };
                reader.readAsDataURL(file); // ✅ Use "file" instead of formData.image
            }
        } else {
            setFormData({ ...formData, [e.target.name]: e.target.value });
        }

    };

    const handleRemoveImage = () => {
        setImagePreview(null); // Remove preview
        setFormData({ ...formData, image: null }); // Reset form data

        // Reset input field value
        if (fileInputRef.current) {
            fileInputRef.current.value = ""; // Clears input field
        }
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        const updatedEvent = new FormData();
        Object.keys(formData).forEach((key) => {
            updatedEvent.append(key, formData[key]);
        });

        try {
            // console.log("FormData content:", Object.fromEntries(updatedEvent.entries()));
            const response = await dispatch(updateEvent(updatedEvent));
            console.log(response);


            showSnackbar("Event updated successfully!", "success");
            navigate("/admin/manage-events");
        } catch (error) {
            console.error("Error updating event:", error);
            showSnackbar("Failed to update event!", "error");
        }
    };


    if (loading) {
        return (
          <div className="h-full flex items-center justify-center">
           <Loading title="Updating..." />
          </div>
        );
      } 

    return (
        <div className="m-10 p-6 bg-white shadow-lg rounded-lg ">
             {error && (
                <p className="text-red-500">Error: {error}</p>
            )}
            
            <h2 className="text-2xl font-bold mb-6 text-center">Update Event</h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
                {/* Event Title */}
                <div className="flex flex-col">
                    <label className="text-gray-700 font-medium">Event Title</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        className="bg-gray-300 p-2 rounded-sm"
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Event Type */}
                <div className="flex flex-col">
                    <label className="text-gray-700 font-medium">Event Type</label>
                    <select
                        name="type"
                        className="p-2 bg-gray-300 rounded-md"
                        onChange={handleChange}
                        required
                        value={formData.type}
                    >
                        <option value="" disabled>Select an event type</option>
                        {eventTypes.map((type, index) => (
                            <option key={index} value={type}>{type}</option>
                        ))}
                    </select>
                </div>

                {/* Venue */}
                <div className="flex flex-col">
                    <label className="text-gray-700 font-medium">Venue</label>
                    <input
                        type="text"
                        name="venue"
                        value={formData.venue}
                        className="bg-gray-300 p-2 rounded-sm"
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Date & Duration */}
                <div className="flex gap-4 col-span-1">
                    <div className="flex flex-col">
                        <label className="text-gray-700 font-medium">Date</label>
                        <input
                            type="date"
                            name="date"
                            value={formData.date}
                            className="bg-gray-300 p-2 rounded-sm"
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-gray-700 font-medium">Duration</label>
                        <input
                            type="text"
                            name="duration"
                            value={formData.duration}
                            className="bg-gray-300 p-2 rounded-sm"
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>

                {/* Start Time & End Time */}
                <div className="col-span-2 flex flex-wrap gap-4">
                    <div className="flex flex-col">
                        <label className="text-gray-700 font-medium">Start Time</label>
                        <input
                            type="time"
                            name="startTime"
                            value={formData.startTime}
                            className="bg-gray-300 p-2 rounded-sm"
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-gray-700 font-medium">End Time</label>
                        <input
                            type="time"
                            name="endTime"
                            value={formData.endTime}
                            className="bg-gray-300 p-2 rounded-sm"
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>

                {/* Total Slots & Available Slots */}
                <div className="flex gap-4 col-span-2">
                    <div className="flex flex-col">
                        <label className="text-gray-700 font-medium">Total Slots</label>
                        <input
                            type="number"
                            name="totalSlots"
                            value={formData.totalSlots}
                            className="bg-gray-300 p-2 rounded-sm"
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-gray-700 font-medium">Available Slots</label>
                        <input
                            type="number"
                            name="availableSlots"
                            value={formData.availableSlots}
                            className="bg-gray-300 p-2 rounded-sm"
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>

                {/* Event Price */}
                <div className="flex flex-col">
                    <label className="text-gray-700 font-medium">Ticket Price</label>
                    <input
                        type="number"
                        name="price"
                        placeholder="Enter price"
                        value={formData.price}
                        className="bg-gray-300 w-50 p-2 rounded-sm"
                        onChange={handleChange}
                    />
                </div>

                {/* Event Description */}
                <div className="col-span-2 flex flex-col">
                    <label className="text-gray-700 font-medium">Event Description</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        className="bg-gray-300 p-2 rounded-sm h-24"
                        onChange={handleChange}
                        required
                    ></textarea>
                </div>

                {/* Upload Image */}
                <div className="flex flex-col">
                    <label className="text-gray-700 font-medium">Upload Image</label>
                    <input
                        type="file"
                        name="image"
                        ref={fileInputRef}
                        className="bg-gray-300 p-2 rounded-sm"
                        onChange={handleChange}
                        accept="image/*"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                        Recommended size: **1000x600px** (5:3 aspect ratio). Supports JPG, PNG, and GIF.
                    </p>
                </div>
                {imagePreview && (
                    <div className="relative w-80">
                        <p className="text-gray-600">Image Preview:</p>
                        <img src={imagePreview} alt="Preview" className="w-80 h-40 object-cover rounded-md border" />
                        <button
                            className="absolute top-2 right-2 bg-gray-700 text-white rounded-full p-1 hover:bg-gray-800"
                            onClick={handleRemoveImage}
                        >
                            <X size={20} />
                        </button>
                    </div>
                )}

                {/* Submit Button */}
                <div className="col-span-2 mt-2 flex justify-center gap-6">
                    <button
                        type="button"
                        onClick={() => navigate(-1)}
                        className="w-40 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="w-40 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
                    >
                        Update Event
                    </button>
                </div>
            </form>

        </div>
    );
};

export default UpdateEvent;
