const Developer = require('../models/Developer');
const ControlPanelOperations = require('../models/ControlPanelOperations');
const moment = require('moment');

module.exports = {
    async getLoggedUsers(request, response) {
        return response.status(200).json(request.connectedUsers);
    },

    async resetLikes(request, response) {
        const allDevelopers = await Developer.find();
        console.log("=== Reseting database - removing likes and dislikes ===");
        allDevelopers.forEach(developer => {
            developer.likes = [];
            developer.dislikes = [];

            developer.save();
        });

        request.webSocketServer.emit('app_restart');

        await ControlPanelOperations.create({
            message: "Likes and dislikes reset.",
            author: "Anonymous"
        })
            .then((document) => response.status(200).json(document))
            .catch((reason) => console.log("Reset operation failed " + reason));
    },

    async getOperations(request, response) {

        const operations = await ControlPanelOperations.paginate({},
            { page: 1, limit: 99, sort: { "createdAt": "desc" } })

        return response.status(200).json(operations);
    }
}