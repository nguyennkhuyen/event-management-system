// Import MySQL2 and dotenv
const mysql = require('mysql2');
require('dotenv').config(); // Load environment variables from .env file

// Create a connection to MySQL
const db = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',  // Use environment variable or default to localhost
    user: process.env.DB_USER || 'root',      // Use environment variable or default to root
    password: process.env.DB_PASSWORD || '',  // Use environment variable or leave empty
    multipleStatements: true, // Enable multiple SQL statements
});

// SQL commands to create the database and tables
const sql = `
CREATE DATABASE IF NOT EXISTS event_management;
USE event_management;

CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS events (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    date DATE NOT NULL
);

CREATE TABLE IF NOT EXISTS registrations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    event_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE
);
`;

console.log('Connecting to MySQL...');
db.connect(err => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL');

    console.log('Executing database setup...');
    db.query(sql, (err, result) => {
        if (err) {
            console.error('Error executing SQL:', err);
        } else {
            console.log('Database and tables created successfully');
        }
        db.end(); // Close the connection
    });
});