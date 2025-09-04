import React from 'react';
import './SlotItem.css';

const SlotItem = ({ slot, index, isBookedByYou, onSlotClick }) => {
    const getStatusLabel = () => {
        if (slot.isPast) return "Past";
        if (isBookedByYou) return "Your booking";
        if (slot.available) return "Available";
        if (slot.isBooked) return "Booked";
        return "Unavailable";
    };

    const getStatusClass = () => {
        if (slot.isPast) return "past";
        if (isBookedByYou) return "yours";
        if (slot.available) return "available";
        return "booked";
    };

    const handleClick = () => {
        if (slot.available && !isBookedByYou) {
            onSlotClick(slot);
        }
    };

    const statusLabel = getStatusLabel();
    const statusClass = getStatusClass();

    return (
        <div
            className={`slot-item ${statusClass}`}
            onClick={handleClick}
        >
            <div className="slot-time">{slot.displayTime}</div>
            <div className="slot-status">{statusLabel}</div>
        </div>
    );
};

export default SlotItem;
