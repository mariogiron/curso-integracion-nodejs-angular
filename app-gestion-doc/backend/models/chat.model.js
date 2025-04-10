const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
    name: String,
    message: String,
    socketId: String,
}, {
    timestamps: true,
    versionKey: false
})

module.exports = mongoose.model('Message', MessageSchema)