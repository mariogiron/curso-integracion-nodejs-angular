const router = require('express').Router();

const { register } = require('../../controllers/users.controller');

router.post('/', register);

module.exports = router;