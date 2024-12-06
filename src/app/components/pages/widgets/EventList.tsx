import React from 'react';

// Define Event type interface for prop validation
interface Event {
  id: string;
  name: string;
  date: string;
}

interface EventListProps {
  events: Event[];
  onDelete: (id: string) => void;
}

const EventList: React.FC<EventListProps> = ({ events, onDelete }) => {
  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-bold text-white mb-4">Upcoming Events</h2>
      <ul className="space-y-3">
        {events.map((event) => (
          <li key={event.id} className="flex justify-between items-center bg-gray-700 p-3 rounded-lg">
            <div>
              <h3 className="text-white font-medium">{event.name}</h3>
              <p className="text-gray-400">{event.date}</p>
            </div>
            <button
              onClick={() => onDelete(event.id)}
              className="text-red-500 hover:text-red-700 focus:outline-none"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EventList;
