const Profile = require('../models/Profile');

// @desc    Get user profile
// @route   GET /api/profile
// @access  Private
const getProfile = async (req, res) => {
    try {
        const profile = await Profile.findOne({
            user: req.user.id
        }).populate('user', ['name', 'email']);

        if (!profile) {
            return res.status(404).json({
                msg: 'Profile not found'
            });
        }

        res.json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// @desc    Create or update user profile
// @route   POST /api/profile
// @access  Private
const createProfile = async (req, res) => {
    const {
        bio,
        website,
        youtube,
        twitter,
        facebook,
        linkedin,
        instagram
    } = req.body;

    // Build profile object
    const profileFields = {};
    profileFields.user = req.user.id;
    if (bio) profileFields.bio = bio;
    if (website) profileFields.website = website;

    // Build social object
    profileFields.social = {};
    if (youtube) profileFields.social.youtube = youtube;
    if (twitter) profileFields.social.twitter = twitter;
    if (facebook) profileFields.social.facebook = facebook;
    if (linkedin) profileFields.social.linkedin = linkedin;
    if (instagram) profileFields.social.instagram = instagram;

    try {
        let profile = await Profile.findOne({
            user: req.user.id
        });

        if (profile) {
            // Update
            profile = await Profile.findOneAndUpdate(
                {
                    user: req.user.id
                },
                {
                    $set: profileFields
                },
                {
                    new: true
                }
            );

            return res.json(profile);
        }

        // Create
        profile = new Profile(profileFields);
        await profile.save();
        res.json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

module.exports = {
    getProfile,
    createProfile
};
