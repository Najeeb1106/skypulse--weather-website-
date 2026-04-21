const User = require('../models/User');

// @desc    Save a new location to user's favorites
// @route   POST /api/users/save-location
// @access  Public
const saveLocation = async (req, res) => {
  try {
    const { location } = req.body;

    if (!location) {
      return res.status(400).json({ message: 'Location is required' });
    }

    // Find user by ID from JWT
    let user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check for duplicates (by city name)
    const alreadyExists = user.savedLocations.some(
      (loc) => loc.city.toLowerCase() === location.city.toLowerCase()
    );

    if (alreadyExists) {
      return res.status(400).json({ message: 'City already saved' });
    }

    // Push new location
    user.savedLocations.push(location);
    await user.save();

    res.status(200).json(user.savedLocations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all saved locations for a user
// @route   GET /api/users/:email/locations
// @access  Public
const getLocations = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user.savedLocations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Remove a saved location
// @route   DELETE /api/users/locations/:cityName
// @access  Public
const removeLocation = async (req, res) => {
  try {
    const cityName = req.params.cityName;
    let user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.savedLocations = user.savedLocations.filter(
      (loc) => loc.city.toLowerCase() !== cityName.toLowerCase()
    );

    await user.save();
    res.status(200).json(user.savedLocations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  saveLocation,
  getLocations,
  removeLocation,
};
