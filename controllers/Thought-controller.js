const { Thought, User } = require('../models');

const thoughtController = {
  //get all user infomation
  getAllUser(req, res) {
    User.find({})
      .populate({
        path: 'comments',
        select: '-__v'
      })
      .select('-__v')
      .sort({ _id: -1 })
      .then(dbThoughtData => res.json(dbThoughtData))
      .catch(err => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  // get one user by id
  getThoughtById({ params }, res) {
    User.findOne({ _id: params.id })
      .populate({
        path: 'comments',
        select: '-__v'
      })
      .select('-__v')
      .sort({ _id: -1 })
      .then(dbThoughtData => res.json(dbThoughtData))
      .catch(err => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  //create User
  createThought({ body }, res) {
    Thought.create(body)
      .then(dbThoughtData => res.json(dbThoughtData))
      .catch(err => res.json(err));
  },

  // update Comment by id
  updateThought({ params, body }, res) {
    Thought.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
      .then(dbThoughtData => {
        if (!dbThoughtData) {
          res.status(404).json({ message: 'No comment found with this id!' });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch(err => res.json(err));
  },

  //delete Comment
  deleteThought({ params }, res) {
    Thought.findOneAndUpdate({ _id: params.id })
      .then(dbThoughtData => res.json(dbThoughtData))
      .catch(err => res.json(err));
  },

  // add users reaction
  addReaction({ params }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtid },
      { $push: { friends: body } },
      { new: true, runValidators: true }
    )
    .then(dbThoughtData => {
      if (!dbThoughtData) {
        res.status(404).json({ message: 'No thought found' });
        return;
      }
      res.json(dbUserData);
    })

     .catch(err => res.json(err));
  },

  //remove a reacation
  deleteReaction({ params }, res) {
    Thought.findOneAndUpdate(
        { _id: params.thoughtid },
        { $pull: { reaction: {reaction: params.reactionId}} },
        { new: true },
      )
      .then(dbThoughtData => 
        res.json(dbThoughtData))
        .catch(err => res.json(err));
  },
};

module.exports = thoughtController;