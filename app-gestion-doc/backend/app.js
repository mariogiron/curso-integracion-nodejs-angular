const http = require('http');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

//configuracion socketIO
const socketIO = require('socket.io');
//la tabla para guardar mensajes
const MessageSchema = require('./models/chat.model');

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
    //numero de usuarios conectados
    io.emit('number_users', io.engine.clientsCount);
    //ponerme a escuchar lo que los usuario me manden como chat_message
    socket.on('chat_message', async (data) => {
        //vamos a guardar el mensaje en la BBDD
        //no poner await para forzar el guardado en BBDD y depues emitir el mensaje.
        let response = MessageSchema.create(data);
        if (response) {
            //emitieramos al resto de usuario conectado los mensajes recibidos.
            io.emit('chat_message_server', data)
        }

    })
    // emitir un mensaje especifico a todos los usuario menos al que se conecta o al que lo emite.
    socket.broadcast.emit('chat_message_server', {
        message: 'Nuevo usuario conectado',
        name: 'info'
    })
    //que me avise cuando un cliente se desconecta. El Evento disconnect se emite cuando el cliente se desconecta. no es un evento inventado por nosotros. es un socket.io
    socket.on('disconnect', () => {
        socket.broadcast.emit('chat_message_server', {
            message: 'Se ha desconectado un usuario',
            name: 'disconnect'
        })
        io.emit('number_users', io.engine.clientsCount)
    })

    //cuando se inicie el chat para un usuario cargar los ultimos 5 mensajes. chat_init
    const messages = await MessageSchema.find().sort({ createdAt: -1 }).limit(6);
    socket.emit('iniciar_chat', {
        arrMessages: messages
    })
})

