const getAllDocuments = (req, res) => {
    res.end('Estoy en getAllDocuments')
}

const uploadDocument = (req, res) => {
    res.end('Estoy en uploadDocument')
}

const deleteDocument = (req, res) => {
    res.end('Estoy en deleteDocument')
}


module.exports = { getAllDocuments, uploadDocument, deleteDocument }