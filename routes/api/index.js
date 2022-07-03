const router = require('express').Router();
const thoughtRoutes = require('./thoughts.js');
const userRoutes = require('./user-routes');

router.use('/thoughts', thoughtsRoutes);
router.use('/users', userRoutes);

module.exports = router;