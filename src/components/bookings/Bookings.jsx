import { useState, useEffect } from "react";
import Header from "../common/Header";
import BookingsTable from "./BookingsTable";
import { cancelBooking, getAllBookings } from "../utils/ApiFunction";

export default function Bookings() {
  const [bookingInfo, setBookingInfo] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    console.log("useEffect in Bookings component is running");
    const timer = setTimeout(async () => {
      try {
        const result = await getAllBookings();
        console.log("Fetched bookings:", result);
        setBookingInfo(result);
      } catch (error) {
        console.error("Error fetching bookings:", error);
        setError(error.message);
      }
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleBookingCancellation = async (bookingId) => {
    try {
      await cancelBooking(bookingId);
      const data = await getAllBookings();
      setBookingInfo(data);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <section style={{ backgroundColor: "whitesmoke" }}>
      <Header title={"Existing Bookings"} />
      {error && <div className="text-danger">{error}</div>}

      {isLoading ? (
        <div>Loading existing bookings</div>
      ) : (
        <BookingsTable
          bookingInfo={bookingInfo}
          handleBookingCancellation={handleBookingCancellation}
        />
      )}
    </section>
  );
}
