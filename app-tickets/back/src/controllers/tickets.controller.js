const Ticket = require('../models/tickets.model');

const getAll = async (req, res, next) => {
    try {
        const tickets = await Ticket.selectAll();
        res.json(tickets);
        // res.status(404).json({ message: 'Error de pacotilla' });
    } catch (error) {
        next(error);
    }
}

const getById = async (req, res, next) => {
    const { ticketId } = req.params;

    try {
        const ticket = await Ticket.selectById(ticketId);
        if (!ticket) {
            return res.status(404).json({ message: 'No existe ningún ticket con ese ID' });
        }
        res.json(ticket);
    } catch (error) {
        next(error);
    }
}

const create = async (req, res, next) => {
    try {
        const result = await Ticket.insert(req.body);
        const ticket = await Ticket.selectById(result.insertId);
        res.json(ticket);
    } catch (error) {
        next(error);
    }
}

const edit = async (req, res, next) => {
    // Body: title, description, created_by
    const { ticketId } = req.params;

    try {
        await Ticket.updateById(ticketId, req.body);
        const result = await Ticket.selectById(ticketId);
        res.json(result);
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getAll, getById, create, edit
}

// TODO: Recuperar los usuarios con los tickets