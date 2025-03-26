const router = require('express').Router();

const { getAll, create, getById, edit } = require('../../controllers/tickets.controller');

router.get('/', getAll);
router.get('/:ticketId', getById);

router.post('/', create);
router.put('/:ticketId', edit);

module.exports = router;