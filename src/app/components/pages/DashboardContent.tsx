import React, { useState } from 'react';
import Header from './widgets/Header';
import TotalUsers from './widgets/TotalUsers';
import Reports from './widgets/Reports';
import Issues from './widgets/Issues';
import UpcomingEvents from './widgets/UpcomingEvents';
import EventList from './widgets/EventList';
import UserActivity from './widgets/UserActivity';

const DashboardContent = () => {
  // Example state for events, replace with your actual data
  const [events, setEvents] = useState([
    { id: '1', name: 'Event 1', date: '2024-11-20' },
    { id: '2', name: 'Event 2', date: '2024-11-25' },
  ]);

  // Handle event deletion
  const handleDeleteEvent = (id: string) => {
    setEvents(events.filter((event) => event.id !== id));
  };

  return (
    <div className="flex flex-col h-screen text-gray-200">
      <div className="flex items-center justify-between">
        <h1 className="font-bold text-3xl font-sans">Dashboard</h1>
        <Header />
      </div>
      <div className="flex-grow overflow-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
          <TotalUsers />
          <Reports />
          <Issues />
          {/* Pass events to UpcomingEvents */}
          <UpcomingEvents events={events} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          <UserActivity />
          <EventList events={events} onDelete={handleDeleteEvent} />
        </div>
      </div>
    </div>
  );
};

export default DashboardContent;
