import React from 'react';

interface Event {
  id: string;
  name: string;
  date: string;
}

interface UserViewProps {
  events: Event[];
  onDelete: (id: string) => void;
}

const UserView: React.FC<UserViewProps> = ({ events, onDelete }) => {
  return (
    <div className="bg-gray-800 text-white p-6 rounded-md">
      <h1 className="text-3xl font-semibold mb-6">All Events</h1>
      <div className="space-y-4">
        {events.length === 0 ? (
          <p>No events available.</p>
        ) : (
          events.map((event) => (
            <div key={event.id} className="flex justify-between items-center bg-gray-700 p-4 rounded-lg">
              <div>
                <h3 className="text-xl font-medium">{event.name}</h3>
                <p className="text-gray-400">{event.date}</p>
              </div>
              <button
                onClick={() => onDelete(event.id)}
                className="text-red-500 hover:text-red-700 focus:outline-none"
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default UserView;
