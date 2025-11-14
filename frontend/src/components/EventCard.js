import React from 'react';
import { Link } from 'react-router-dom';
import { formatEventDate } from '../utils/timezoneHelpers';

const EventCard = ({ event }) => {
    return (
        <div className="event-card">
            <h3>{event.title}</h3>
            <p><strong>Date:</strong> {formatEventDate(event.date)}</p>
            <p><strong>Location:</strong> {event.location}</p>
            <p><strong>Category:</strong> {event.category}</p>
            <Link to={`/events/${event._id}`}>View Details</Link>
        </div>
    );
};

export default EventCard;
