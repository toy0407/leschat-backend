require('dotenv').config();
const express = require('express');
const app = express();
const http = require('http')
const mongoose = require('mongoose');
const {logger, logEvents} = require('./middleware/logger');
const connectDB = require('./config/dbConnection');
const server = http.createServer(app);
const io = require('socket.io')(server);

//Socket
io.on('connection',(socket)=>{
    io.on('send-message',()=>{

    })
});



console.log(process.env.NODE_ENV);
connectDB();

//Middlewares
app.use(express.json());
app.use(logger);

//Routes

app.use('/users',require('./routes/userRoutes'));
app.use('/chats', require('./routes/chatRoutes'));
app.use('/messages', require('./routes/messageRoutes'));


//Server
const PORT = process.env.PORT;
mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB')
    server.listen(PORT, () => console.log(`Server running on port ${PORT}`))
})

mongoose.connection.on('error', err => {
    console.log(err)
    logEvents(`${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`, 'mongoErrLog.log')
})
