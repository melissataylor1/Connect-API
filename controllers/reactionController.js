const { Thought, User } = require('../models');
const { ObjectId } = require('mongoose').Types;

module.exports = {
    //GET all thoughts
    getAllThoughts(req, res) {
        Thought.find()
            .then((thought) => res.json(thought))
            .catch((err) => res.status(500).json(err))
    },
    },

