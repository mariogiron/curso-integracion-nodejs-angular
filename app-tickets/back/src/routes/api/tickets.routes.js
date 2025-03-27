const router = require('express').Router();

const { getAll, create, getById, edit, remove } = require('../../controllers/tickets.controller');
const { checkTicketId } = require('../../middlewares/tickets.middleware');

router.get('/', getAll);
router.get('/:ticketId', checkTicketId, getById);

router.post('/', create);
router.put('/:ticketId', checkTicketId, edit);
router.delete('/:ticketId', checkTicketId, remove);

module.exports = router;