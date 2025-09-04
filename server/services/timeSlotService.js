import moment from "moment";

// Generate time slots from 9:00 AM to 5:00 PM (30-minute intervals)
export const generateTimeSlots = () => {
  const slots = [];
  const startTime = moment("09:00", "HH:mm");
  const endTime = moment("17:00", "HH:mm");

  let currentTime = startTime.clone();

  while (currentTime.isBefore(endTime)) {
    slots.push({
      time: currentTime.format("HH:mm"),
      displayTime: currentTime.format("h:mm A"),
      available: true,
    });
    currentTime.add(30, "minutes");
  }

  return slots;
};

// Mark slots as past, booked, or available
export const processSlotAvailability = (slots, bookedSlots, date) => {
  const now = moment();
  const isToday = moment(date, "YYYY-MM-DD").isSame(now, "day");
  const currentTime = now.format("HH:mm");

  return slots.map((slot) => {
    const isBooked = bookedSlots.includes(slot.time);
    const isPast = isToday ? slot.time < currentTime : false;

    return {
      ...slot,
      isBooked,
      isPast,
      available: !isBooked && !isPast,
    };
  });
};
