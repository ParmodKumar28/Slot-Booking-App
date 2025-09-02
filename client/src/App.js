import { useEffect } from "react";
import moment from "moment";
import DatePicker from "react-datepicker";
import { ToastContainer, toast } from "react-toastify";
import "react-datepicker/dist/react-datepicker.css";
import "react-toastify/dist/ReactToastify.css";
import { useSlotBooking } from "./hooks/useSlotBooking";
import "./App.css";

const App = () => {
  const {
    // State
    selectedDate,
    slots,
    loading,
    userEmail,
    bookingSuccess,
    userBookings,
    showBookings,

    // Actions
    fetchSlots,
    bookSlot,
    fetchUserBookings,
    handleDateChange,
    handleEmailChange,
    filterDate,
    toggleBookings,

    // Computed values
    formattedSelectedDate,
    hasBookings,
  } = useSlotBooking();

  // Handle slot booking with toast notifications
  const handleSlotBooking = async (slot) => {
    try {
      await bookSlot(slot);
      toast.success("Slot booked successfully!");
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Load slots when date changes
  useEffect(() => {
    fetchSlots(selectedDate).catch((error) => {
      toast.error(error.message);
    });
  }, [selectedDate, fetchSlots]);

  // Check if a slot is booked by current email for selected date
  const isSlotBookedByYou = (slot) => {
    if (!userEmail) return false;
    const dateKey = moment(selectedDate).format("YYYY-MM-DD");
    return userBookings.some(
      (b) =>
        b.userEmail === userEmail && b.date === dateKey && b.time === slot.time
    );
  };

  const renderSlotItem = (slot, index) => {
    const yourBooking = isSlotBookedByYou(slot);
    const statusLabel = slot.isPast
      ? "Past"
      : yourBooking
      ? "Your booking"
      : slot.available
      ? "Available"
      : slot.isBooked
      ? "Booked"
      : "Unavailable";
    const statusClass = slot.isPast
      ? "past"
      : yourBooking
      ? "yours"
      : slot.available
      ? "available"
      : "booked";
    return (
      <div
        key={index}
        className={`slot-item ${statusClass}`}
        onClick={() =>
          slot.available && !yourBooking && handleSlotBooking(slot)
        }
      >
        <div className="slot-time">{slot.displayTime}</div>
        <div className="slot-status">{statusLabel}</div>
      </div>
    );
  };

  const renderBookingItem = (booking) => (
    <div key={booking.id} className="slot-item booked">
      <div className="slot-time">{booking.displayTime}</div>
      <div className="slot-status">{booking.displayDate}</div>
    </div>
  );

  return (
    <div className="App">
      <div className="container">
        <div className="header">
          <h1>📅 Slot Booking System</h1>
          <p>
            Book your 30-minute appointment slots between 9:00 AM and 5:00 PM
          </p>
        </div>

        <div className="card">
          <div className="form-group">
            <label className="form-label">Your Email Address:</label>
            <input
              type="email"
              className="form-input"
              value={userEmail}
              onChange={handleEmailChange}
              onBlur={() => {
                if (userEmail && userEmail.includes("@")) {
                  fetchUserBookings();
                }
              }}
              placeholder="Enter your email address"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Select Date:</label>
            <DatePicker
              selected={selectedDate}
              onChange={handleDateChange}
              filterDate={filterDate}
              dateFormat="MMMM d, yyyy"
              className="form-input"
              placeholderText="Select a date"
              minDate={new Date()}
            />
          </div>

          {userEmail && (
            <div className="form-group">
              <button className="btn btn-secondary" onClick={toggleBookings}>
                {showBookings ? "Hide My Bookings" : "Show My Bookings"}
              </button>
            </div>
          )}

          {showBookings && hasBookings && (
            <div className="card">
              <h3>Your Bookings</h3>
              <div className="slot-grid">
                {userBookings.map(renderBookingItem)}
              </div>
            </div>
          )}

          {showBookings && !hasBookings && (
            <div className="card">
              <p>No bookings found for this email address.</p>
            </div>
          )}
        </div>

        <div className="card">
          <h2>Available Slots for {formattedSelectedDate}</h2>

          {loading ? (
            <div className="loading">Loading available slots...</div>
          ) : (
            <>
              {slots.length > 0 ? (
                <div className="slot-grid">{slots.map(renderSlotItem)}</div>
              ) : (
                <p>No slots available for this date.</p>
              )}
            </>
          )}
        </div>

        {bookingSuccess && (
          <div className="card">
            <div className="success-message">
              <h3>✅ Booking Confirmed!</h3>
              <p>
                Your slot has been successfully booked for{" "}
                <strong>{bookingSuccess.displayTime}</strong> on{" "}
                <strong>
                  {moment(bookingSuccess.date).format("MMMM D, YYYY")}
                </strong>
              </p>
            </div>
          </div>
        )}
      </div>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default App;
