const { Thought, User } = require('../models');

const thoughtController = {
  //get all user infomation
  getAllThoughts(req, res) {
    Thought.find({})
      .populate({
        path: 'reactions',
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
    Thought.findOne({ _id: params.id })
      .populate({
        path: 'reactions',
        select: '-__v'
      })
      .select('-__v')
      .sort({ _id: -1 })
      .then(dbThoughtData => {
        if (!dbThoughtData) {
          res.status(404).json({ message: "No thoughts found" });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch(err => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  //create User
  createThought({ parms, body }, res) {
    Thought.create(body)
      .then(({ _id }) => {
        return User.findByOneAndUpdate(
          { _id: params.userId },
          { $push: { thoughts: _id } },
          { new: true }
        );
      })
      .then(dbThoughtData => {
        if (!dbThoughtData) {
          res.status(404).json({ message: 'No thought found.' });
          return;
        }
        res.json(dbThoughtData);
      })
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
  addReaction({ params, body }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $push: { friends: body } },
      { new: true, runValidators: true })
      .populate({
        path: 'reactions',
        select: '-__v'
      })
      .select('-__v')

      .then(dbThoughtData => {
        if (!dbThoughtData) {
          res.status(404).json({ message: 'No thought found' });
          return;
        }
        res.json(dbThoughtData);
      })

      .catch(err => res.json(err));
  },

  //remove a reacation
  deleteReaction({ params }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtid },
      { $pull: { reaction: { reaction: params.reactionId } } },
      { new: true },
    )
      .then(dbThoughtData =>{
        if (!dbThoughtData){
          res.status(404).json({ message: "Delete"});
          return;
      }
        res.json(dbThoughtData);
    })
      .catch(err => res.json(err));
  }
};

module.exports = thoughtController;