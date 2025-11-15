import React, { useState, useEffect } from 'react';
import useEventStore from '../store/eventStore';
import useProfileStore from '../store/profileStore';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);
dayjs.extend(timezone);

const TIMEZONE_LIST = dayjs.tz ? dayjs.tz.names() : [
  'UTC', 'America/New_York', 'Europe/London', 'Asia/Kolkata', 'Asia/Tokyo', 'Europe/Berlin', 'America/Los_Angeles',
];

const EventForm = ({ eventToEdit }) => {
    const { createEvent, updateEvent } = useEventStore();
    const { profiles, getProfiles } = useProfileStore();
    const [formData, setFormData] = useState({
        profiles: [],
        timezone: dayjs.tz.guess(),
        start: '',
        end: '',
        title: '',
        description: '',
        location: '',
        category: ''
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        getProfiles();
    }, [getProfiles]);

    useEffect(() => {
        if (eventToEdit) {
            setFormData({
                profiles: eventToEdit.profiles ? eventToEdit.profiles.map(p => p._id) : [],
                timezone: eventToEdit.timezone || dayjs.tz.guess(),
                start: eventToEdit.start ? eventToEdit.start.substring(0, 16) : '',
                end: eventToEdit.end ? eventToEdit.end.substring(0, 16) : '',
                title: eventToEdit.title || '',
                description: eventToEdit.description || '',
                location: eventToEdit.location || '',
                category: eventToEdit.category || ''
            });
        } else {
            setFormData((formData) => ({ ...formData, profiles: [], timezone: dayjs.tz.guess() }));
        }
    }, [eventToEdit]);

    const handleChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError('');
    };

    const handleProfilesChange = e => {
        const options = Array.from(e.target.selectedOptions);
        const ids = options.map(o => o.value);
        setFormData({ ...formData, profiles: ids });
        setError('');
    };

    const validate = () => {
        if (formData.profiles.length === 0) return 'Select at least one profile.';
        if (!formData.start || !formData.end) return 'Start and end time are required.';
        if (new Date(formData.end) <= new Date(formData.start)) return 'End time must be after start time.';
        if (!formData.timezone) return 'Select a timezone.';
        if (!formData.title.trim()) return 'Title is required.';
        if (!formData.description.trim()) return 'Description is required.';
        if (!formData.location.trim()) return 'Location is required.';
        if (!formData.category.trim()) return 'Category is required.';
        return '';
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        const errorMsg = validate();
        if (errorMsg) {
            setError(errorMsg);
            return;
        }
        setError('');
        const payload = {
            profiles: formData.profiles,
            timezone: formData.timezone,
            start: formData.start,
            end: formData.end,
            title: formData.title,
            description: formData.description,
            location: formData.location,
            category: formData.category
        };
        if (eventToEdit) {
            await updateEvent(eventToEdit._id, payload);
        } else {
            await createEvent(payload);
        }
        setSuccess(true);
        setTimeout(() => setSuccess(false), 1250);
        if (!eventToEdit) {
            setFormData({
                profiles: [],
                timezone: dayjs.tz.guess(),
                start: '',
                end: '',
                title: '',
                description: '',
                location: '',
                category: ''
            });
        }
    };

    return (
        <div className="event-form">
            <h2>{eventToEdit ? 'Edit Event' : 'Create Event'}</h2>
            <form onSubmit={onSubmit}>
                <div>
                    <label>Profiles:</label>
                    <select multiple name="profiles" value={formData.profiles} onChange={handleProfilesChange} required style={{ minWidth: 150, minHeight: 60 }}>
                        {profiles.map((profile) => (
                            <option value={profile._id} key={profile._id}>{profile.name}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>Timezone:</label>
                    <select name="timezone" value={formData.timezone} onChange={handleChange} required style={{ minWidth: 180 }}>
                        {TIMEZONE_LIST.map((tz) => (
                            <option value={tz} key={tz}>{tz}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>Start Date & Time:</label>
                    <input type="datetime-local" name="start" value={formData.start} onChange={handleChange} required />
                </div>
                <div>
                    <label>End Date & Time:</label>
                    <input type="datetime-local" name="end" value={formData.end} onChange={handleChange} required />
                </div>
                <div>
                    <label>Title:</label>
                    <input type="text" placeholder="Title" name="title" value={formData.title} onChange={handleChange} required />
                </div>
                <div>
                    <label>Description:</label>
                    <textarea placeholder="Description" name="description" value={formData.description} onChange={handleChange} required></textarea>
                </div>
                <div>
                    <label>Location:</label>
                    <input type="text" placeholder="Location" name="location" value={formData.location} onChange={handleChange} required />
                </div>
                <div>
                    <label>Category:</label>
                    <input type="text" placeholder="Category" name="category" value={formData.category} onChange={handleChange} required />
                </div>
                <button type="submit" style={{ marginTop: 10 }}>
                    {eventToEdit ? 'Update Event' : 'Create Event'}
                </button>
                {error && <div style={{ color: 'red', marginTop: 8 }}>{error}</div>}
                {success && <div style={{ color: 'green', marginTop: 8 }}>Success!</div>}
            </form>
        </div>
    );
};

export default EventForm;
