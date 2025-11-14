const express = require('express');
const router = express.Router();
const {
    getEvents,
    createEvent,
    getEventById,
    updateEvent,
    deleteEvent,
    getEventLogs
} = require('../controllers/eventController');

router.route('/').get(getEvents).post(createEvent);
router.route('/:id').get(getEventById).put(updateEvent).delete(deleteEvent);
router.route('/:id/logs').get(getEventLogs);

module.exports = router;
