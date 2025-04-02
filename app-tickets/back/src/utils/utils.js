//el token es un elemento que me sirve para generar un codigo alfanumerico para validad las peticiona mi api.
//Mientras este en vigor. Es un especie de contraseña que valida mis peticiones dentro de la api/backend
const jwt = require('jsonwebtoken');
const dayjs = require("dayjs")
const dotenv = require('dotenv').config();

//para crear un token necesitamos la libreria jsonweb token y dayjs para ponerle caducidad al token.

const createToken = (usuario) => {
    const obj = {
        userId: usuario.id,
        userRol: usuario.role,
        exp: dayjs().add(1, 'days').unix()
    }
    return jwt.sign(obj, process.env.SECRETKEY)
}
module.exports = { createToken }