import React from 'react';
import './UserList.css';

const UserList = ({ users, handleEdit }) => {
  return (
    <div className="user-list">
      <h2>User List</h2>
      <ul>
        {users.map(user => (
          <li key={user._id}>
            <span>{user.name}</span> - <span>{user.email}</span> - <span>{user.phone}</span> - <span>{user.address}</span> - <span>{user.hobby}</span>
            <button onClick={() => handleEdit(user)}>Edit</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
