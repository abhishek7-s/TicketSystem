import React, { useEffect, useState } from 'react';
import axiosInstance from '../api/axios';
import { Link, useNavigate } from 'react-router-dom';
import './scss/adminDash.scss'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdminDashboard: React.FC = () => {
  const [events, setEvents] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axiosInstance.get('/event/');
        setEvents(response.data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

  const deleteEvent = async (eventId: number) => {
    try {
      await axiosInstance.delete(`/event/delete/${eventId}`);
      // alert('Event deleted');
      toast.success("Event deleted")
      
      setEvents(events.filter(event => event.eid !== eventId)); 
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  return (
    <div className="admin-dashboard">
      <ToastContainer />
      
      <h2 className="admin-dashboard__title">Admin Dashboard</h2>

      <div className="admin-dashboard__actions">
        <Link to="/addevent" className="admin-dashboard__add-event">Add Event</Link>
      </div>

      {events.length === 0 ? (
        <p className="admin-dashboard__no-events">No events available</p>
      ) : (
        <div className="admin-dashboard__events-list">
          {events.map(event => (
            <div className="event-card" key={event.eid}>
              <h3 className="event-card__title">{event.event_name}</h3>
              <p><strong>Intake:</strong> {event.intake}</p>
              <p><strong>Vacancy:</strong> {event.vacancy}</p>
              <p><strong>Venue:</strong> {event.venue}</p>
              <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>

              <div className="event-card__actions">
                <button className="event-card__button" onClick={() => navigate(`/admin/event/${event.eid}/bookings`)}>View Bookings</button>
                <button className="event-card__button event-card__button--delete" onClick={() => deleteEvent(event.eid)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
