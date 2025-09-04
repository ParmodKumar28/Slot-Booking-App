import React from 'react';
import DatePickerLib from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './DatePicker.css';

const DatePicker = ({ selectedDate, onDateChange, filterDate }) => {
    return (
        <div className="form-group">
            <label className="form-label">Select Date:</label>
            <DatePickerLib
                selected={selectedDate}
                onChange={onDateChange}
                filterDate={filterDate}
                dateFormat="MMMM d, yyyy"
                className="form-input"
                placeholderText="Select a date"
                minDate={new Date()}
            />
        </div>
    );
};

export default DatePicker;
