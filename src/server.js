require('dotenv').config();

const express = require('express');
const routes = require('./routes');
const cors = require('cors');

const server = express();
server.use(express.json());
server.use(routes);
server.get('/', (req, res) => {return res.json({ message: `John is a man of focus... are you, my friend, a man of focus?`})});

server.use(cors());
server.listen(process.env.PORT || 3333, function(){
    console.log("Express server listening on port %d in %s mode", this.address().port, server.settings.env);
  });