import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { addEvent } from "../../redux/slices/eventSlice";
import { useNavigate } from "react-router-dom";
import { X } from "lucide-react";
import { useGlobalUI } from "../Global/GlobalUIContext";
import Loading from "../ui/Loading";

const CreateEvent = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const { showSnackbar } = useGlobalUI();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const eventTypes = [
        "Technical", "Cultural", "Sports", "Hackathon", "Workshop",
        "Seminar", "Quiz Competition", "Coding Competition", "Other"
    ];

    const [imagePreview, setImagePreview] = useState(null);
    const fileInputRef = useRef(null);


    const [formData, setFormData] = useState({
        title: "",
        type: "",
        venue: "",
        date: "",
        endDate: "",
        isSingleDay: false,
        startTime: "",
        endTime: "",
        price: "",
        totalSlots: "",
        description: "",
        image: null,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === "image") {
            const file = e.target.files[0];
            if (file) {
                setFormData({ ...formData, image: file });
                const reader = new FileReader();
                reader.onloadend = () => setImagePreview(reader.result);
                reader.readAsDataURL(file);
            }
        // }else if (name === "date") {
        //     setFormData({
        //         ...formData,
        //         date: value,
        //         endDate: isSingleDay ? value : formData.endDate
        //     });
        // } else if (name === "endDate") {
        //     setFormData({ ...formData, endDate: value });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const toggleSingleDayChange = () => {
        setFormData({
            ...formData,
            endDate: "",
            isSingleDay : !formData.isSingleDay 
        });
    };

    const handleRemoveImage = () => {
        setImagePreview(null);
        setFormData({ ...formData, image: null });

        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const formDataObject = new FormData();
            Object.entries(formData).forEach(([key, value]) => {
                if (value) formDataObject.append(key, value);
            });

            const response = await dispatch(addEvent(formDataObject));

            if (response.payload.success) {
                showSnackbar("Event created successfully!", "success");
                navigate(-1);
            } else {
                showSnackbar(response?.payload?.message || "Event creation failed.", "error");
                setError(response?.payload?.message);
            }
        } catch (e) {
            setError(e.message || "An error occurred.");
        } finally {
            setLoading(false);
        }
    };


    if (loading) {
        return (
            <div className="h-full flex items-center justify-center">
                <Loading title="Creating.." />
            </div>
        );
    }


    return (
        <div className="m-10 p-6 bg-white shadow-lg rounded-lg ">
            {error && (
                <p className="text-red-500">Error: {error}</p>
            )}
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

                {/* Date & end Date */}
                <div className=" flex gap-4">
                    <div className="flex flex-col">
                        <label className="text-gray-700 font-medium">Date</label>
                        <input
                            type="date"
                            name="date"
                            min={new Date().toISOString().split("T")[0]}
                            className="bg-gray-300 p-2 rounded-sm"
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {formData.date &&
                        <div className="flex gap-4">
                            <label className="text-gray-700 font-medium flex items-center">
                                <input
                                    type="checkbox"
                                    className="mr-2"
                                    checked={formData.isSingleDay}
                                    onChange={toggleSingleDayChange}
                                />
                                Single-Day Event
                            </label>

                            {!formData.isSingleDay && (
                                <div className="flex flex-col">
                                    <label className="text-gray-700 font-medium">End Date</label>
                                    <input
                                        label="End Date"
                                        type="date"
                                        name="endDate"
                                        min={formData.date}
                                        className="bg-gray-300 p-2 rounded-sm"
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            )}
                        </div>
                    }
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
                <div className="flex flex-col col-span-2 ">

                    <label className="text-gray-700 font-medium">Total Slots</label>
                    <input
                        type="number"
                        name="totalSlots"
                        placeholder="Enter total slots"
                        className="bg-gray-300 p-2 w-50 rounded-sm"
                        onChange={handleChange}
                        required
                    />
                </div>


                {/* Event Price */}
                <div className="flex flex-col">

                    <label className="text-gray-700 font-medium">Ticket Price <span
                        className="text-xs italic text-gray-500 cursor-help"
                        title="You can leave this empty if the ticket is free."
                    >
                        (Optional)
                    </span></label>
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
                    <label className="text-gray-700 font-medium">Upload Image <span
                        className="text-xs italic text-gray-500 cursor-help"
                        title="You can leave this empty."
                    >
                        (Optional)
                    </span></label>
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
