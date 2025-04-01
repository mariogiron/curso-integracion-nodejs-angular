const db = require('../config/db');

const selectAll = async () => {
    const [result] = await db.query('select * from users');
    return result;
}

const selectById = async (userId) => {
    const [result] = await db.query('select * from users where id = ?', [userId]);
    if (result.length === 0) return null;
    return result[0];
}

const selectByEmail = async (email) => {
    const [result] = await db.query('SELECT * FROM users WHERE email= ?', [email])
    if (result.length === 0) return null;
    return result[0]
}

const insert = async ({ name, email, password }) => {
    const [result] = await db.query(
        'insert into users (name, email, password) values (?, ?, ?)',
        [name, email, password]
    );
    return result;
}

module.exports = {
    insert,
    selectById,
    selectAll,
    selectByEmail
}