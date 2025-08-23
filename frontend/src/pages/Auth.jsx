import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import './Auth.css';

export function Auth() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true); // toggle between login/signup
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    contact: '',
    location: '',
  });
  const [error, setError] = useState('');

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      if (isLogin) {
        // Login
        const res = await api.post('/api/auth/login', {
          email: formData.email,
          password: formData.password,
        });
        // Store token in localStorage
        localStorage.setItem('token', res.data.token);
        navigate('/home');
      } else {
        // Signup
        const res = await api.post('/api/auth/signup', {
          name: formData.name,
          email: formData.email,
          password: formData.password,
          contact: formData.contact,
          location: formData.location,
        });
        // Store token in localStorage
        localStorage.setItem('token', res.data.token);
        navigate('/home');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div className="auth-container">
      <h2>{isLogin ? 'Login' : 'Signup'}</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        {!isLogin && (
          <>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="contact"
              placeholder="Contact"
              value={formData.contact}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="location"
              placeholder="Location"
              value={formData.location}
              onChange={handleChange}
              required
            />
          </>
        )}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit">{isLogin ? 'Login' : 'Signup'}</button>
      </form>
      <p className="toggle" onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? "Don't have an account? Signup" : 'Already have an account? Login'}
      </p>
    </div>
  );
}
