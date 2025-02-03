import React, { useState } from 'react'
import axiosInstance from '../api/axios';
import './scss/addEvent.scss'
function AddEvent() {
  const [eventName, setEventName] = useState<string>('');
  const [venue, setVenue] = useState<string>('');
  const [vacancy, setVacancy] = useState<number | string>('');
  const [intake, setIntake] = useState<number | string>('');
  const [date, setDate] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

   
    setSuccess(null);

    // Prepare data to send
    const eventData = {
      event_name: eventName,
      venue: venue,
      intake: intake,
      vacancy: vacancy,
      date: date,
    };

    try {
      const response = await axiosInstance.post('/event/add', eventData);

      if (response.status === 201) {
        setSuccess('Event created successfully!');
        setEventName('');
        setVenue('');
        setVacancy('');
        setDate('');
      }
    } catch (err) {
      console.error('Error adding event:', err);
      setError('Failed to create event. Please try again.');
    }
  };

  return (
    <div className="add-event">
      <h2 className="add-event__title">Add New Event</h2>

      {error && <div className="add-event__error">{error}</div>}
      {success && <div className="add-event__success">{success}</div>}

      <form onSubmit={handleSubmit} className="add-event__form">
        <div className="add-event__input-group">
          <label htmlFor="eventName">Event Name:</label>
          <input
            type="text"
            id="eventName"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
            required
            placeholder="Enter event name"
          />
        </div>

        <div className="add-event__input-group">
          <label htmlFor="venue">Venue:</label>
          <input
            type="text"
            id="venue"
            value={venue}
            onChange={(e) => setVenue(e.target.value)}
            required
            placeholder="Enter venue"
          />
        </div>

        <div className="add-event__input-group">
          <label htmlFor="intake">InTake:</label>
          <input
            type="number"
            id="intake"
            value={intake}
            onChange={(e) => setIntake(e.target.value)}
            required
            placeholder="Enter intake"
          />
        </div>

        <div className="add-event__input-group">
          <label htmlFor="vacancy">Vacancy:</label>
          <input
            type="number"
            id="vacancy"
            value={vacancy}
            onChange={(e) => setVacancy(e.target.value)}
            required
            placeholder="Enter vacancy"
          />
        </div>

        <div className="add-event__input-group">
          <label htmlFor="date">Event Date:</label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="add-event__submit-btn">Add Event</button>
      </form>
    </div>
  );
}

export default AddEvent