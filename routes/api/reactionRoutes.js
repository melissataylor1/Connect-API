/*const router = require('express').Router();

const {
  createReaction,
  deleteReaction,
} = require('../../controllers/reactionController');

router.route('/').post(createReaction);

router.route('/:thoughtId/reactions').delete(deleteReaction);

module.exports = router;