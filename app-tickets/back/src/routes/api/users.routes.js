const router = require('express').Router();

const { register, getAll, login } = require('../../controllers/users.controller');

router.get('/', getAll);
router.post('/', register);
router.post('/login', login);

module.exports = router;