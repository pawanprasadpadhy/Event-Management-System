const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    profiles: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Profile',
        required: true
    }],
    timezone: {
        type: String,
        required: true
    },
    start: {
        type: Date,
        required: true
    },
    end: {
        type: Date,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Event', eventSchema);
