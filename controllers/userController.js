const { User, Thought } = require('../models');

module.exports = {
    //GET all users
    getAllUsers(req, res) {
        User.find()
            .then((user) => res.json(user))
            .catch((err) => res.status(500).json(err))
    },

    // GET single user by its _id, populated with thought & friend data 
    getSingleUser(req, res) {
        User.findOne({ _id: req.params.userId })
            .populate('thoughts')
            .populate('friends')
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'No user found with that id' })
                    : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },

    // POST a new user
    createUser(req, res) {
        User.create(req.body)
            .then((dbUserData) => res.json(dbUserData))
            .catch((err) => {
                res.status(500).json(err)
            });

    },

    // UPDATE a new user
    updateUser(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            { new: true }
        )
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'No user with that ID' })
                    : res.json({ message: 'User updated! 🎉' })
            )
            .catch((err) => {
                console.error(err);
                res.status(500).json(err);
            });
    },

    // DELETE a user by its _id BONUS: removed a user's associated thoughts when deleted
    deleteUser(req, res) {
        User.findOneAndDelete({ _id: req.params.userId })
            .then((user) =>
                !user
                    ? res.status(404).json({ mesage: 'No user with that ID' })
                    : Thought.deleteMany({ _id: { $in: user.thoughts } })
            )
            .then(() => res.json({ message: 'user and associated thoughts deleted!' }))
            .catch((err) => res.status(500).json(err));
    },

    // POST a new friend to user's friend list
    newFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $addToSet: { friends: req.params.friendId } },
            { new: true }
            )
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'No user found with that ID' })
                    : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },

    // DELETE friend from user's friend list
    deleteFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId},
            { $pull: { friends: req.params.friendId }},
            { new: true}
        )
        .then((user) =>
        !user
            ? res.status(404).json({ message: 'No user found with that ID' })
            : res.json({ message: 'Friend deleted' })
    )
    .catch((err) => res.status(500).json(err));
    },
};







