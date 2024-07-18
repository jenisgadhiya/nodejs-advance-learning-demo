import React, { useState, useEffect } from 'react';
import './UserForm.css';

const UserForm = ({ addUser, editUser, currentUser, setCurrentUser }) => {
  const [user, setUser] = useState({ name: '', email: '', phone: '', address: '', hobby: '' });

  useEffect(() => {
    if (currentUser) {
      setUser(currentUser);
    }
  }, [currentUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentUser) {
      editUser(currentUser._id, user);
      setCurrentUser(null);
    } else {
      addUser(user);
    }
    setUser({ name: '', email: '', phone: '', address: '', hobby: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="user-form">
      <input type="text" name="name" value={user.name} onChange={handleChange} placeholder="Name" required />
      <input type="email" disabled={!!currentUser} name="email" value={user.email} onChange={handleChange} placeholder="Email" required />
      <input type="text" name="phone" value={user.phone} onChange={handleChange} placeholder="Phone" required />
      <input type="text" name="address" value={user.address} onChange={handleChange} placeholder="Address" required />
      <input type="text" name="hobby" value={user.hobby} onChange={handleChange} placeholder="Hobby" required />
      <button type="submit">{currentUser ? 'Edit' : 'Add'} User</button>
    </form>
  );
};

export default UserForm;
