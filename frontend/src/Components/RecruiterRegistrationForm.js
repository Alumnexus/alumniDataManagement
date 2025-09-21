import React from 'react';

const RecruiterRegistrationForm = () => {
    return (
        <div style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '8px' }}>
            <h3>Recruiter Registration</h3>
            <form>
                <input type="text" placeholder="User ID" required />
                <input type="email" placeholder="Email" required />
                <input type="text" placeholder="Position" />
                <input type="text" placeholder="Company" />
                <input type="text" placeholder="Location" />
                <input type="password" placeholder="Password" required />
                <input type="password" placeholder="Confirm Password" required />
                <button type="button">Get OTP</button>
                <button type="submit">Sign up</button>
            </form>
        </div>
    );
};

export default RecruiterRegistrationForm;