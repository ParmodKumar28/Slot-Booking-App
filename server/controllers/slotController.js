import { getSlotsForDate } from "../services/slotService.js";

export const getSlots = async (req, res, next) => {
  try {
    const { date } = req.params;
    console.log("Fetching slots for date:", date);

    const result = await getSlotsForDate(date);
    res.json(result);
  } catch (error) {
    next(error);
  }
};
