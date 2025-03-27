const Ticket = require('../models/tickets.model');

const checkTicketId = async (req, res, next) => {
    const { ticketId } = req.params;

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

module.exports = {
    checkTicketId
}