const Event = require('../models/Event');
const EventLog = require('../models/EventLog');

// @desc    Get all events
// @route   GET /api/events
// @access  Public
const getEvents = async (req, res) => {
    try {
        const events = await Event.find().populate('user', ['name', 'email']);
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
        const event = await Event.findById(req.params.id).populate('user', ['name', 'email']);

        if (!event) {
            return res.status(404).json({
                msg: 'Event not found'
            });
        }

        res.json(event);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// @desc    Create an event
// @route   POST /api/events
// @access  Private
const createEvent = async (req, res) => {
    const {
        title,
        description,
        date,
        location,
        category
    } = req.body;

    try {
        const newEvent = new Event({
            user: req.user.id,
            title,
            description,
            date,
            location,
            category
        });

        const event = await newEvent.save();

        // Log event creation
        await EventLog.create({
            event: event._id,
            user: req.user.id,
            action: 'create',
            changes: event.toObject() // Log the entire event object on creation
        });

        res.status(201).json(event);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// @desc    Update an event
// @route   PUT /api/events/:id
// @access  Private
const updateEvent = async (req, res) => {
    const {
        title,
        description,
        date,
        location,
        category
    } = req.body;

    // Build event object
    const eventFields = {};
    if (title) eventFields.title = title;
    if (description) eventFields.description = description;
    if (date) eventFields.date = date;
    if (location) eventFields.location = location;
    if (category) eventFields.category = category;

    try {
        let event = await Event.findById(req.params.id);

        if (!event) return res.status(404).json({
            msg: 'Event not found'
        });

        // Make sure user owns event
        if (event.user.toString() !== req.user.id) {
            return res.status(401).json({
                msg: 'User not authorized'
            });
        }

        // Capture changes for logging
        const changes = {};
        for (const key in eventFields) {
            if (event[key] !== eventFields[key]) {
                changes[key] = {
                    oldValue: event[key],
                    newValue: eventFields[key]
                };
            }
        }

        event = await Event.findByIdAndUpdate(
            req.params.id,
            {
                $set: eventFields
            },
            {
                new: true
            }
        );

        // Log event update if changes were made
        if (Object.keys(changes).length > 0) {
            await EventLog.create({
                event: event._id,
                user: req.user.id,
                action: 'update',
                changes: changes
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
// @access  Private
const deleteEvent = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);

        if (!event) {
            return res.status(404).json({
                msg: 'Event not found'
            });
        }

        // Make sure user owns event
        if (event.user.toString() !== req.user.id) {
            return res.status(401).json({
                msg: 'User not authorized'
            });
        }

        await Event.findByIdAndDelete(req.params.id);

        // Log event deletion
        await EventLog.create({
            event: event._id,
            user: req.user.id,
            action: 'delete',
            changes: { eventTitle: event.title } // Log relevant info for deletion
        });

        res.json({
            msg: 'Event removed'
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// @desc    Get event logs by event ID
// @route   GET /api/events/:id/logs
// @access  Private
const getEventLogs = async (req, res) => {
    try {
        const eventLogs = await EventLog.find({ event: req.params.id }).populate('user', ['name', 'email']).sort({ timestamp: -1 });
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
