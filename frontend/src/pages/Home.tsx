import React, { useEffect, useState } from 'react'
import axiosInstance from '../api/axios';
import { useAuth } from '../hooks/useAuth';
import './scss/home.scss'
import { Navigate, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
        // alert('You need to be logged in to book an event');
        toast.warning("You need to be logged in to book an event")
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
        toast.success("Booking successful")
        // alert('Booking successful');
      }
    } catch (error) {
      toast.error("Booking Failed")
      console.error('Error booking the event:', error);
      // alert('Failed to book the event');
    }
  };



  return (
    <div className="home">
      <ToastContainer />
      <h1 className="home__title">Upcoming Events</h1>
      {events.length === 0 ? (
        <p className="home__no-events">No events available</p>
      ) : (
        <div className="event-grid">
          {events.map((event: any) => (
            <div className="event-card" key={event.eid}>
              <div className='event-cover'>
                <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtnvAOajH9gS4C30cRF7rD_voaTAKly2Ntaw&s'></img>
                
              </div>
              <h3 className="event-card__title">{event.event_name}</h3>
              <p><strong>Venue:</strong> {event.venue}</p>
              <p><strong>Intake:</strong> {event.intake}</p>
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