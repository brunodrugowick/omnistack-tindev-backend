const Developer = require('../models/Developer');
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

        return response.status(200).json({
            date: moment().format('YYYY-MM-DD HH:mm:ss'),
            message: "Likes and dislikes reseted."
        });
    }
}