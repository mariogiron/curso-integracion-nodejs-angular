const express = require('express');
const mongoose = require('moongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json())
//definición de la carpeta de estaticos.
app.use('/uploads', express.static('uploads'));

//configuracion acceso a mongodb
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoBD conectado'))
    .catch((err) => res.status(500).json({ error: err }))

// ruta de entrada al endPoint principal.
app.use('/api/documents', require('./routes/documents.route'))

//inicializamos el servidor
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Servidor iniciado en el puerto ${PORT}`))

