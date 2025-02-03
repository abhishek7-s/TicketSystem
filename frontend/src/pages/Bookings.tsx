import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axiosInstance from '../api/axios';
import './scss/bookings.scss'

const Bookings: React.FC = () => {
  const { eventId } = useParams();
  const [totalBookings, setTotalBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axiosInstance.get(`/booking/byEvent/${eventId}`);
        setTotalBookings(response.data);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [eventId]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="bookings">
    <h2 className="bookings__title">Users who booked Event ID: {eventId}</h2>

    <Link to="/admin" className="bookings__back-link">⬅ Back to Dashboard</Link>

    {totalBookings.length === 0 ? (
      <p className="bookings__no-bookings">No bookings found.</p>
    ) : (
      <div className="bookings__table-container">
        <table className="bookings__table">
          <thead>
            <tr>
              <th>User ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Booking ID</th>
              <th>Booking Date</th>
            </tr>
          </thead>
          <tbody>
            {totalBookings.map(booking => (
              <tr key={booking.bookingId}>
                <td>{booking.user.id}</td>
                <td>{booking.user.name}</td>
                <td>{booking.user.email}</td>
                <td>{booking.bookingId}</td>
                <td>{new Date(booking.bookingDate).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )}
  </div>
  );
};

export default Bookings;
