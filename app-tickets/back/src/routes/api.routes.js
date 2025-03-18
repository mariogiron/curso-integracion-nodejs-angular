const router = require('express').Router();

router.use('/users', require('./api/users.routes'));
router.use('/tickets', require('./api/tickets.routes'));

module.exports = router;