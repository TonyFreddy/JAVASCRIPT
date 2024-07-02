import React, { useState } from 'react';

const UserList = ({ users }) => {
  const [selectedUser, setSelectedUser] = useState(null);

  const handleClick = (user) => {
    setSelectedUser(user);
  };

  return (
    <div>
      <ul>
        {users.map((user, index) => (
          <li key={index} className="user-item" onClick={() => handleClick(user)}>
            <img src={user.picture.large} alt={user.name.first} />
            <span>{user.name.first} {user.name.last}</span>
          </li>
        ))}
      </ul>

      {selectedUser && (
        <div className="user-details">
          <h2>{selectedUser.name.first} {selectedUser.name.last}</h2>
          <p>Email: {selectedUser.email}</p>
          <p>Ville: {selectedUser.location.city}</p>
          {/* Affichez d'autres détails si nécessaire */}
        </div>
      )}
    </div>
  );
};

export default UserList;