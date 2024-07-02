import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserList from './UserList';

const App = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('https://randomuser.me/api/?results=100');
        setUsers(response.data.results);
      } catch (error) {
        console.error('Erreur lors de la récupération des utilisateurs :', error);
      }
    };

    fetchUsers();
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredUsers = users.filter((user) =>
    user.name.first.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.name.last.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container">
      <h1>Liste d'Utilisateurs</h1>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Rechercher un utilisateur..."
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      <UserList users={filteredUsers} />
    </div>
  );
};

export default App;