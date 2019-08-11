const axios = require('axios');
const Developer = require('../models/Developer');

module.exports = {
    async index(req, res) {
        const { user } = req.headers;
        
        var loggedDev;

        try {
            loggedDev = await Developer.findById(user);
        } catch (error) {
            return res.status(400).json({ error });
        }

        const users = await Developer.paginate({
            $and: [
                { _id: { $ne: loggedDev._id } },
                { _id: { $nin: loggedDev.likes } },
                { _id: { $nin: loggedDev.dislikes } }
            ],
        },
        {
            page: 1,
            limit: 999,
            sort: { name: "asc" }
        });
        
        return res.json(users);
    },
    async store(req, res) {
        var { username } = req.body;
        username = username.trim();

        const userExists = await Developer.findOne({ user: username});

        if (userExists) {
            return res.status(200).json(userExists);
        }
        
        var githubResponse = null;
        try {
            githubResponse = await axios.get(`https://api.github.com/users/${username}`);
        } catch (error) {
            console.log(`User \"${username}\" not found on GitHub. ` + error);
            error.description = "User not found";
            return res.status(404).json(error);
        }

        const { name, bio, avatar_url: avatar } = githubResponse.data;

        await Developer.create({
            name,
            user: username,
            bio,
            avatar
        }, function (err, doc) {
            if (err) {
                console.log("Error creating Developer: " + err.message);
                return res.status(500).json(err);
            } else {
                console.log("Created new Developer {" + doc.name + "}");
                return res.status(201).json(doc);
            }
        });
    },
}