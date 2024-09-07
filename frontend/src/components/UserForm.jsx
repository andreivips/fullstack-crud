import { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../config';

const defaultData = {
  "_id": 0,
  "name": "",
  "age": "",
  "email": "",
  "interests": "",
  "address": "",
}

export default function UserForm({
  userId,
  onSave
}) {
  const [userData, setUserData] = useState(defaultData);

  useEffect(() => {
    if (userId) {
      fetchUser(userId);
    } else {
      setUserData(defaultData);
    }
  }, [userId]);

  const fetchUser = async (userId) => {
    try {
      setUserData(defaultData);
      const response = await axios.get(`${API_URL}/users/${userId}`);
      setUserData(response.data);
    } catch (error) {
      alert('Error fetching user.')
      console.error('Error fetching user:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const saveUserAction = async (e) => {
    e.preventDefault();

    if (userData._id) {
      try {
        const response = await axios.put(`${API_URL}/users/${userData._id}`, userData);
        onSave();
      } catch (error) {
        alert('Error updating user.')
        console.error('Error updating user:', error);
      }
    } else {
      try {
        const response = await axios.post(`${API_URL}/users`, userData);
        onSave();
      } catch (error) {
        alert('Error saving user.')
        console.error('Error saving user:', error);
      }
    }

  };

  return (
    <form onSubmit={saveUserAction}>
      <div className="mb-4">
        <label htmlFor="name" className="block text-gray-700">Name:</label>
        <input
          type="text"
          name="name"
          id="name"
          value={userData.name || ''}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-500"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="age" className="block text-gray-700">Age:</label>
        <input
          type="text"
          name="age"
          id="age"
          value={userData.age || ''}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-500"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="email" className="block text-gray-700">Email:</label>
        <input
          type="email"
          name="email"
          id="email"
          value={userData.email || ''}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-500"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="interests" className="block text-gray-700">Interests:</label>
        <input
          type="text"
          name="interests"
          id="interests"
          value={userData.interests || ''}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-500"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="address" className="block text-gray-700">Address:</label>
        <input
          type="text"
          name="address"
          id="address"
          value={userData.address || ''}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-500"
          required
        />
      </div>
      <div className="flex justify-end">
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 focus:outline-none"
        >
          {userId?'Update':'Save'}
        </button>
      </div>
    </form>
  );
}
