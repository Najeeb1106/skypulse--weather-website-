const express = require('express');
const router = express.Router();
const { saveLocation, getLocations, removeLocation } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

// Route to save a new location
router.post('/save-location', protect, saveLocation);

// Route to fetch all saved locations for a user
router.get('/locations', protect, getLocations);

// Route to remove a saved location
router.delete('/locations/:cityName', protect, removeLocation);

module.exports = router;
