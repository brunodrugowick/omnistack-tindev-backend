require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const cors = require('cors');

if (!process.env.DB) { console.log("[ERROR] No DB environment variable defined. Can't connect to the database."); return false; }
mongoose.connect(process.env.DB, 
    { useNewUrlParser: true }
).then(function(fullfilled) {
    fullfilled.connections.forEach(connection => {
        console.log(`Connected to ${connection.host}:${connection.port}`);
    });
});

const httpServer = express();
const server = require('http').Server(httpServer);
const webSocketServer = require('socket.io')(server);

/**
 * This should move to Redis or something else
 */
const connectedUsers = {};

webSocketServer.on('connection', socket => {
    const { user } = socket.handshake.query
    connectedUsers[user] = socket.id;
    console.log("New socket connection from", socket.id, user);
});

httpServer.use((request, response, next) => {
    request.webSocketServer = webSocketServer;
    request.connectedUsers = connectedUsers;

    return next();
});

httpServer.use(express.json());
httpServer.use(cors());
httpServer.use(routes);
httpServer.get('/loggedUsers', (request, response) => {return response.json(connectedUsers)});
httpServer.get('/', (req, res) => {return res.json({ message: `John is a man of focus... are you, my friend, a man of focus?`})});

server.listen(process.env.PORT || 3333, function(){
    console.log("Express server listening on port %d in %s mode", this.address().port, httpServer.settings.env);
  });