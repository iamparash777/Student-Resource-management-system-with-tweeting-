import React from 'react';

const UserActivity = () => (
  <div className="bg-gray-800 text-white p-4 rounded-md mt-4 h-48 col-span-2">
    <h3 className="font-semibold">User Activity</h3>
    <div className="flex justify-between mt-4">
      {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => (
        <span key={index} className="text-gray-400">{day}</span>
      ))}
    </div>
  </div>
);

export default UserActivity;
