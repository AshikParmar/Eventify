import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { addEvent } from "../../redux/slices/eventSlice";
import { useNavigate } from "react-router-dom";
import { X } from "lucide-react";

const CreateEvent = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
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

    const [imagePreview, setImagePreview] = useState(null);
    const fileInputRef = useRef(null);

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

        const data = new FormData();
        Object.keys(formData).forEach((key) => {
            data.append(key, formData[key]);
        });

        try {
            const response = await dispatch(addEvent(data));
            console.log(response);
            // console.log("Form Submitted", formData);
            alert("Event created successfully!");
            navigate(-1);
        }
        catch (e) {
            console.log(e.messege);
        }
    };

    return (
        <div className="m-10 p-6 bg-white shadow-lg rounded-lg ">
            <h2 className="text-2xl font-bold mb-6 text-center">Create Event</h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
                {/* Event Title */}
                <div className="flex flex-col">
                    <label className="text-gray-700 font-medium">Event Title</label>
                    <input
                        type="text"
                        name="title"
                        placeholder="Enter event title"
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
                        defaultValue=""
                    >
                        <option value="" className="text-gray-500">
                            Select an event type
                        </option>
                        {eventTypes.map((type, index) => (
                            <option key={index} value={type}>
                                {type}
                            </option>
                        ))}
                    </select>

                </div>

                {/* Venue */}
                <div className="flex flex-col">
                    <label className="text-gray-700 font-medium">Venue</label>
                    <input
                        type="text"
                        name="venue"
                        placeholder="Enter venue"
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
                            placeholder="Duration (e.g., 2 Days)"
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
                            className="bg-gray-300 p-2 rounded-sm"
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>

                {/* Total Slots & Available Slots */}
                <div className="flex gap-4 col-span-2 ">
                    <div className="flex flex-col">
                        <label className="text-gray-700 font-medium">Total Slots</label>
                        <input
                            type="number"
                            name="totalSlots"
                            placeholder="Enter total slots"
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
                            placeholder="Enter available slots"
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
                        className="bg-gray-300 w-50 p-2 rounded-sm"
                        onChange={handleChange}
                    />
                </div>

                {/* Event Description */}
                <div className="col-span-2 flex flex-col">
                    <label className="text-gray-700 font-medium">Event Description</label>
                    <textarea
                        name="description"
                        placeholder="Describe the event"
                        className="bg-gray-300 p-2 rounded-sm h-24"
                        onChange={handleChange}
                        required
                    ></textarea>
                </div>

                {/* Upload Image */}
                <div className="flex flex-col ">
                    <label className="text-gray-700 font-medium">Upload Image</label>
                    <input
                        type="file"
                        name="image"
                        ref={fileInputRef} 
                        className="bg-gray-300 p-2 rounded-sm"
                        onChange={handleChange}
                        accept="image/*"
                    />
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
                <div className="col-span-2 mt-2 gap-6 flex justify-center">

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
                        Create Event
                    </button>
                </div>
            </form>

        </div>
    );
};

export default CreateEvent;
