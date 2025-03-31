const Ticket = require('../models/tickets.model');

/* const getAll = async (req, res, next) => {
    try {
        const tickets = await Ticket.selectAll();
        res.json(tickets);
        // res.status(404).json({ message: 'Error de pacotilla' });
    } catch (error) {
        next(error);
    }
} */

const getAllAssigned = async (req, res, next) => {
    try {
        const tickets = await Ticket.selectAllAssigned();
        res.json(tickets);
        // res.status(404).json({ message: 'Error de pacotilla' });
    } catch (error) {
        next(error);
    }
}

const getAllNotAssigned = async (req, res, next) => {
    try {
        const tickets = await Ticket.selectAllNotAssigned();
        res.json(tickets);
        // res.status(404).json({ message: 'Error de pacotilla' });
    } catch (error) {
        next(error);
    }
}

const getById = async (req, res, next) => {
    // const { ticketId } = req.params;

    // try {
    //     const ticket = await Ticket.selectById(ticketId);
    //     if (!ticket) {
    //         return res.status(404).json({ message: 'No existe ningún ticket con ese ID' });
    //     }
    //     res.json(ticket);
    // } catch (error) {
    //     next(error);
    // }
    res.json(req.ticket);
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

const remove = async (req, res, next) => {
    const { ticketId } = req.params;

    try {
        // const ticket = await Ticket.selectById(ticketId);
        await Ticket.deleteById(ticketId);
        res.json(req.ticket);
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getAllAssigned, getAllNotAssigned, getById, create, edit, remove
}


