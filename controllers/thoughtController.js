const { Thought, User } = require('../models');

module.exports = {
    //GET all thoughts
    getAllThoughts(req, res) {
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

    // POST a new thought push the created thought's _id to the associated user's thoughts array
    createSingleThought(req, res) {
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
    



    // UPDATE a single thought
    updateSingleThought(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { new: true }
        )
            .then((dbThoughtData) => res.json('Thought successfully updated!'))
            .catch((err) => res.status(500).json(err));
    },

    // DELETE a single thought
    deleteSingleThought(req, res) {
        Thought.findOneAndDelete({ _id: req.params.thoughtId })
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'No Thought with that id!' })
                    : User.findOneAndUpdate(
                        { thoughts: req.params.thoughtId },
                        { $pull: { thoughts: req.params.thoughtId } },
                        { new: true }
                    )
            )
            .then((thought) =>
                !thought ? res
                    .status(404)
                    .json({ message: 'Thought deleted but no user with that id!' })
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
                    ? res.status(404).json({ message: 'No thought found with that id' })
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
            ? res.status(404).json({ message: 'No thought found with that id' })
            : res.json({ message: 'Reaction deleted' })
    )
    .catch((err) => res.status(500).json(err));
    },
};



