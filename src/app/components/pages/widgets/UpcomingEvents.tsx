import React from 'react';

interface Event {
  id: string;
  name: string;
  date: string;
}

interface UpcomingEventsProps {
  events: Event[];
}

const UpcomingEvents: React.FC<UpcomingEventsProps> = ({ events }) => (
  <div className="bg-gray-800 text-white p-4 rounded-md">
    <h2 className="text-3xl font-semibold">{events.length}</h2>
    <p>Upcoming Events</p>
  </div>
);

export default UpcomingEvents;
