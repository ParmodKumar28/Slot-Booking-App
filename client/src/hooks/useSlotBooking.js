import { useState, useCallback, useEffect } from "react";
import moment from "moment";
import { slotService } from "../services/api";

export const useSlotBooking = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [bookingSuccess, setBookingSuccess] = useState(null);
  const [userBookings, setUserBookings] = useState([]);
  const [showBookings, setShowBookings] = useState(false);

  // Fetch available slots for selected date
  const fetchSlots = useCallback(async (date) => {
    setLoading(true);
    try {
      const formattedDate = moment(date).format("YYYY-MM-DD");
      const data = await slotService.getSlots(formattedDate);
      setSlots(data.slots);
    } catch (error) {
      console.error("Error fetching slots:", error);
      throw new Error("Failed to fetch available slots");
    } finally {
      setLoading(false);
    }
  }, []);

  // Book a slot
  const bookSlot = useCallback(
    async (slot) => {
      if (!userEmail) {
        throw new Error("Please enter your email address");
      }

      if (!userEmail.includes("@")) {
        throw new Error("Please enter a valid email address");
      }

      try {
        const formattedDate = moment(selectedDate).format("YYYY-MM-DD");
        const data = await slotService.bookSlot({
          date: formattedDate,
          time: slot.time,
          userEmail,
        });

        setBookingSuccess(data.booking);

        // Refresh slots to show updated availability
        await fetchSlots(selectedDate);

        // Refresh user bookings
        await fetchUserBookings();

        return data;
      } catch (error) {
        console.error("Error booking slot:", error);
        const status = error.response?.status;
        const serverMessage = error.response?.data?.error;
        if (status === 409) {
          throw new Error(
            serverMessage ||
              "This slot is already booked. Please select another time."
          );
        }
        throw new Error("Failed to book slot. Please try again.");
      }
    },
    [userEmail, selectedDate, fetchSlots]
  );

  // Fetch user's bookings
  const fetchUserBookings = useCallback(async () => {
    if (!userEmail) return;

    try {
      console.log("Fetching bookings for user:", userEmail);
      const data = await slotService.getUserBookings(userEmail);
      setUserBookings(data.bookings);
    } catch (error) {
      console.error("Error fetching user bookings:", error);
    }
  }, [userEmail]);

  // Debounced fetch of bookings after user stops typing email
  useEffect(() => {
    const isLikelyValid = userEmail && userEmail.includes("@");
    if (!isLikelyValid) {
      return;
    }
    const timer = setTimeout(() => {
      fetchUserBookings();
    }, 600);

    return () => clearTimeout(timer);
  }, [userEmail, fetchUserBookings]);

  // Handle date change
  const handleDateChange = useCallback((date) => {
    setSelectedDate(date);
    setBookingSuccess(null);
  }, []);

  // Handle email change
  const handleEmailChange = useCallback(({ target: { value } }) => {
    setUserEmail(value);
    setBookingSuccess(null);
  }, []);

  // Filter out past dates
  const filterDate = useCallback((date) => {
    return moment(date).isSameOrAfter(moment(), "day");
  }, []);

  // Toggle bookings display
  const toggleBookings = useCallback(() => {
    setShowBookings((prev) => {
      const next = !prev;
      if (next) {
        // When opening the bookings panel, fetch latest bookings immediately (if email looks valid)
        if (userEmail && userEmail.includes("@")) {
          setTimeout(() => {
            fetchUserBookings();
          }, 0);
        }
      }
      return next;
    });
  }, [fetchUserBookings, userEmail]);

  // Clear booking success
  const clearBookingSuccess = useCallback(() => {
    setBookingSuccess(null);
  }, []);

  return {
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
    clearBookingSuccess,

    // Computed values
    formattedSelectedDate: moment(selectedDate).format("MMMM D, YYYY"),
    hasBookings: userBookings.length > 0,
    availableSlots: slots.filter((slot) => slot.available),
    bookedSlots: slots.filter((slot) => !slot.available),
  };
};
