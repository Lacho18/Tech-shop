require('dotenv').config();
const express = require('express');
const app = express();
const PORT = 5000;
const path = require('path');
const {logger} = require('./middleware/logger.js');
const errorHandler = require('./middleware/errorHandler.js');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const corsOptions = require('./config/corsOptions.js');
const connectDB = require('./config/dbConn.js');
const mongoose = require('mongoose');
const {logEvents} = require('./middleware/logger.js');

console.log(process.env.NODE_ENV);

connectDB();

app.use(logger);

app.use(cors(corsOptions));

app.use(express.json());

app.use(cookieParser());

app.use('/', express.static(path.join(__dirname, '/public')));

app.use('/', require('./routes/root.js'));

app.all('*', (req, res) => {
    res.status(404);
    if(req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', 'file404.html'));
    }
    else if(req.accepts('json')) {
        res.json({message : '404 Not Found'});
    }
    else{
        res.type('txt').send('404 Not Found');
    }
});

app.use(errorHandler);

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDb');
    app.listen(PORT, () => {
        console.log('Server running on port ' + PORT);
    });
});

mongoose.connection.on('error', err => {
    console.log(err);
    logEvents(`${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`, 'mongoErrLog.log');
})
