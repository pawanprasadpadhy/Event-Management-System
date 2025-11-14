import React, { useEffect } from 'react';
import useEventStore from '../store/eventStore';
import EventCard from '../components/EventCard';

const EventsListPage = () => {
    const { events, getEvents, loading, error } = useEventStore();

    useEffect(() => {
        getEvents();
    }, [getEvents]);

    if (loading) return <div>Loading events...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="events-list-page">
            <h1>All Events</h1>
            <div className="events-list">
                {events.length > 0 ? (
                    events.map(event => (
                        <EventCard key={event._id} event={event} />
                    ))
                ) : (
                    <p>No events found.</p>
                )}
            </div>
        </div>
    );
};

export default EventsListPage;
