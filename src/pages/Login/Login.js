import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Redirect after login
import "./Login.css";

const Login = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:5000/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                alert("Login successful!");
                localStorage.setItem("token", data.token); // Store token
                localStorage.setItem("userRole", data.user.role); // Store role
                navigate("/"); // Redirect to homepage
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div className="container">
            <form className="form-wrapper" onSubmit={handleSubmit}>
                <h2>Login</h2>
                <div className="input-group">
                    <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
                </div>
                <div className="input-group">
                    <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
                </div>
                <button type="submit">Login</button>
                <p>
                    Don't have an account? <a href="/signup">Sign Up</a>
                </p>
            </form>
        </div>
    );
};

export default Login;
