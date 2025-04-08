const router = require('express').Router();
const multer = require('multer');
const { getAllDocuments, deleteDocument, uploadDocument } = require('../controllers/documents.controller')

//multer lo hace es separar el fichero de su ruta (donde se guarda), para ello guarda la ruta en la BBDD y el fichero fisicamente en un carpeta asi que necesitamos una libreria que me permita trabajar con fichero fs.
//libreria para el manejo de ficheros
const fs = require('fs');
//libreria para el manejo de rutas de carpetas
const path = require('path');

//middleware para separar el archivo fisico de la ruta que le pongamos al archivo y que guardaremos en la BBDD.

// Asegurarnos de que las carpetas /uploads/images y /uploads/pdfs estan creadas y si no crearlas para que no nos de un error al guardar el archivo.
const arrayRutas = ['uploads/images', 'uploads/pdfs'];
arrayRutas.forEach(dir => {
    const fullPath = path.join(__dirname, '..', dir)
    if (!fs.existsSync(fullPath)) fs.mkdirSync(fullPath, { recursive: true })
})

//ahora trabajando con multer vamos a definir un destino (donde lo vamos a guardar) y el nombre del fichero (ruta que almacenaremos en BBDD)
const storage = multer.diskStorage({
    destination: function (req, file, fnCreateFile) {
        //si es un pdf va a pdfs y si es imagen a images
        const isPdf = file.mimetype === 'application/pdf';
        fnCreateFile(null, isPdf ? 'uploads/pdfs' : 'uploads/images')
    },
    filename: function (req, file, fnCreateFile) {
        fnCreateFile(null, Date.now() + '-' + file.originalname)
        //TODO: estudiar que nombre le ponemos al archivo  1234567-doc2025_finanzas.pdf
    }
})

//middelware
const upload = multer({ storage })

router.get('/', getAllDocuments);
router.delete('/:id', deleteDocument)
router.post('/', upload.fields([{ name: 'pdf' }, { name: 'image' }]), uploadDocument)

module.exports = router;