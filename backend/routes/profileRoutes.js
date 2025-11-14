const express = require('express');
const router = express.Router();
const {
    getProfile,
    createProfile
} = require('../controllers/profileController');

router.route('/').get(getProfile).post(createProfile);

module.exports = router;
