const router = require('express').Router();

const {
  getAllThoughts,
  getSingleThought,
  createSingleThought,
  updateSingleThought,
  deleteSingleThought,
  createReaction,
  deleteReaction,
} = require('../../controllers/thoughtController');

// /api/thoughts
router.route('/')
.get(getAllThoughts)
.post(createSingleThought);

// /api/thoughts/:thoughtId
router.route('/:thoughtId')
.get(getSingleThought)
.put(updateSingleThought)
.delete(deleteSingleThought);

// /api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions')
.put(createReaction);

// /api/thoughts/:thoughtId/reactions/:reactionId
router.route('/:thoughtId/reactions/:reactionId')
.delete(deleteReaction);


module.exports = router;