import React, { useState } from 'react';
import axiosInstance from '../api/axios';
import './scss/addEvent.scss';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

function AddEvent() {
  const [eventName, setEventName] = useState<string>('');
  const [venue, setVenue] = useState<string>('');
  const [vacancy, setVacancy] = useState<number | string>('');
  const [intake, setIntake] = useState<number | string>('');
  const [date, setDate] = useState<string>('');
  const [coverImage, setCoverImage] = useState<File | null>(null); // File state
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setCoverImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setSuccess(null);
    setError(null);

    if (!coverImage) {
      setError("Cover image is required!");
      return;
    }

    // Prepare FormData
    const formData = new FormData();
    formData.append("event_name", eventName);
    formData.append("venue", venue);
    formData.append("intake", intake.toString());
    formData.append("vacancy", vacancy.toString());
    formData.append("date", date);
    formData.append("file", coverImage); // Append file

    try {
      const response = await axiosInstance.post('/event/add', formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 201) {
        setSuccess("Event created successfully!");
        setEventName('');
        setVenue('');
        setVacancy('');
        setIntake('');
        setDate('');
        setCoverImage(null);
        toast.success("Event Added");
      }
    } catch (err) {
      console.error('Error adding event:', err);
      setError('Failed to create event. Please try again.');
    }
  };

  return (
    <div className="add-event">
      <ToastContainer />

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

        <div className="add-event__input-group">
          <label htmlFor="coverImage">Cover Image:</label>
          <input
            type="file"
            id="coverImage"
            accept="image/*"
            onChange={handleFileChange}
            required
          />
        </div>

        <button type="submit" className="add-event__submit-btn">Add Event</button>
      </form>
    </div>
  );
}

export default AddEvent;
