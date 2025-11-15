const Profile = require('../models/Profile');

// @desc    Get all profiles
// @route   GET /api/profile
// @access  Public
const getProfiles = async (req, res) => {
    try {
        const profiles = await Profile.find();
        res.json(profiles);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// @desc    Create new profile by name
// @route   POST /api/profile
// @access  Public
const createProfile = async (req, res) => {
    const { name } = req.body;
    if (!name) {
        return res.status(400).json({ msg: 'Profile name is required' });
    }
    try {
        let existing = await Profile.findOne({ name });
        if (existing) {
            return res.status(400).json({ msg: 'Profile name already exists' });
        }
        const profile = new Profile({ name });
        await profile.save();
        res.status(201).json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

module.exports = {
    getProfiles,
    createProfile
};
