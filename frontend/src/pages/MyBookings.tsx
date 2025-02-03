import React, { useEffect, useState } from 'react';
import axiosInstance from '../api/axios';
import { useAuth } from '../hooks/useAuth';
import './scss/myBooking.scss'

function MyBookings() {
  const [myBookings, setMyBookings] = useState<any[]>([]);
  const [events, setEvents] = useState<any>({}); // Store event data by eventId
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchMyBookings = async () => {
      try {
        const response = await axiosInstance.get(`/booking/byUser/${userId}`);
        setMyBookings(response.data); // Store bookings data
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };

    fetchMyBookings();
  }, [userId]);

  useEffect(() => {
    const fetchEventData = async () => {
      try {
        for (let booking of myBookings) {
          if (!events[booking.eventId]) {
            const response = await axiosInstance.get(`/event/info/${booking.eventId}`);
            setEvents((prevEvents) => ({...prevEvents, [booking.eventId]: response.data,}));
          }
        }
      } catch (error) {
        console.error('Error fetching event data:', error);
      }
    };

    if (myBookings.length > 0) {
      fetchEventData();
    }
  }, [myBookings, events]);

  return (
    <div className='my-bookings'>
      <h2>My Bookings</h2>
      {myBookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Booking ID</th>
              <th>Event Name</th>
              <th>Event ID</th>
              <th>Venue</th>
              <th>Booking Date</th>
              <th>Event Date</th>
            </tr>
          </thead>
          <tbody>
            {myBookings.map((booking: any) => (
              <tr key={booking.bookingId}>
                <td>{booking.bookingId}</td>
                <td>{events[booking.eventId]?.event_name || 'Loading...'}</td>
                <td>{booking.eventId}</td>
                <td>{events[booking.eventId]?.venue || 'Loading...'}</td>
                <td>{new Date(booking.bookingDate).toLocaleDateString()}</td>
                <td>{events[booking.eventId] ? new Date(events[booking.eventId].date).toLocaleDateString() : 'Loading...'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default MyBookings;
