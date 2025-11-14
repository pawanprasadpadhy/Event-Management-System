import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useEventStore from '../store/eventStore';
import { formatEventDate } from '../utils/timezoneHelpers';

const EventDetailsPage = () => {
    const { id } = useParams();
    const { event, getEventById, loading, error } = useEventStore();

    useEffect(() => {
        getEventById(id);
    }, [id, getEventById]);

    if (loading) return <div>Loading event details...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!event) return <div>No event found.</div>;

    return (
        <div className="event-details-page">
            <h1>{event.title}</h1>
            <p><strong>Description:</strong> {event.description}</p>
            <p><strong>Date:</strong> {formatEventDate(event.date)}</p>
            <p><strong>Location:</strong> {event.location}</p>
            <p><strong>Category:</strong> {event.category}</p>
            {event.user && <p><strong>Created By:</strong> {event.user.name}</p>}
            {/* Add more event details here */}
        </div>
    );
};

export default EventDetailsPage;
