import React, { useState, useEffect } from "react";
import { db } from "../../../firebaseConfig";
import { collection, getDocs, addDoc, deleteDoc, doc } from "firebase/firestore";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import EventList from "./EventList";

const EventScheduler = () => {
  const [events, setEvents] = useState([]);
  const [title, setTitle] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  // Fetch events from Firestore
  useEffect(() => {
    const fetchEvents = async () => {
      const eventsCollection = collection(db, "events");
      const eventDocs = await getDocs(eventsCollection);
      const fetchedEvents = eventDocs.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setEvents(fetchedEvents);
    };

    fetchEvents();
  }, []);

  // Add a new event
  const handleAddEvent = async () => {
    if (!title) return alert("Title is required");
    const event = { title, startDate: startDate.toISOString(), endDate: endDate.toISOString() };

    const docRef = await addDoc(collection(db, "events"), event);
    setEvents((prev) => [...prev, { id: docRef.id, ...event }]);
    setTitle("");
  };

  // Delete an event
  const handleDeleteEvent = async (id: string) => {
    await deleteDoc(doc(db, "events", id));
    setEvents((prev) => prev.filter((event) => event.id !== id));
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold">Event Scheduler</h2>
      <div className="flex flex-col space-y-4">
        <input
          type="text"
          placeholder="Event Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="p-2 border rounded-md"
        />
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date!)}
          className="p-2 border rounded-md"
        />
        <DatePicker
          selected={endDate}
          onChange={(date) => setEndDate(date!)}
          className="p-2 border rounded-md"
        />
        <button onClick={handleAddEvent} className="bg-blue-500 text-white p-2 rounded-md">
          Add Event
        </button>
      </div>
      <EventList events={events} onDelete={handleDeleteEvent} />
    </div>
  );
};

export default EventScheduler;
