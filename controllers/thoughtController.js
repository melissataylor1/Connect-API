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
                ? res.status(404).json({ message: 'Thought doesnt exist' })
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
      ? res.status(404).json({ message: 'Thought doesnt exist' })
      : User.findOneAndUpdate(
          { username: req.body.username },
          { $addToSet: { thoughts: thought._id } },
          { new: true }
          ).then((thought) => res.json('Youve shared your thought with the world successfully!'))
        )},


    // UPDATE a single thought
    updateThought(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { new: true }
        )
            .then((dbThoughtData) => res.json('Thought updated!'))
            .catch((err) => res.status(500).json(err));
    },

    // DELETE a single thought
    deleteThought(req, res) {
        Thought.findOneAndDelete({ _id: req.params.thoughtId })
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'Thought doesnt exist' })
                    : User.findOneAndUpdate(
                        { thoughts: req.params.thoughtId },
                        { $pull: { thoughts: req.params.thoughtId } },
                        { new: true }
                    )
            )
            .then((thought) =>
                !thought ? res
                    .status(404)
                    .json({ message: 'No user matching deleted thought' })
                    : res.json({ message: 'Thought deleted' })
            )
            .catch((err) => res.status(500).json(err));
    },
     //CREATE a reaction
     createReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $push: { reactions: req.body } },
            { new: true }
        )
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'Thought Doesnt Exist' })
                    : res.json({ message: 'Reaction created' })
            )
            .catch((err) => res.status(500).json(err));
    },

    //DELETE a reaction
    deleteReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: req.body } },
            { new: true }
        )
        .then((thought) =>
        !thought
            ? res.status(404).json({ message: 'Thought Doesnt Exist' })
            : res.json({ message: 'Reaction deleted' })
    )
    .catch((err) => res.status(500).json(err));
    },
};
