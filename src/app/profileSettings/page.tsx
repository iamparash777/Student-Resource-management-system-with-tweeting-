// src/app/profileSettings/page.tsx

'use client';

import { useState } from 'react';

const Settings = () => {
  const [userInfo, setUserInfo] = useState({
    username: '',
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserInfo({
      ...userInfo,
      [name]: value,
    });
  };

  const handleSave = () => {
    // Save logic here, e.g., sending to Firebase or API
    alert('Settings Saved');
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-xl">
      <h2 className="text-3xl font-semibold text-gray-900 text-center mb-6">Profile Settings</h2>

      <div className="space-y-6">
        <div className="flex flex-col space-y-3">
          <label htmlFor="username" className="text-lg font-medium text-gray-800">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={userInfo.username}
            onChange={handleChange}
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition ease-in-out"
            placeholder="Enter your username"
          />
        </div>

        <div className="flex flex-col space-y-3">
          <label htmlFor="email" className="text-lg font-medium text-gray-800">Email Address</label>
          <input
            type="email"
            id="email"
            name="email"
            value={userInfo.email}
            onChange={handleChange}
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition ease-in-out"
            placeholder="Enter your email"
          />
        </div>

        <div className="flex flex-col space-y-3">
          <label htmlFor="password" className="text-lg font-medium text-gray-800">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={userInfo.password}
            onChange={handleChange}
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition ease-in-out"
            placeholder="Enter your password"
          />
        </div>

        <div className="flex justify-between items-center">
          <button
            onClick={handleSave}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Save Changes
          </button>
          <button
            className="px-6 py-3 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition duration-300"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
