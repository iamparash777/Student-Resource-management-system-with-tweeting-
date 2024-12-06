import { useState } from 'react';
import { FiSearch, FiTrash } from 'react-icons/fi';

const UserManagement = () => {
  const [users] = useState([
    {
      name: 'Parash Shakya',
      username: '@parash',
      email: 'pparashh777@gmail.com',
      joined: '2024/01/01',
      country: 'Nepal',
      contact: '9841346437',
      role: 'Admin',
      active: true,
    },
    {
      name: 'Parash Shakya',
      username: '@parash',
      email: 'pparashh777@gmail.com',
      joined: '2024/01/01',
      country: 'Nepal',
      contact: '9841346437',
      role: 'Admin',
      active: true,
    },
    {
      name: 'Parash Shakya',
      username: '@parash',
      email: 'pparashh777@gmail.com',
      joined: '2024/01/01',
      country: 'Nepal',
      contact: '9841346437',
      role: 'Admin',
      active: true,
    },
  ]);

  return (
    <div style={{ height: '600px' }} className="p-6 bg-gray-900 text-white">
      <h2 className="text-xl font-semibold mb-6">User Management</h2>

      <div className="flex items-center gap-2 mb-4">
        <FiSearch className="text-gray-300" size={20} />
        <input
          type="text"
          placeholder="Search..."
          className="px-4 py-2 rounded-md bg-gray-800 text-gray-300 focus:outline-none w-full"
        />
        <button className="bg-blue-500 px-4 py-2 rounded-md text-white">Invite Users</button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-gray-300">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Username</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Joined</th>
              <th className="px-4 py-2">Country</th>
              <th className="px-4 py-2">Contact</th>
              <th className="px-4 py-2">Role</th>
              <th className="px-4 py-2">Active</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index} className="border-b border-gray-700 hover:bg-gray-800">
                <td className="px-4 py-2">{user.name}</td>
                <td className="px-4 py-2">{user.username}</td>
                <td className="px-4 py-2">{user.email}</td>
                <td className="px-4 py-2">{user.joined}</td>
                <td className="px-4 py-2">{user.country}</td>
                <td className="px-4 py-2">{user.contact}</td>
                <td className="px-4 py-2">{user.role}</td>
                <td className="px-4 py-2">
                  <span
                    className={`inline-block w-3 h-3 rounded-full ${
                      user.active ? 'bg-green-500' : 'bg-red-500'
                    }`}
                  ></span>
                </td>
                <td className="px-4 py-2">
                  <button className="text-red-500">
                    <FiTrash size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagement;
