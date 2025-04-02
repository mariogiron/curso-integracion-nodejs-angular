const Ticket = require('../models/tickets.model');
const jwt = require('jsonwebtoken');
const User = require('../models/users.model');

const checkTicketId = async (req, res, next) => {
    //siempre que recibimos paremetros de ruta esta parametro es de tipo string 
    const ticketId = parseInt(req.params.ticketId);

    if (isNaN(ticketId)) {
        return res.status(400).json({ message: 'El ID debe ser un número' });
    }

    try {
        const ticket = await Ticket.selectById(ticketId);

        if (!ticket) {
            return res.status(404).json({ message: 'El ticket no existe' });
        }

        req.ticket = ticket;
        next();
    } catch (error) {
        next(error);
    }
}

const checkToken = async (req, res, next) => {
    // comprobar si me envian el token a través de las cabeceras de la peticion (headers: Authorization)
    if (!req.headers['authorization']) {
        return res.status(401).json({ message: "Debes incluir las cabeceras de autentificacion", code: 1 })
    }
    const token = req.headers['authorization']
    // comprobar que el token es valido. tambien que no haya caducado.
    let data;
    try {
        data = jwt.verify(token, process.env.SECRETKEY);
    } catch (error) {
        return res.status(401).json({ message: "El token es incorrecto o esta caducado", code: 1 })
    }

    //¿Existe este propietario de este token en la BBDD?
    const usuario = await User.selectById(data.userId)
    if (!usuario) {
        return res.status(401).json({ message: "El usuario no existe" })
    }

    //enlace en request los datos del usuario que se ha logado.
    req.user = usuario
    // SIEMPRE que la petición atraviese con exito el middleware tenemos disponible la información del usuario que se logado.

    next()
}

module.exports = {
    checkTicketId,
    checkToken
}