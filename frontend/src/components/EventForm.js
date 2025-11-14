import React, { useState, useEffect } from 'react';
import useEventStore from '../store/eventStore';

const EventForm = ({ eventToEdit }) => {
    const { createEvent, updateEvent } = useEventStore();
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        date: '',
        location: '',
        category: ''
    });

    useEffect(() => {
        if (eventToEdit) {
            setFormData({
                title: eventToEdit.title || '',
                description: eventToEdit.description || '',
                date: eventToEdit.date ? eventToEdit.date.substring(0, 16) : '',
                location: eventToEdit.location || '',
                category: eventToEdit.category || ''
            });
        }
    }, [eventToEdit]);

    const { title, description, date, location, category } = formData;

    const onChange = e =>
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

    const onSubmit = e => {
        e.preventDefault();
        if (eventToEdit) {
            updateEvent(eventToEdit._id, formData);
        } else {
            createEvent(formData);
        }
    };

    return (
        <div className="event-form">
            <h2>{eventToEdit ? 'Edit Event' : 'Create Event'}</h2>
            <form onSubmit={onSubmit}>
                <div>
                    <label>Title:</label>
                    <input type="text" placeholder="Event Title" name="title" value={title} onChange={onChange} required />
                </div>
                <div>
                    <label>Description:</label>
                    <textarea placeholder="Event Description" name="description" value={description} onChange={onChange} required></textarea>
                </div>
                <div>
                    <label>Date & Time:</label>
                    <input type="datetime-local" name="date" value={date} onChange={onChange} required />
                </div>
                <div>
                    <label>Location:</label>
                    <input type="text" placeholder="Event Location" name="location" value={location} onChange={onChange} required />
                </div>
                <div>
                    <label>Category:</label>
                    <input type="text" placeholder="Event Category" name="category" value={category} onChange={onChange} required />
                </div>
                <button type="submit">{eventToEdit ? 'Update Event' : 'Create Event'}</button>
            </form>
        </div>
    );
};

export default EventForm;
