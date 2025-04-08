const mongoose = require('mongoose');

const DocumentSchema = new mongoose.Schema({
    title: String,
    pdfPath: String,
    imagePath: String,
}, {
    timestamps: true,
    versionKey: false
})

module.exports = mongoose.model('Document', DocumentSchema)