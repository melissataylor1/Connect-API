const { Thought, User } = require('../models');
const { ObjectId } = require('mongoose').Types;

module.exports = {
    //GET all thoughts
    getThoughts(req, res) {
        Thought.find()
            .then((thought) => res.json(thought))
            .catch((err) => res.status(500).json(err))
    },

   // GET single thought by its _id
   getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
        .then((thoughtId) =>
            !thoughtId
                ? res.status(404).json({ message: "No thought found with that id" })
                : res.json(thoughtId)
        )
        .catch((err) => res.status(500).json(err));
},



};