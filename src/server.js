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

const server = express();
server.use(express.json());
server.use(cors());
server.use(routes);
server.get('/', (req, res) => {return res.json({ message: `John is a man of focus... are you, my friend, a man of focus?`})});

server.listen(process.env.PORT || 3333, function(){
    console.log("Express server listening on port %d in %s mode", this.address().port, server.settings.env);
  });