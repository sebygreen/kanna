// express
const express = require("express");
const app = express();

// other
const cors = require('cors');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const passport = require('passport');

const http = require("http");
const socket = require("socket.io");

// server initialization
const server = http.Server(app);
const io = socket(server, {
    cors: {
        origin: '*',
    }
});

// routes
const users = require('./routes/api/users');
const posts = require('./routes/api/posts');

// .env
require('dotenv').config();

// cors
app.use(cors()); // avoid ECONNREFUSED when the client is refreshed too fast

// static images
app.use(express.static('public'));

// boy-parser options
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

// passport middleware & config
app.use(passport.initialize());
require('./config/passport')(passport);

// socket.io connection
io.on('connection', (socket) => {
    console.log("New user connected, socket: " + socket.id);
    socket.on('message', function (data) {
        io.emit('message', data);
    });
    socket.on('joined', (data) => {
        io.emit('joined', data);
    });
    socket.on('left', (data) => {
        io.emit('left', data);
    });
});

// api routes
app.use('/api/users', users);
app.use('/api/posts', posts);

// basic get request
app.get('/', (req, res) => res.send('Hello World'));

// mongodb configuration
let uri = process.env.MONGO_URI;

mongoose // recommended connexion by mongoose
    .connect(uri, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log('MongoDB server online'))
    .catch(e => console.error(e));

// it lives!
server.listen(process.env.PORT, () => console.log(`Server up and running on port ${process.env.PORT}`));