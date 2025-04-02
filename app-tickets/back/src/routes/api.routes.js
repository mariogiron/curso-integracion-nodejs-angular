const { checkToken } = require('../middlewares/tickets.middleware');
const router = require('express').Router();

router.use('/users', require('./api/users.routes'));
router.use('/tickets', checkToken, require('./api/tickets.routes'));

module.exports = router;