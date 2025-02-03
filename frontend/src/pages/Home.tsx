import React, { useEffect, useState } from 'react'
import axiosInstance from '../api/axios';
import { useAuth } from '../hooks/useAuth';
import './scss/home.scss'
import { Navigate, useNavigate } from 'react-router-dom';

function Home() {
  const [events, setEvents] = useState([])
  const { user } = useAuth();
  const today = new Date();

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axiosInstance.get('/event/'); 
        console.log("respops responcelnl ***---")
        setEvents(response.data);
      } catch (error) {
        console.error('Error fetching admin data:', error);
      }
    };

    fetchEvent();
  }, []);


  const handleBookNow = async (eventId: number) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('You need to be logged in to book an event');
        return;
      }

      const response = await axiosInstance.post(
        `/booking/bookEvent`,
        {
          "userId" : user.id,
          "eventId" : eventId,
          "bookingDate" : today.toISOString().split('T')[0].replace(/-/g, '/')
        },
      );

      if (response.status === 201) {
        alert('Booking successful');
      }
    } catch (error) {
      console.error('Error booking the event:', error);
      alert('Failed to book the event');
    }
  };



  return (
    <div className="home">
      <h1 className="home__title">Upcoming Events</h1>
      {events.length === 0 ? (
        <p className="home__no-events">No events available</p>
      ) : (
        <div className="event-grid">
          {events.map((event: any) => (
            <div className="event-card" key={event.eid}>
              <h3 className="event-card__title">{event.event_name}</h3>
              <p><strong>Venue:</strong> {event.venue}</p>
              <p><strong>Vacancy:</strong> {event.vacancy}</p>
              <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>

              {event.vacancy === 0 ? (
                <button className="event-card__button event-card__button--sold-out">SOLD OUT</button>
              ) : (
                <button className="event-card__button" onClick={() => handleBookNow(event.eid)}>Book Now</button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Home