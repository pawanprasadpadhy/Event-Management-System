import React, { useEffect } from 'react';
import useEventStore from '../store/eventStore';
import useUserStore from '../store/userStore';
import { formatEventDate } from '../utils/timezoneHelpers';

const EventLogDisplay = ({ eventId }) => {
    const { eventLogs, getEventLogs, loading, error } = useEventStore();
    const { selectedTimeZone } = useUserStore();

    useEffect(() => {
        if (eventId) {
            getEventLogs(eventId);
        }
    }, [eventId, getEventLogs]);

    if (loading) return <div>Loading logs...</div>;
    if (error) return <div>Error loading logs: {error}</div>;

    return (
        <div className="event-log-display">
            <h3>Event History</h3>
            {eventLogs.length > 0 ? (
                <ul>
                    {eventLogs.map((log) => (
                        <li key={log._id}>
                            <strong>{log.action}</strong> by {log.user ? log.user.name : 'Unknown User'} on {formatEventDate(log.timestamp, selectedTimeZone)}
                            {log.changes && Object.keys(log.changes).length > 0 && (
                                <ul>
                                    {Object.entries(log.changes).map(([key, value]) => (
                                        <li key={key}>
                                            {key}: {' '
                                            }{log.action === 'update' ? (
                                                <>
                                                    <span style={{ textDecoration: 'line-through' }}>{value.oldValue?.toString()}</span> -> {value.newValue?.toString()}
                                                </>
                                            ) : (
                                                value?.toString()
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No log history for this event.</p>
            )}
        </div>
    );
};

export default EventLogDisplay;
