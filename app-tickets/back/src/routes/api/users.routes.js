const router = require('express').Router();

const { register, getAll } = require('../../controllers/users.controller');

router.get('/', getAll);
router.post('/', register);

module.exports = router;