import { createBooking, getUserBookings } from "../services/bookingService.js";

export const bookSlot = async (req, res, next) => {
  try {
    const { date, time, userEmail } = req.body;

    const booking = await createBooking({ date, time, userEmail });

    res.status(201).json({
      message: "Slot booked successfully",
      booking: {
        date: booking.date,
        time: booking.time,
        displayTime: booking.displayTime,
        userEmail: booking.userEmail,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getUserBookingsController = async (req, res, next) => {
  try {
    const { userEmail } = req.params;

    const result = await getUserBookings(userEmail);
    res.json(result);
  } catch (error) {
    next(error);
  }
};
