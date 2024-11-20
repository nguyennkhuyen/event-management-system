const db = require('./db');

// Fetch all users
const getAllUsers = () => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM users';
        db.query(query, (err, results) => {
            if (err) return reject(err);
            resolve(results);
        });
    });
};

// Add a new user
const createUser = (name, email) => {
    return new Promise((resolve, reject) => {
        const query = 'INSERT INTO users (name, email) VALUES (?, ?)';
        db.query(query, [name, email], (err, results) => {
            if (err) return reject(err);
            resolve({ id: results.insertId, name, email });
        });
    });
};

// Find a user by ID
const getUserById = (id) => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM users WHERE id = ?';
        db.query(query, [id], (err, results) => {
            if (err) return reject(err);
            resolve(results[0]); // Return the first user found
        });
    });
};

// Export functions
module.exports = { getAllUsers, createUser, getUserById };