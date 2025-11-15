const Event = require('../models/Event');
const EventLog = require('../models/EventLog');
const Profile = require('../models/Profile');

// @desc    Get all events (optionally filter by profile)
// @route   GET /api/events?profile=profileId
// @access  Public
const getEvents = async (req, res) => {
    try {
        const query = {};
        if (req.query.profile) {
            query.profiles = req.query.profile;
        }
        const events = await Event.find(query).populate('profiles', ['name']);
        res.json(events);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// @desc    Get event by ID
// @route   GET /api/events/:id
// @access  Public
const getEventById = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id).populate('profiles', ['name']);
        if (!event) {
            return res.status(404).json({ msg: 'Event not found' });
        }
        res.json(event);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// @desc    Create an event
// @route   POST /api/events
// @access  Public
const createEvent = async (req, res) => {
    const {
        profiles, // Array of profile IDs
        timezone,
        start,
        end,
        title,
        description,
        location,
        category
    } = req.body;

    // Validation
    if (!profiles || !Array.isArray(profiles) || profiles.length === 0) {
        return res.status(400).json({ msg: 'At least one profile is required' });
    }
    if (!timezone) {
        return res.status(400).json({ msg: 'Timezone is required' });
    }
    if (!start || !end) {
        return res.status(400).json({ msg: 'Start and end date/time are required' });
    }
    if (new Date(end) <= new Date(start)) {
        return res.status(400).json({ msg: 'End date/time must be after start date/time' });
    }
    // Validate profiles exist
    const foundProfiles = await Profile.find({ _id: { $in: profiles } });
    if (foundProfiles.length !== profiles.length) {
        return res.status(400).json({ msg: 'One or more profiles not found' });
    }
    try {
        const newEvent = new Event({
            profiles,
            timezone,
            start,
            end,
            title,
            description,
            location,
            category
        });
        const event = await newEvent.save();
        // Log event creation
        await EventLog.create({
            event: event._id,
            action: 'create',
            changes: event.toObject() // Full event snapshot on creation
        });
        res.status(201).json(event);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// @desc    Update an event
// @route   PUT /api/events/:id
// @access  Public
const updateEvent = async (req, res) => {
    const {
        profiles,
        timezone,
        start,
        end,
        title,
        description,
        location,
        category
    } = req.body;

    // Build event object
    const eventFields = {};
    if (profiles) eventFields.profiles = profiles;
    if (timezone) eventFields.timezone = timezone;
    if (start) eventFields.start = start;
    if (end) eventFields.end = end;
    if (title) eventFields.title = title;
    if (description) eventFields.description = description;
    if (location) eventFields.location = location;
    if (category) eventFields.category = category;

    if (eventFields.start && eventFields.end && new Date(eventFields.end) <= new Date(eventFields.start)) {
        return res.status(400).json({ msg: 'End date/time must be after start date/time' });
    }
    if (eventFields.profiles) {
        const foundProfiles = await Profile.find({ _id: { $in: eventFields.profiles } });
        if (foundProfiles.length !== eventFields.profiles.length) {
            return res.status(400).json({ msg: 'One or more profiles not found' });
        }
    }
    try {
        let event = await Event.findById(req.params.id);
        if (!event) return res.status(404).json({ msg: 'Event not found' });
        // Capture changed fields for logging
        const changes = {};
        for (const key in eventFields) {
            if (JSON.stringify(event[key]) !== JSON.stringify(eventFields[key])) {
                changes[key] = {
                    oldValue: event[key],
                    newValue: eventFields[key]
                };
            }
        }
        event = await Event.findByIdAndUpdate(
            req.params.id,
            { $set: eventFields },
            { new: true }
        );
        // Log event update if changes
        if (Object.keys(changes).length > 0) {
            await EventLog.create({
                event: event._id,
                action: 'update',
                changes
            });
        }
        res.json(event);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// @desc    Delete an event
// @route   DELETE /api/events/:id
// @access  Public
const deleteEvent = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) {
            return res.status(404).json({ msg: 'Event not found' });
        }
        await Event.findByIdAndDelete(req.params.id);
        // Log event deletion
        await EventLog.create({
            event: event._id,
            action: 'delete',
            changes: { eventTitle: event.title }
        });
        res.json({ msg: 'Event removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// @desc    Get event logs by event ID
// @route   GET /api/events/:id/logs
// @access  Public
const getEventLogs = async (req, res) => {
    try {
        const eventLogs = await EventLog.find({ event: req.params.id }).sort({ timestamp: -1 });
        res.json(eventLogs);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

module.exports = {
    getEvents,
    getEventById,
    createEvent,
    updateEvent,
    deleteEvent,
    getEventLogs
};
