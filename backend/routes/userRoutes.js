// const express = require('express');
// const router = express.Router();
// const { getAllUsers, createUser, getUserById } = require('../models/userModel');
const express = require('express');
const router = express.Router();
const { getUsers, addUser, getUser } = require('../controllers/userController');

router.get('/', getUsers);
router.post('/', addUser);
router.get('/:id', getUser);

// Get all users
router.get('/', async (req, res) => {
    try {
        const users = await getAllUsers();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users', error });
    }
});

// Create a new user
router.post('/', async (req, res) => {
    const { name, email } = req.body;
    try {
        const newUser = await createUser(name, email);
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ message: 'Error creating user', error });
    }
});

// Get a user by ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const user = await getUserById(id);
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user', error });
    }
});

module.exports = router;