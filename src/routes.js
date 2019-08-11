const express = require('express');
const DeveloperController = require('./controllers/DeveloperController');
const LikeController = require('./controllers/LikeController');
const DislikeController = require('./controllers/DislikeController');
const controlPanelController = require('./controllers/ControlPanelController');

const routes = express.Router();

routes.post('/developers', DeveloperController.store);
routes.get('/developers', DeveloperController.index);

routes.post('/developers/:devId/likes', LikeController.store);

routes.post('/developers/:devId/dislikes', DislikeController.store);

routes.get('/controlPanel', (request, response) => {
    response.json({
        resetLikes: "/resetLikes",
        loggedUsers: "/loggedUSers"
    });
})
routes.get('/controlPanel/loggedUsers', controlPanelController.getLoggedUsers);
routes.get('/controlPanel/resetLikes', controlPanelController.resetLikes);

module.exports = routes;