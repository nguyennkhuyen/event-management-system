const { getAllRegistrations, createRegistration } = require('../models/registrationModel');

// Get all registrations
exports.getRegistrations = async (req, res) => {
    try {
        const registrations = await getAllRegistrations();
        res.status(200).json(registrations);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching registrations', error });
    }
};

// Create a new registration
exports.addRegistration = async (req, res) => {
    const { userId, eventId } = req.body;
    try {
        const newRegistration = await createRegistration(userId, eventId);
        res.status(201).json(newRegistration);
    } catch (error) {
        res.status(500).json({ message: 'Error creating registration', error });
    }
};
