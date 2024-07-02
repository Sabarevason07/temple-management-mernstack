import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DharshanPage = () => {
  const [dharshanData, setDharshanData] = useState([]);
  const [newDharshan, setNewDharshan] = useState({ name: '', poojaTime: '' });

  useEffect(() => {
    fetchDharshan();
  }, []);

  const fetchDharshan = async () => {
    try {
      const response = await axios.get('/api/dharshan'); // Ensure this matches your server route
      setDharshanData(response.data);
    } catch (error) {
      console.error('Failed to fetch Dharshan data:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewDharshan({ ...newDharshan, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/dharshan', newDharshan); // Ensure this matches your server route
      setDharshanData([...dharshanData, response.data]);
      setNewDharshan({ name: '', poojaTime: '' });
    } catch (error) {
      console.error('Failed to create Dharshan:', error);
    }
  };

  return (
    <div>
      <h1>Dharshan Page</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={newDharshan.name}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Pooja Time:</label>
          <input
            type="text"
            name="poojaTime"
            value={newDharshan.poojaTime}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit">Create Dharshan</button>
      </form>
      <h2>All Dharshans</h2>
      <ul>
        {dharshanData.map((dharshan) => (
          <li key={dharshan.id}>
            {dharshan.name} - {dharshan.poojaTime}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DharshanPage;
