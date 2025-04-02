const User = require('../models/users.model');
const bcrypt = require('bcryptjs');
const { createToken } = require('../utils/utils');

const getAll = async (req, res, next) => {
    try {
        const users = await User.selectAll();
        res.json(users);
    } catch (error) {
        next(error);
    }
}

// Crear un usuario con los datos (req.body) recibidos en la petición
// - Insert en la BD
// - Recuperar el resultado del insert
// - Responder con un JSON
const register = async (req, res, next) => {
    //encriptar la cotraseña antes de mandar a la inserción
    req.body.password = await bcrypt.hash(req.body.password, 10)
    try {
        const result = await User.insert(req.body);
        const user = await User.selectById(result.insertId);
        res.json(user);
    } catch (error) {
        next(error);
    }
}

const login = async (req, res, next) => {
    const { email, password } = req.body;
    console.log(req.body)
    //¿Existe este email en la bbdd?
    const usuario = await User.selectByEmail(email);
    if (!usuario) {
        //devolveré un error de autentificación
        res.status(403).json({ message: 'Error en email o password' })
        return false;
    }
    //Coinciden los password? comparar el password hash con el almacenado en la BBDD
    const iguales = await bcrypt.compare(password, usuario.password)
    if (!iguales) {
        //devolveré un error de autentificación
        res.status(403).json({ message: 'Error en email o password' })
        return false;
    }

    res.json({
        message: 'Login success',
        token: createToken(usuario),
        user: usuario.name
    }
    )

}


module.exports = {
    register, getAll, login
}