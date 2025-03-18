const db = require('../config/db');

// Funciones que lancen queries sobre la tabla tickets

// Recuperar todos los tickets
const selectAll = async () => {
    const [result] = await db.query('select * from tickets');
    return result;
}

module.exports = {
    selectAll
}