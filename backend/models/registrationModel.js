const db = require('./db');

// Fetch all registrations
const getAllRegistrations = () => {
    return new Promise((resolve, reject) => {
        const query = `
            SELECT 
                registrations.id,
                users.name AS user_name,
                events.title AS event_title,
                events.date AS event_date
            FROM registrations
            JOIN users ON registrations.user_id = users.id
            JOIN events ON registrations.event_id = events.id
        `;
        db.query(query, (err, results) => {
            if (err) return reject(err);
            resolve(results);
        });
    });
};

// Add a new registration
const createRegistration = (userId, eventId) => {
    return new Promise((resolve, reject) => {
        const query = 'INSERT INTO registrations (user_id, event_id) VALUES (?, ?)';
        db.query(query, [userId, eventId], (err, results) => {
            if (err) return reject(err);
            resolve({ id: results.insertId, userId, eventId });
        });
    });
};

// Export functions
module.exports = { getAllRegistrations, createRegistration };