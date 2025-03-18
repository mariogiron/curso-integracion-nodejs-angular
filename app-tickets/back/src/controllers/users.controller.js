const User = require('../models/users.model');

// Crear un usuario con los datos (req.body) recibidos en la petición
// - Insert en la BD
// - Recuperar el resultado del insert
// - Responder con un JSON
const register = async (req, res, next) => {
    try {
        const result = await User.insert(req.body);
        const user = await User.selectById(result.insertId);
        res.json(user);
    } catch (error) {
        next(error);
    }
}

module.exports = {
    register
}