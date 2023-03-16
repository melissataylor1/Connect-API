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

 // POST a new thought
 createThought(req, res) {
    // push new thought id to users thought array
    Thought.create(req.body)
    .then((thought) =>
    !thought
      ? res.status(404).json({ message: 'No thought with this id!' })
      : User.findOneAndUpdate(
          { username: req.body.username },
          { $addToSet: { thoughts: thought._id } },
          { new: true }
          ).then((thought) => res.json('Thought successfully posted!'))
        )},



};