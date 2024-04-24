import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const View_bookings = () => {
  const [bookings, setBookings] = useState([]);
  const { user } = useSelector((state) => state.profile);

  useEffect(() => {
    // Fetch bookings data from the server
    axios
      .post('http://localhost:3001/booking_venue', user)
      .then((response) => {
        if (response.data) {
          // console.log(response);
          setBookings(response.data);
        } else {
          console.error("Error fetching bookings: Response data is undefined");
        }
      })
      .catch((error) => {
        console.error("Error fetching bookings:", error);
      });
  }, []);

  const handleCancelBooking = (bookingId) => {
    // Implement cancel booking logic here
    console.log("Cancel booking for ID:", bookingId);
  };

  return (
    <div className="flex flex-col justify-center items-center mx-auto ">
      <h1 className="text-2xl font-semibold my-4 mb-[2rem]">Your Bookings</h1>
      <div className="overflow-x-auto p-2 border rounded-lg bg-gray-500  ">
        <table className="border bg-white">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2">Booking Name</th>
              <th className="px-4 py-2">Phone</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">Slot</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking, index) => (
              <tr key={index} className="border-b border-gray-400 ">
                <td className="px-4 py-2">{booking.booking_username}</td>
                <td className="px-4 py-2">{booking.booking_phone}</td>
                <td className="px-4 py-2">{booking.booking_email}</td>
                <td className="px-4 py-2">{booking.booking_date}</td>
                <td className="px-4 py-2">{booking.preferred_slot}</td>
                <td className="px-4 py-2">
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded-full"
                    onClick={() => handleCancelBooking(booking.booking_id)}
                  >
                    Cancel
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default View_bookings;
