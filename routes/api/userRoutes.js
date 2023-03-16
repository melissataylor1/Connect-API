const router = require('express').Router();

const {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  deleteFriend
} = require('../../controllers/userController');

// /users
router.route('/')
  .get(getAllUsers)
  .post(createUser);

// /:userId
router.route('/:userId')
  .get(getUser)
  .put(updateUser)
  .delete(deleteUser);

// /:userId/friends/:friendId 
router.route('/:userId/friends/:friendId')
  .post(addFriend)
  .delete(deleteFriend);
module.exports = router;