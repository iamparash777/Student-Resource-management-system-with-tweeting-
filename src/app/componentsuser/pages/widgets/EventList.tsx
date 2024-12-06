import React from 'react';

const EventList = () => (
  <div className="bg-gray-800 text-white p-4 rounded-md mt-4 h-[420px] overflow-y-scroll">
    <h3 className="font-semibold">Upcoming Events</h3>
    {[...Array(15)].map((_, index) => (
      <div key={index} className="flex items-center space-x-2 mt-2 bg-gray-700 p-2 rounded">
        <div className="bg-blue-500 p-2 rounded-full">
          <i className="material-icons text-white">event</i>
        </div>
        <div>
          <p>Mid-Term Examination</p>
          <p>March 15, 2024</p>
        </div>
      </div>
    ))}
  </div>
);

export default EventList;
