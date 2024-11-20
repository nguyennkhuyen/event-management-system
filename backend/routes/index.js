// const express = require('express');
// const router = express.Router();

// const userRoutes = require('./userRoutes');
// const eventRoutes = require('./eventRoutes');
// const registrationRoutes = require('./registrationRoutes');

// // Route mappings
// router.use('/users', userRoutes);
// router.use('/events', eventRoutes);
// router.use('/registrations', registrationRoutes);

// module.exports = router;

const express = require('express');
const router = express.Router();

const userRoutes = require('./userRoutes');
const eventRoutes = require('./eventRoutes');
const registrationRoutes = require('./registrationRoutes');

router.use('/users', userRoutes);
router.use('/events', eventRoutes);
router.use('/registrations', registrationRoutes);

module.exports = router;

