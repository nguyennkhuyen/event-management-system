const { getAllEvents, createEvent, getEventById } = require('../models/eventModel');

// Get all events
exports.getEvents = async (req, res) => {
    try {
        const events = await getAllEvents();
        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching events', error });
    }
};

// Create a new event
exports.addEvent = async (req, res) => {
    const { title, description, date } = req.body;
    try {
        const newEvent = await createEvent(title, description, date);
        res.status(201).json(newEvent);
    } catch (error) {
        res.status(500).json({ message: 'Error creating event', error });
    }
};

// Get event by ID
exports.getEvent = async (req, res) => {
    const { id } = req.params;
    try {
        const event = await getEventById(id);
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }
        res.status(200).json(event);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching event', error });
    }
};
