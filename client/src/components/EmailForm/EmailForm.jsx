import React from 'react';
import './EmailForm.css';

const EmailForm = ({ userEmail, onEmailChange, onEmailBlur }) => {
    return (
        <div className="form-group">
            <label className="form-label">Your Email Address:</label>
            <input
                type="email"
                className="form-input"
                value={userEmail}
                onChange={onEmailChange}
                onBlur={onEmailBlur}
                placeholder="Enter your email address"
                required
            />
        </div>
    );
};

export default EmailForm;
