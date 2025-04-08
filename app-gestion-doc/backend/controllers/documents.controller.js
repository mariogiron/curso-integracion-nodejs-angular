const Document = require("../models/document.model");
const fs = require('fs')

const getAllDocuments = async (req, res) => {
    try {
        const documents = await Document.find().sort({ createdAt: -1 });
        res.json(documents);
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

const uploadDocument = async (req, res) => {
    try {
        const pdfFile = req.files['pdf'][0];
        const imageFile = req.files['image'][0];

        const doc = new Document({
            title: req.body.title,
            pdfPath: pdfFile.path,
            imagePath: imageFile.path,
        })

        await doc.save();
        res.status(201).json(doc);

    } catch (err) {
        res.status(500).json({ msg: err.message })
    }
}

const deleteDocument = async (req, res) => {
    try {
        const doc = await Document.findByIdAndDelete(req.params.id)
        if (doc) {
            fs.unlinkSync(doc.pdfPath)
            fs.unlinkSync(doc.imagePath)
            res.json({ message: 'Documento eliminado correctamente' })
        } else {
            res.status(404).json({ message: 'Documento no entrado' })
        }
    } catch (err) {
        res.status(404).json({ msg: err.message })
    }
}


module.exports = { getAllDocuments, uploadDocument, deleteDocument }