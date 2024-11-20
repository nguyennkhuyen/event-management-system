// const express = require('express');
// const router = express.Router();
// const { getAllEvents, createEvent, getEventById } = require('../models/eventModel');
const express = require('express');
const router = express.Router();
const { getEvents, addEvent, getEvent } = require('../controllers/eventController');

router.get('/', getEvents);
router.post('/', addEvent);
router.get('/:id', getEvent);

// Get all events
router.get('/', async (req, res) => {
    try {
        const events = await getAllEvents();
        res.json(events);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching events', error });
    }
});

// Create a new event
router.post('/', async (req, res) => {
    const { title, description, date } = req.body;
    try {
        const newEvent = await createEvent(title, description, date);
        res.status(201).json(newEvent);
    } catch (error) {
        res.status(500).json({ message: 'Error creating event', error });
    }
});

// Get an event by ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const event = await getEventById(id);
        if (!event) return res.status(404).json({ message: 'Event not found' });
        res.json(event);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching event', error });
    }
});

module.exports = router;
