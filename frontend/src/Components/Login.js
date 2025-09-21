import React from 'react';
import { Link } from 'react-router-dom';

function Login() {
    return (
        <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            backgroundColor: "#f0f2f5"
        }}>
            <div style={{
                backgroundColor: "#fff",
                padding: "40px",
                borderRadius: "8px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                width: "350px",
                textAlign: "center"
            }}>
                <h2 style={{ marginBottom: "20px" }}>Login</h2>
                <div style={{ marginBottom: "15px" }}>
                    <input
                        type="email"
                        placeholder="Email"
                        style={{
                            width: "100%",
                            padding: "10px",
                            borderRadius: "4px",
                            border: "1px solid #ccc",
                            boxSizing: "border-box"
                        }}
                    />
                </div>
                <div style={{ marginBottom: "20px" }}>
                    <input
                        type="password"
                        placeholder="Password"
                        style={{
                            width: "100%",
                            padding: "10px",
                            borderRadius: "4px",
                            border: "1px solid #ccc",
                            boxSizing: "border-box"
                        }}
                    />
                </div>
                <button
                    style={{
                        width: "100%",
                        padding: "10px",
                        backgroundColor: "mediumseagreen",
                        color: "white",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer",
                        fontSize: "16px"
                    }}
                >
                    Sign in
                </button>
                <p style={{ marginTop: "20px", fontSize: "14px" }}>
                    Don't have an account?{" "}
                    <Link to="/register" style={{ color: "mediumseagreen", textDecoration: "none" }}>
                        Register
                    </Link>
                </p>
            </div>
        </div>
        
    );
}

export default Login;