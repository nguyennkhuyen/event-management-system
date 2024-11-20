// const express = require('express');
// const router = express.Router();
// const { getAllRegistrations, createRegistration } = require('../models/registrationModel');
const express = require('express');
const router = express.Router();
const { getRegistrations, addRegistration } = require('../controllers/registrationController');

router.get('/', getRegistrations);
router.post('/', addRegistration);

// Get all registrations
router.get('/', async (req, res) => {
    try {
        const registrations = await getAllRegistrations();
        res.json(registrations);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching registrations', error });
    }
});

// Create a new registration
router.post('/', async (req, res) => {
    const { userId, eventId } = req.body;
    try {
        const newRegistration = await createRegistration(userId, eventId);
        res.status(201).json(newRegistration);
    } catch (error) {
        res.status(500).json({ message: 'Error creating registration', error });
    }
});

module.exports = router;
