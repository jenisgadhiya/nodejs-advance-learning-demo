import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserForm from './UserForm';
import UserList from './UserList';
import './App.css';

const App = () => {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const response = await axios.get('http://localhost:5000/api/users');
    setUsers(response.data);
  };

  const addUser = async (user) => {
    await axios.post('http://localhost:5000/api/users', user);
    fetchUsers();
  };

  const editUser = async (id, updatedUser) => {
    await axios.put(`http://localhost:5000/api/users/${id}`, updatedUser);
    fetchUsers();
  };

  const handleEdit = (user) => {
    setCurrentUser(user);
  };

  return (
    <div className="app-container">
      <h1>User Management</h1>
      <UserForm addUser={addUser} editUser={editUser} currentUser={currentUser} setCurrentUser={setCurrentUser} />
      <UserList users={users} handleEdit={handleEdit} />
    </div>
  );
};

export default App;
