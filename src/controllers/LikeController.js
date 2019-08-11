const Developer = require('../models/Developer')

module.exports = {
    async store(req, res) {
        const { user } = req.headers;
        const likedDeveloper = req.params.devId;

        var loggedDev;
        var targetDev;

        try {
            loggedDev = await Developer.findById(user);
            targetDev = await Developer.findById(likedDeveloper);
        } catch (error) {
            return res.status(400).json({ error });
        }

        if (!targetDev) {
            return res.status(400).json({ error: "Developer not found." });
        }

        if (targetDev.likes.includes(loggedDev._id)) {
            console.log("Deu match!", loggedDev._id, targetDev._id);
            const loggedUserSocket = req.connectedUsers[loggedDev._id];
            const likedUserSocket = req.connectedUsers[targetDev._id];

            console.log("logger user socket", loggedUserSocket);
            if (loggedUserSocket) {
                req.webSocketServer
                    .to(loggedUserSocket)
                    .emit('match', targetDev);
            }

            console.log("Liked user socket", likedUserSocket);
            if (likedUserSocket) {
                req.webSocketServer
                    .to(likedUserSocket)
                    .emit('match', loggedDev)
            }
        }

        loggedDev.likes.push(targetDev._id);
        await loggedDev.save()

        return res.json(loggedDev);

    }
};