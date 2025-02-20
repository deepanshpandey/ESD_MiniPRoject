import React, { useState } from "react";
import BackendStatus from "../misc/BackendStatus.js";

function Login({ onLogin }) {
    const [credentials, setCredentials] = useState({
        username: "",
        password: "",
    });
    const [error, setError] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:8081/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(credentials),
            });

            if (response.ok) {
                // Extract the token from the response
                const data = await response.json();
                const token = data.token;

                // Store the JWT token in localStorage
                localStorage.setItem("jwtToken", token);

                // Clear the credentials (optional)
                setCredentials({
                    username: "",
                    password: "",
                });

                // Call the onLogin callback to indicate successful login
                onLogin(true);

                console.log("Login successful, token stored:", token);
            } else {
                const errorText = await response.text();
                setError(errorText);
            }
        } catch (error) {
            setError("Error connecting to server");
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
            <div className="card shadow-sm" style={{ maxWidth: "400px", width: "100%" }}>
                <div className="card-body">
                    <h2 className="card-title text-center mb-4">IIITB EMS</h2>
                    {error && <div className="alert alert-danger">{error}</div>}
                    <form onSubmit={handleSubmit}>
                        <div className="form-group mb-3">
                            <label htmlFor="username">Username:</label>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                className="form-control"
                                value={credentials.username}
                                onChange={handleChange}
                                placeholder="Enter your username"
                                required
                            />
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="password">Password:</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                className="form-control"
                                value={credentials.password}
                                onChange={handleChange}
                                placeholder="Enter your password"
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-primary w-100">Login</button>
                        <div className="text-center mt-3">
                            Backend Status: <BackendStatus />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;
