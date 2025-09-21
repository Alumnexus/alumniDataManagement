import React from 'react';

const AlumniRegistrationForm = () => {
    return (
        <div style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '8px',overflow: 'auto' }}>
            <h3>Alumni Registration</h3>
            <form>
                <input type="text" placeholder="Username" required />
                <input type="email" placeholder="Email ID" required />
                <input type="text" placeholder="Degree" required />
                <input type="text" placeholder="Department" required />
                <input type="text" placeholder="Graduation Year" required />
                <input type="text" placeholder="Current Job" />
                <input type="text" placeholder="Title (of job)" />
                <input type="text" placeholder="Company" />
                <input type="text" placeholder="LinkedIn" />
                <label>
                    Is Mentor?
                    <input type="checkbox" />
                </label>
                <input type="password" placeholder="Password" required />
                <input type="password" placeholder="Confirm Password" required />
                <button type="button">Get OTP</button>
                <button type="submit">Sign up</button>
            </form>
        </div>
    );
};

export default AlumniRegistrationForm;