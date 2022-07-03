const { Thoughts, User } = require('../models');

const ThoughtsController = {
  //get all user infomation
  getAllUser(req, res) {
    User.find({})
      .populate({
        path: 'comments',
        select: '-__v'
      })
      .select('-__v')
      .sort({ _id: -1 })
      .then(dbThoughtsData => res.json(dbThoughtsData))
      .catch(err => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  // get one user by id
  getThoughtsById({ params }, res) {
    User.findOne({ _id: params.id })
      .populate({
        path: 'comments',
        select: '-__v'
      })
      .select('-__v')
      .sort({ _id: -1 })
      .then(dbThoughtsData => res.json(dbThoughtsData))
      .catch(err => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  //create User
  createThoughts({ body }, res) {
    Thoughts.create(body)
    .then(dbThoughtsData => res.json(dbThoughtsData))
      .catch(err => res.json(err));
  },

  // update Comment by id
  updateThoughts({ params, body }, res) {
    Thoughts.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
      .then(dbThoughtsData => {
        if (!dbThoughtsData) {
          res.status(404).json({ message: 'No comment found with this id!' });
          return;
        }
        res.json(dbThoughtsData);
      })
      .catch(err => res.json(err));
  },

  //delete Comment
  deleteThoughts({ params }, res) {
    Thoughts.findOneAndUpdate({ _id: params.id })
      .then(dbThoughtsData => res.json(dbThoughtsData))
      .catch(err => res.json(err));
  }

};

module.exports = thoughtsController;