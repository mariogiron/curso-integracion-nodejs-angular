const router = require('express').Router();

const { getAllAssigned, getAllNotAssigned, create, getById, edit, remove } = require('../../controllers/tickets.controller');
const { checkTicketId } = require('../../middlewares/tickets.middleware');

router.get('/assigned', getAllAssigned);
router.get('/not-assigned', getAllNotAssigned);
router.get('/:ticketId', checkTicketId, getById);

router.post('/', create);
router.put('/:ticketId', checkTicketId, edit);
router.delete('/:ticketId', checkTicketId, remove);

module.exports = router;