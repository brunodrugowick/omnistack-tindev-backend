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
            console.log("Deu match!");
        }

        loggedDev.likes.push(targetDev._id);
        await loggedDev.save()

        return res.json(loggedDev);

    }
};