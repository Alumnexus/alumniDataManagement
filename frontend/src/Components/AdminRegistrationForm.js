import React from 'react';

const AdminRegistrationForm = () => {
    return (
        <div style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '8px' }}>
            <h3>Admin Registration</h3>
            <form>
                <input type="text" placeholder="Username" required />
                <input type="email" placeholder="Email ID" required />
                <label>Permission:
                    <select>
                        <option value="Faculty">Faculty</option>
                        <option value="Admin">Admin</option>
                    </select>
                </label>
                <input type="text" placeholder="College/Department Name" />
                <input type="text" placeholder="College Code" />
                <input type="password" placeholder="Password" required />
                <input type="password" placeholder="Confirm Password" required />
                <button type="button">Get OTP</button>
                <button type="submit">Sign up</button>
            </form>
        </div>
    );
};

export default AdminRegistrationForm;