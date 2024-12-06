import React, { useEffect, useState } from 'react';
import { db, collection, getDocs } from '../../firebaseConfig';  // Update path as needed
import Header from './widgets/Header';

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchEvents = async () => {
      const querySnapshot = await getDocs(collection(db, 'events'));
      const eventsData = querySnapshot.docs.map(doc => doc.data());
      setEvents(eventsData);
    };

    fetchEvents();
  }, []);

  const handleSearch = () => {
    const filteredEvents = events.filter(event =>
      event.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setEvents(filteredEvents);
  };

  return (
    <div className="text-white p-4 rounded-md mt-4 h-[420px] overflow-y-scroll">
      <div className="flex items-center justify-between">
        <h1 className="font-bold text-3xl font-sans">Dashboard</h1>
        <Header />
      </div>
      <h3 className="font-semibold">Upcoming Events</h3>
      <div className="flex items-center space-x-2 mt-2">
        <input
          type="text"
          placeholder="Search Events"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="p-2 rounded-md"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white p-2 rounded-md"
        >
          Search
        </button>
      </div>
      {events.length === 0 ? (
        <p>No events found</p>
      ) : (
        events.map((event, index) => {
          const startDate = new Date(event.startDate);
          const endDate = new Date(event.endDate);

          return (
            <div key={index} className="flex items-center space-x-2 mt-2 bg-gray-700 p-2 rounded">
              <div className="bg-blue-500 p-2 rounded-full">
                <i className="material-icons text-white">event</i>
              </div>
              <div>
                <p>{event.title}</p>
                <p>{startDate.toLocaleDateString()} - {endDate.toLocaleDateString()}</p>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default EventList;
