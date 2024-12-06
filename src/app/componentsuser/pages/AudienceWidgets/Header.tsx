import React, { useState } from 'react';
import { FiMessageSquare, FiBell, FiPower } from 'react-icons/fi'; // Importing icons

const Header = () => {
  const [isAvatarDropdownOpen, setIsAvatarDropdownOpen] = useState(false);
  const [isNotificationDropdownOpen, setIsNotificationDropdownOpen] = useState(false);

  // Toggle dropdowns
  const toggleAvatarDropdown = () => {
    setIsAvatarDropdownOpen(!isAvatarDropdownOpen);
    setIsNotificationDropdownOpen(false); // Close notification dropdown when avatar is opened
  };

  const toggleNotificationDropdown = () => {
    setIsNotificationDropdownOpen(!isNotificationDropdownOpen);
    setIsAvatarDropdownOpen(false); // Close avatar dropdown when notification is opened
  };

  return (
    <header className="flex justify-between items-center py-4 px-6 text-white rounded-md">
      {/* Title and Welcome Text on the Left */}
      <div>
        <h1 className="text-2xl font-semibold">Audience</h1>

      </div>

      {/* Header Container */}
      <div className="flex items-center justify-center bg-gray-800 p-2 rounded-full shadow-md" style={{ width: '200px', height: '70px' }}>
        {/* Icons in Rounded Container */}
        <div className="flex items-center justify-center space-x-4">
          {/* Chat Icon Button */}
          <button aria-label="Chat" className="text-2xl focus:outline-none hover:text-white transition duration-200 flex items-center justify-center">
            <FiMessageSquare />
          </button>

          {/* Notification Bell Icon Button with Notification Dot */}
          <div className="relative flex items-center justify-center">
            <button
              onClick={toggleNotificationDropdown}
              aria-label="Notifications"
              className="text-2xl focus:outline-none hover:text-white transition duration-200 flex items-center justify-center"
            >
              <FiBell />
            </button>
            <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full"></span>

            {/* Notification Dropdown Menu */}
            {isNotificationDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg text-white">
                <button className="block w-full text-left px-4 py-2 hover:bg-gray-700">Notification 1</button>
                <button className="block w-full text-left px-4 py-2 hover:bg-gray-700">Notification 2</button>
                <button className="block w-full text-left px-4 py-2 hover:bg-gray-700">Notification 3</button>
              </div>
            )}
          </div>

          {/* User Avatar with Dropdown Menu */}
          <div className="relative flex items-center justify-center">
            <button
              onClick={toggleAvatarDropdown}
              aria-label="User Menu"
              className="w-10 h-10 bg-gray-500 rounded-full focus:outline-none"
              style={{
                backgroundImage: `url('path-to-your-avatar-image.jpg')`, // Replace with your image path
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            ></button>

            {/* Avatar Dropdown Menu */}
            {isAvatarDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg text-white">
                <button className="block w-full text-left px-4 py-2 hover:bg-gray-700">Profile settings</button>
                <button className="block w-full text-left px-4 py-2 hover:bg-gray-700">View profile</button>
                <hr className="border-gray-600" />
                <button className="flex items-center w-full text-left px-4 py-2 hover:bg-gray-700">
                  <FiPower className="mr-2" /> Log out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
