const router = require('express').Router();

const { getAllAssigned, getAllNotAssigned, create, getById, edit, remove, getAllByUserId } = require('../../controllers/tickets.controller');
const { checkTicketId, checkAdmin, checkAdminEditor } = require('../../middlewares/tickets.middleware');

// esto deberia poder hacerlo solo el administrador
router.get('/assigned', checkAdmin, getAllAssigned);
router.get('/not-assigned', checkAdmin, getAllNotAssigned);
router.get('/:ticketId', checkTicketId, checkAdminEditor, getById);
router.get('/user/:userId', checkAdminEditor, getAllByUserId);

// puede hacerlo todo el mundo
router.post('/', create);

// puede hacer lo editor y el administrador.
router.put('/:ticketId', checkTicketId, checkAdminEditor, edit);
router.delete('/:ticketId', checkTicketId, checkAdminEditor, remove);

module.exports = router;