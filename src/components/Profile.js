
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Profile.css'; 

const API_URL = 'https://new-todo-jn8g.onrender.com';

const Profile = ({ token }) => {
  const [profile, setProfile] = useState({ name: '', email: '' });
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`${API_URL}/users/profile`, {
          headers: { Authorization: `Bearer ${token}` } 
        });
        setProfile(response.data);
        setName(response.data.name);
        setEmail(response.data.email);
      } catch (error) {
        console.error('Error fetching profile', error);
      }
    };
    fetchProfile();
  }, [token]);

  const updateProfile = async () => {
    try {
      await axios.put(`${API_URL}/users/profile`, { name, email, password }, {
        headers: { Authorization: `Bearer ${token}` } 
      });
      alert('Profile updated');
    } catch (error) {
      console.error('Error updating profile', error);
    }
  };

  return (
    <div className="profile-container">
      <h2>Your Profile</h2>
      <div className="profile-info">
        <p><strong>Name:</strong> {profile.name}</p>
        <p><strong>Email:</strong> {profile.email}</p>
      </div>
      <form className="profile-form" onSubmit={(e) => { e.preventDefault(); updateProfile(); }}>
        <div className="form-group">
          <label>Name</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit" className="update-button">Update Profile</button>
      </form>
    </div>
  );
};

export default Profile;
