// frontend/src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import Auth from './components/Auth';
import Todos from './components/Todos';
import Profile from './components/Profile';
import axios from 'axios';
import './App.css'; // Import the CSS file for styles

const API_URL = 'https://new-todo-jn8g.onrender.com';

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [error, setError] = useState('');

  const login = async (email, password) => {
    try {
      const response = await axios.post(`${API_URL}/auth/login`, { email, password });
      setToken(response.data.token);
      localStorage.setItem('token', response.data.token);
      setError(''); // Clear errors
      window.location.href = '/todos'; // Redirect to /todos
    } catch (error) {
      console.error('Login failed', error);
      setError('Login failed. Please check your credentials.');
    }
  };

  const signup = async (name, email, password) => {
    try {
      const response = await axios.post(`${API_URL}/auth/signup`, { name, email, password });
      setToken(response.data.token);
      localStorage.setItem('token', response.data.token);
      setError(''); // Clear errors
      window.location.href = '/todos'; // Redirect to /todos
    } catch (error) {
      console.error('Signup failed', error);
      setError('Signup failed. Please try again.');
    }
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem('token');
    window.location.href = '/'; // Redirect to login after logout
  };

  if (!token) {
    return <Auth login={login} signup={signup} error={error} />;
  }

  const ProtectedRoute = ({ element, redirectPath = '/' }) => {
    return token ? element : <Navigate to={redirectPath} />;
  };

  return (
    <Router>
      <nav className="navbar">
        <div className="nav-links">
          <Link to="/todos">Todos</Link>
          <Link to="/profile">Profile</Link>
        </div>
        <button className="logout-button" onClick={logout}>Logout</button>
      </nav>
      <Routes>
        <Route path="/todos" element={<ProtectedRoute element={<Todos token={token} />} />} />
        <Route path="/profile" element={<ProtectedRoute element={<Profile token={token} />} />} />
        <Route path="*" element={<Navigate to="/todos" />} />
      </Routes>
    </Router>
  );
};

export default App;
