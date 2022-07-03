const router = require('express').Router();
const {
    getAllUser,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend,
    getUserById
} = require('../../controllers/user-controller');

// api/user
router
    .route('/')
    .get(getAllUser)
    .post(createUser);

//api/users/:id
router
    .route('/:id')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser);

//api/user/:friends
router
    .route('/:id')
    .post(addFriend)
    .delete(deleteFriend);

module.exports = router;
