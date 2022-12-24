require('dotenv').config();
const express = require('express');
const app = express();
const http = require('http')
const mongoose = require('mongoose');
const {logger, logEvents} = require('./middleware/logger');
const connectDB = require('./config/dbConnection');
const server = http.createServer(app);


console.log(process.env.NODE_ENV);
connectDB();

//Middlewares
app.use(express.json());
app.use(logger);

//Routes

app.use('/users',require('./routes/userRoutes'));



//Server
const PORT = process.env.PORT || 3000;
mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB')
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
})

mongoose.connection.on('error', err => {
    console.log(err)
    logEvents(`${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`, 'mongoErrLog.log')
})
