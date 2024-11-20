const db = require('./db');

// Fetch all events
const getAllEvents = () => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM events';
        db.query(query, (err, results) => {
            if (err) return reject(err);
            resolve(results);
        });
    });
};

// Add a new event
const createEvent = (title, description, date) => {
    return new Promise((resolve, reject) => {
        const query = 'INSERT INTO events (title, description, date) VALUES (?, ?, ?)';
        db.query(query, [title, description, date], (err, results) => {
            if (err) return reject(err);
            resolve({ id: results.insertId, title, description, date });
        });
    });
};

// Find an event by ID
const getEventById = (id) => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM events WHERE id = ?';
        db.query(query, [id], (err, results) => {
            if (err) return reject(err);
            resolve(results[0]); // Return the first event found
        });
    });
};

// Export functions
module.exports = { getAllEvents, createEvent, getEventById };