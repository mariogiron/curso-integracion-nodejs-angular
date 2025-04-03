const db = require('../config/db');

// Funciones que lancen queries sobre la tabla tickets

/*
query para seleccionar solo aquellos ticket que tiene personal asigned
"select t.id, t.title, t.description, t.status, t.  priority, ucb.name as created_by, uat.name as assigned_to
        from tickets t
        join users ucb on t.created_by = ucb.id
        join users uat on t.assigned_to = uat.id"
*/

// Recuperar todos los tickets
const selectAllAssigned = async () => {
    const [result] = await db.query(
        `select t.id, t.title, t.description, t.status, t.  priority, ucb.name as created_by, uat.name as assigned_to
        from tickets t
        join users ucb on t.created_by = ucb.id
        join users uat on t.assigned_to = uat.id`
    );
    return result;
}

const selectAllNotAssigned = async () => {
    const [result] = await db.query(
        `SELECT t.id, t.title, t.description, t.status, t.priority, ucb.name as created_by, 
        uat.id as assigned_to FROM tickets t JOIN users ucb on t.created_by = ucb.id LEFT JOIN users uat on t.assigned_to = uat.id WHERE t.assigned_to is null`
    );
    return result;
}

/**
 * Retrieves a ticket by its ID from the database.
 *
 * @async
 * @function selectById
 * @param {number} ticketId - The ID of the ticket to retrieve.
 * @returns {Promise<Object|null>} A promise that resolves to the ticket object if found, or `null` if not found.
 *
 * @throws {Error} If there is a database query error.
 */
const selectById = async (ticketId) => {
    const [result] = await db.query(
        `select t.id, t.title, t.description, t.status, t.  priority, ucb.name as created_by, uat.name as assigned_to
        from tickets t
        join users ucb on t.created_by = ucb.id
        left join users uat on t.assigned_to = uat.id
        where t.id = ?`,
        [ticketId]
    );
    if (result.length === 0) return null;
    return result[0];
}

const insert = async ({ title, description, created_by }) => {
    const [result] = await db.query(
        'insert into tickets (title, description, created_by) values (?, ?, ?)',
        [title, description, created_by]
    );
    return result;
}

const updateById = async (ticketId, { title, description, created_by, assigned_to, status, priority }) => {
    console.log(ticketId)
    const [result] = await db.query(
        'update tickets set title = ?, description = ?, created_by = ?, assigned_to = ?, status=?, priority=? where id = ?',
        [title, description, Number(created_by), Number(assigned_to), status, priority, ticketId]
    );
    return result;
}

const deleteById = async (ticketId) => {
    const [result] = await db.query('delete from tickets where id = ?', [ticketId]);
    return result;
}

const selectAllByUserId = async (userId) => {
    const [result] = await db.query("SELECT tickets.*, ucb.name as created_by, uat.name as assigned_to FROM tickets, users as uat, users as ucb WHERE tickets.assigned_to = uat.id AND tickets.created_by = ucb.id AND assigned_to = ?", [userId])
    return result
}

module.exports = {
    selectAllAssigned, selectAllNotAssigned, selectById, insert, updateById, deleteById, selectAllByUserId
}