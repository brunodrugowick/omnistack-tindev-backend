const Developer = require('../models/Developer');

module.exports = {
    async getLoggedUsers(request, response) {
        return response.json(request.connectedUsers);
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
        
        return response.json({message: "done"});
    }
}