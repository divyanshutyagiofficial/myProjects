const express = require('express');
const ejs = require('ejs');
const routes = require('./routes/routes.js')
const port = process.env.PORT || 3000;
const host = '192.168.1.10';
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const mongoose = require('mongoose');

//DB
mongoose.connect('mongodb://dvynshu95:justkidding12@ds115553.mlab.com:15553/dalviroo');
// EJS
app.set('view engine', 'ejs');

// Public Folder
app.use(express.static(path.join(__dirname, './dist')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(function (req, res, next) {
    //set headers to allow cross origin request.
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

server.listen( port, (err) => {
    if (err) throw err;
    console.log(`Server started on port ${port}`)
});

app.use('/api', routes);
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, "./dist/index.html"));
});

//Socket io
io.on('connection', (socket) => {
    console.log('user connected');
    socket.on('done-in', (data) => {
        io.emit('done-out', data);
        console.log(data);
    });

    socket.on('order-in', (order) => {
        io.emit('order-out', order);
        console.log(order);
    });
});