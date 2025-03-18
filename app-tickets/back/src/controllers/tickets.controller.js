const Ticket = require('../models/tickets.model');

const getAll = async (req, res, next) => {
    try {
        const tickets = await Ticket.selectAll();
        res.json(tickets);
    } catch (error) {
        next(error);
    }
}

const getById = (req, res, next) => {
    const { ticketId } = req.params;
    res.json({
        ticket: ticketId
    })
}

const create = (req, res, next) => {
    res.json('create');
}

module.exports = {
    getAll, getById, create
}