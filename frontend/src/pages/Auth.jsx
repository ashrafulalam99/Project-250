import React, { useState } from "react";
import "./Auth.css";
import api from "../axiosConfig";
import { useNavigate } from "react-router-dom";

export default function Auth() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    location: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      if (isLogin) {
        const res = await api.post("/auth/login", {
          email: formData.email,
          password: formData.password,
        });

        const { token, user } = res.data;

        if (token && user?.id) {
          localStorage.setItem("token", token);
          localStorage.setItem("userID", user.id);
          setTimeout(() => navigate("/home"), 500); // smooth navigation
        } else {
          setMessage("Login failed: token not received.");
        }
      } else {
        const res = await api.post("/auth/signup", formData);
        setMessage("Signup successful! Please login.");
        setIsLogin(true);
      }
    } catch (err) {
      setMessage(err.response?.data?.message || err.message);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2 className="auth-title">{isLogin ? "Login" : "Signup"}</h2>
        {message && <p className="auth-message">{message}</p>}
        <form onSubmit={handleSubmit} className="auth-form">
          {!isLogin && (
            <>
              <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} className="auth-input" required />
              <input type="text" name="contact" placeholder="Contact" value={formData.contact} onChange={handleChange} className="auth-input" required />
              <input type="text" name="location" placeholder="Location" value={formData.location} onChange={handleChange} className="auth-input" required />
            </>
          )}
          <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="auth-input" required />
          <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} className="auth-input" required />
          <button type="submit" className="auth-button">{isLogin ? "Login" : "Signup"}</button>
        </form>
        <p className="auth-toggle">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button onClick={() => setIsLogin(!isLogin)}>{isLogin ? "Signup" : "Login"}</button>
        </p>
      </div>
    </div>
  );
}
