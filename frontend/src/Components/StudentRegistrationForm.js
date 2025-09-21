import React from 'react';

const StudentRegistrationForm = () => {
    return (
        <div style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '8px' }}>
            <h3>Student Registration</h3>
            <form>
                <input type="text" placeholder="Username" required />
                <input type="email" placeholder="Email ID" required />
                <input type="text" placeholder="Degree" required />
                <input type="text" placeholder="Department" required />
                <input type="text" placeholder="Graduation Year" required />
                <input type="text" placeholder="LinkedIn" />
                <input type="text" placeholder="Enrollment No." required />
                <input type="password" placeholder="Password" required />
                <input type="password" placeholder="Confirm Password" required />
                <button type="button">Get OTP</button>
                <button type="submit">Sign up</button>
            </form>
        </div>
    );
};

export default StudentRegistrationForm;