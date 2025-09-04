import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSlotBooking } from "./hooks/useSlotBooking";
import {
  Header,
  EmailForm,
  DatePicker,
  SlotGrid,
  BookingList,
  SuccessMessage,
  Loading,
} from "./components";
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

  // Handle email blur to fetch bookings
  const handleEmailBlur = () => {
    if (userEmail && userEmail.includes("@")) {
      fetchUserBookings();
    }
  };

  return (
    <div className="App">
      <div className="container">
        <Header />

        <div className="card">
          <EmailForm
            userEmail={userEmail}
            onEmailChange={handleEmailChange}
            onEmailBlur={handleEmailBlur}
          />

          <DatePicker
            selectedDate={selectedDate}
            onDateChange={handleDateChange}
            filterDate={filterDate}
          />

          <BookingList
            userBookings={userBookings}
            hasBookings={hasBookings}
            showBookings={showBookings}
            onToggleBookings={toggleBookings}
            userEmail={userEmail}
          />
        </div>

        <div className="card">
          <h2>Available Slots for {formattedSelectedDate}</h2>

          {loading ? (
            <Loading message="Loading available slots..." />
          ) : (
            <SlotGrid
              slots={slots}
              userEmail={userEmail}
              userBookings={userBookings}
              selectedDate={selectedDate}
              onSlotClick={handleSlotBooking}
            />
          )}
        </div>

        <SuccessMessage bookingSuccess={bookingSuccess} />
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
