import React from 'react';
import './BookingList.css';

const BookingList = ({ userBookings, hasBookings, showBookings, onToggleBookings, userEmail }) => {
    const renderBookingItem = (booking) => (
        <div key={booking.id} className="slot-item yours">
            <div className="slot-time">{booking.displayTime}</div>
            <div className="slot-status">{booking.displayDate}</div>
        </div>
    );

    if (!userEmail) return null;

    return (
        <>
            <div className="form-group">
                <button className="btn btn-secondary" onClick={onToggleBookings}>
                    {showBookings ? "Hide My Bookings" : "Show My Bookings"}
                </button>
            </div>

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
        </>
    );
};

export default BookingList;
