import React from 'react';
import SlotItem from '../SlotItem/SlotItem';
import './SlotGrid.css';

const SlotGrid = ({ slots, userEmail, userBookings, selectedDate, onSlotClick }) => {
    // Check if a slot is booked by current email for selected date
    const isSlotBookedByYou = (slot) => {
        if (!userEmail) return false;
        const dateKey = new Date(selectedDate).toISOString().split('T')[0];
        return userBookings.some(
            (b) =>
                b.userEmail === userEmail && b.date === dateKey && b.time === slot.time
        );
    };

    if (slots.length === 0) {
        return <p>No slots available for this date.</p>;
    }

    return (
        <div className="slot-grid">
            {slots.map((slot, index) => (
                <SlotItem
                    key={index}
                    slot={slot}
                    index={index}
                    isBookedByYou={isSlotBookedByYou(slot)}
                    onSlotClick={onSlotClick}
                />
            ))}
        </div>
    );
};

export default SlotGrid;
