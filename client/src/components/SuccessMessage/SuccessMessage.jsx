import React from 'react';
import moment from 'moment';
import './SuccessMessage.css';

const SuccessMessage = ({ bookingSuccess }) => {
    if (!bookingSuccess) return null;

    return (
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
    );
};

export default SuccessMessage;
