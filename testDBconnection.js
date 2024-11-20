const mysql = require('mysql2');

// Create a database connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'computersciencerocks21$$11', 
    database: 'event_management',
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
    } else {
        console.log('Database connection successful');
        db.query('SELECT * FROM users', (err, results) => {
            if (err) {
                console.error('Error running query:', err);
            } else {
                console.log('Users:', results);
            }
            db.end();
        });
    }
});
