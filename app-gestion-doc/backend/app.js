const http = require('http');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

//configuracion socketIO
const socketIO = require('socket.io');

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

//necesario para que SocketIo funcion crear un servidor http
const server = http.createServer(app);

//inicializamos el servidor
const PORT = process.env.PORT;
server.listen(PORT, () => console.log(`Servidor iniciado en el puerto ${PORT}`))

//socket io: emisiones y recepción de datos.
// evento que me permite conectar el canal de comunicacion. Cada que un cliente se conecte lo a atraves de este canal para luego poder emitir sus acciones.
const io = socketIO(server, {
    cors: { origin: "*" }
})

io.on('connection', async (socket) => {
    console.log('nueva conexion')

    //ponerme a escuchar lo que los usuario me manden como chat_message
    socket.on('chat_message', (data) => {
        //console.log(data);
        //emitieramos al resto de usuario conectado los mensajes recibidos.
        io.emit('chat_message_server', data)
    })

})

