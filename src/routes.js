const express = require('express');
const DeveloperController = require('./controllers/DeveloperController');
const LikeController = require('./controllers/LikeController')
const DislikeController = require('./controllers/DislikeController')

const routes = express.Router();

routes.post('/developers', DeveloperController.store);
routes.get('/developers', DeveloperController.index);

routes.post('/developers/:devId/likes', LikeController.store);

routes.post('/developers/:devId/dislikes', DislikeController.store);

module.exports = routes;