const router = require('express').Router();

const { register, getAll, login } = require('../../controllers/users.controller');

// TODO: middleware para el ruta de acceder a todos los usuarios.
router.get('/', getAll);
router.post('/', register);
router.post('/login', login);

module.exports = router;