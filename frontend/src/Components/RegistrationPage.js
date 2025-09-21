import React, { useState } from 'react';
import AlumniRegistrationForm from './AlumniRegistrationForm';
import StudentRegistrationForm from './StudentRegistrationForm';
import AdminRegistrationForm from './AdminRegistrationForm';
import RecruiterRegistrationForm from './RecruiterRegistrationForm';
import './RegistrationPage.css';

const RegistrationPage = () => {
    const [userType, setUserType] = useState(null);

    const handleUserTypeSelection = (type) => {
        setUserType(type);
    };

    return (
        <div style={{ padding: '20px',
            minHeight: "100vh",
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
            height: "100vh",
            backgroundColor: "#f0f2f5" }}>
            <div style={{backgroundColor: "#ffffff",width: "70vw",maxHeight: "80vh",overflow: "auto",padding: "20px",borderRadius: "5px",boxShadow:"rgba(0,0,0,0.1) 0px 4px 8px",position: "relative"}}>
              <h2 style={{ textAlign: 'center' }}>Register as:</h2>
              <nav className='nav_button'>
                <ul className='ul_button'>
                  <li className='ul_n'><button className = 'ul_b' onClick={() => handleUserTypeSelection('Alumni')}>Alumni</button></li>
                  <li className='ul_n'><button className = 'ul_b' onClick={() => handleUserTypeSelection('Student')}>Student</button></li>
                  <li className='ul_n'><button className = 'ul_b' onClick={() => handleUserTypeSelection('Admin')}>Admin</button></li>
                  <li className='ul_n'><button className = 'ul_b' onClick={() => handleUserTypeSelection('Recruiter')}>Recruiter</button></li>
                </ul>
              </nav>

              {userType === 'Alumni' && <AlumniRegistrationForm />}
              {userType === 'Student' && <StudentRegistrationForm />}
              {userType === 'Admin' && <AdminRegistrationForm />}
              {userType === 'Recruiter' && <RecruiterRegistrationForm />}
        </div>
            </div>
    );
};

export default RegistrationPage;