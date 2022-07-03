const router = require('express').Router();
const {
    getAllThought,
    getThoughtById,
    createThought,
    updateThought,
    deleteThought,
    addReaction,
    deleteReaction
} = require('../../controllers/thought-controller');

//api/thoughts
router
    .route('/')
    .get(getAllThought)

// /api/thoughts/:id
router
    .route('/:id')
    .get(getThoughtById)
    .put(updateThought)
    .delete(deleteThought);

// api/thought :userID

router
    .route('/:userId')
    .post(createThought);

// /api/thoughts/reactions
router
    .route('/:thoughtId/reactions')
    .post(addReaction)

// /api/delete/thoughts
router
    .route('/:thoughtId/reactions/:reactionId')
    .delete(deleteReaction);

module.exports = router;

